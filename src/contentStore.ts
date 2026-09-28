import { collection, onSnapshot, query, where, type Unsubscribe } from 'firebase/firestore';
import { db } from './firebase.ts';
import type { ChurchItem, ResourceArticle, VideoItem } from './data.ts';

export type ManagedItem = {
  id: string;
  language: string;
  published: boolean;
  [key: string]: unknown;
};
export type ManagedContent = {
  articles: ManagedItem[];
  churches: ManagedItem[];
  videos: ManagedItem[];
};
export const emptyContent: ManagedContent = { articles: [], churches: [], videos: [] };
export type ContentKind = keyof ManagedContent;

export function subscribeContent(kind: ContentKind, callback: (items: ManagedItem[]) => void, onError?: (error: Error) => void): Unsubscribe {
  if (!db) return () => {};
  return onSnapshot(query(collection(db, 'content', kind, 'items'), where('published', '==', true)),
    snapshot => callback(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as ManagedItem))), onError);
}

export function itemsForLanguage<T extends ResourceArticle | ChurchItem | VideoItem>(items: ManagedItem[], language: string): T[] {
  return items.filter(item => item.language === language || item.language === 'all').map(({ language: _language, published: _published, ...item }) => item as unknown as T);
}
