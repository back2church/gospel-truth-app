import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db, firebaseReady, googleProvider } from '../firebase.ts';
import { APP_CONTENT, SUPPORTED_LANGUAGES, SWISS_CHURCHES } from '../data.ts';
import type { ContentKind, ManagedItem } from '../contentStore.ts';

const kinds: ContentKind[] = ['articles', 'churches', 'videos'];
const labels: Record<ContentKind, string> = { articles: 'Articles', churches: 'Churches', videos: 'Videos' };
const churchId = (name: string) => `church-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
const seedItems = (kind: ContentKind): ManagedItem[] => kind === 'churches'
  ? SWISS_CHURCHES.map(church => ({ ...church, id: churchId(church.name), language: 'all', published: true }))
  : SUPPORTED_LANGUAGES.flatMap(language => (kind === 'articles' ? APP_CONTENT[language.code].resources : APP_CONTENT[language.code].videos)
      .filter(item => kind !== 'videos' || !('isCustomGoogleVid' in item && item.isCustomGoogleVid))
      .map(item => ({ ...item, id: `${language.code}-${item.id}`, language: language.code, published: true })));
const blank = (kind: ContentKind): ManagedItem => kind === 'articles'
  ? { id: '', language: 'en', published: true, title: '', category: '', readTime: '', summary: '', content: [], scriptureReferences: [] }
  : kind === 'churches'
    ? { id: '', language: 'all', published: true, name: '', city: '', canton: '', languages: [], address: '', website: '', type: '' }
    : { id: '', language: 'en', published: true, title: '', category: '', speakerOrSource: '', description: '', youtubeId: '' };

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState(false);
  const [kind, setKind] = useState<ContentKind>('articles');
  const [items, setItems] = useState<ManagedItem[]>([]);
  const [draft, setDraft] = useState<ManagedItem>(blank('articles'));
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => auth ? onAuthStateChanged(auth, async next => {
    setUser(next);
    setAdmin(Boolean(next && (await next.getIdTokenResult(true)).claims.admin));
  }) : undefined, []);
  useEffect(() => {
    setDraft(blank(kind));
    if (!admin || !db) return;
    getDocs(collection(db, 'content', kind, 'items'))
      .then(snapshot => {
        const combined = new Map(seedItems(kind).map(item => [item.id, item]));
        snapshot.docs.forEach(item => {
          const value = { ...item.data(), id: item.id } as ManagedItem;
          if (value.deleted) combined.delete(value.id);
          else combined.set(value.id, value);
        });
        setItems([...combined.values()]);
      })
      .catch(() => setMessage('Could not load items. Check your Firestore rules.'));
  }, [kind, admin]);

  const field = (key: string, label: string, multiline = false) => {
    const value = draft[key];
    const shown = Array.isArray(value) ? value.join('\n') : String(value ?? '');
    const update = (text: string) => setDraft(previous => ({ ...previous, [key]: Array.isArray(value) ? text.split('\n').map(line => line.trim()).filter(Boolean) : text }));
    return <label className="admin-field" key={key}><span>{label}</span>{multiline
      ? <textarea value={shown} onChange={event => update(event.target.value)} rows={key === 'content' ? 6 : 3} />
      : <input value={shown} onChange={event => update(event.target.value)} />}</label>;
  };
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!db || !admin) return;
    setBusy(true); setMessage('');
    try {
      const id = draft.id || crypto.randomUUID();
      const { id: _id, ...payload } = draft;
      if (kind === 'videos' && !/^[A-Za-z0-9_-]{11}$/.test(String(payload.youtubeId))) throw new Error('Invalid YouTube ID');
      if (kind === 'churches' && !/^https:\/\//.test(String(payload.website))) throw new Error('Website must use HTTPS');
      await setDoc(doc(db, 'content', kind, 'items', id), payload);
      setItems(previous => [...previous.filter(item => item.id !== id), { ...draft, id }]);
      setDraft(blank(kind)); setMessage('Saved. Published changes appear immediately.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Save failed. Check your permissions and connection.'); }
    finally { setBusy(false); }
  };
  const remove = async (item: ManagedItem) => {
    if (!db || !admin || !confirm(`Remove ${String(item.title || item.name)}?`)) return;
    setBusy(true); setMessage('');
    try {
      if (seedItems(kind).some(seed => seed.id === item.id))
        await setDoc(doc(db, 'content', kind, 'items', item.id), { language: item.language, published: true, deleted: true });
      else await deleteDoc(doc(db, 'content', kind, 'items', item.id));
      setItems(previous => previous.filter(value => value.id !== item.id)); setDraft(blank(kind));
    }
    catch { setMessage('Delete failed. Check your permissions and connection.'); }
    finally { setBusy(false); }
  };

  return <main className="admin-shell">
    <div className="admin-top"><div><p className="admin-kicker">Good News & Truth</p><h1>Content manager</h1></div><button onClick={onClose}>Back to app</button></div>
    {!firebaseReady ? <p>Firebase is not configured yet. Add the four VITE_FIREBASE_ values to your deployment environment.</p>
      : !user ? <div className="admin-card"><p>Sign in with your designated Google admin account.</p><button onClick={() => auth && signInWithPopup(auth, googleProvider).catch(() => setMessage('Sign-in failed. Check the authorized domain.'))}>Sign in with Google</button></div>
      : !admin ? <div className="admin-card"><p>This account has no admin access. Ask the Firebase project owner to grant the admin custom claim.</p><button onClick={() => auth && signOut(auth)}>Sign out</button></div>
      : <><div className="admin-tabs">{kinds.map(value => <button key={value} className={kind === value ? 'selected' : ''} onClick={() => setKind(value)}>{labels[value]}</button>)}<button onClick={() => auth && signOut(auth)}>Sign out</button></div>
        <div className="admin-layout"><div className="admin-card"><h2>{labels[kind]}</h2><button onClick={() => setDraft(blank(kind))}>+ New</button><ul>{items.map(item => <li key={item.id}><button onClick={() => setDraft(item)}>{String(item.title || item.name)} <small>({item.language})</small></button><button className="admin-delete" disabled={busy} onClick={() => remove(item)}>Remove</button></li>)}</ul></div>
          <form className="admin-card admin-form" onSubmit={save}><h2>{draft.id ? 'Edit' : 'Add'} {labels[kind].toLowerCase().slice(0, -1)}</h2>
            <label className="admin-field"><span>Language</span><select value={String(draft.language)} onChange={event => setDraft(previous => ({ ...previous, language: event.target.value }))}>{kind === 'churches' && <option value="all">All languages</option>}{SUPPORTED_LANGUAGES.map(language => <option key={language.code} value={language.code}>{language.nativeName}</option>)}</select></label>
            {kind === 'articles' && <>{field('title', 'Title')}{field('category', 'Category')}{field('readTime', 'Reading time')}{field('summary', 'Summary', true)}{field('content', 'Paragraphs (one per line)', true)}{field('scriptureReferences', 'Scripture references (one per line)', true)}</>}
            {kind === 'churches' && <>{field('name', 'Church name')}{field('city', 'City')}{field('canton', 'Canton')}{field('languages', 'Languages (one per line)', true)}{field('address', 'Address')}{field('website', 'Website URL')}{field('type', 'Type')}</>}
            {kind === 'videos' && <>{field('title', 'Title')}{field('category', 'Category')}{field('speakerOrSource', 'Speaker or source')}{field('description', 'Description', true)}{field('youtubeId', 'YouTube video ID')}</>}
            <label className="admin-check"><input type="checkbox" checked={Boolean(draft.published)} onChange={event => setDraft(previous => ({ ...previous, published: event.target.checked }))} /> Published</label>
            <button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save changes'}</button>
          </form></div></>}
    {message && <p role="status" className="admin-message">{message}</p>}
  </main>;
}
