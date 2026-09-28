import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const [uid, projectId] = process.argv.slice(2);
if (!uid || !projectId || !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('Usage: GOOGLE_APPLICATION_CREDENTIALS=/safe/path/service-account.json node scripts/grant-admin.mjs <firebase-user-uid> <project-id>');
  process.exit(1);
}
initializeApp({ credential: applicationDefault(), projectId });
const user = await getAuth().getUser(uid);
if (!user.emailVerified) throw new Error('Verify the Google account email before granting admin access.');
await getAuth().setCustomUserClaims(uid, { ...user.customClaims, admin: true });
console.log(`Admin claim granted to ${user.email} (${uid}). Sign out and in again to refresh the token.`);
