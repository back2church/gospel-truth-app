# Firebase admin setup

This app uses Firebase Authentication and Firestore. The public web config is not a secret; access is controlled by `firestore.rules`. Do not deploy the admin UI without those rules.

1. Create a Firebase project and register a web app. Enable Google sign-in in Authentication. Add the published app's domain to Authorized domains. Use a dedicated Google admin account with two-step verification enabled.
2. Create a Firestore database. Deploy `firestore.rules` to this exact project, for example with `firebase deploy --only firestore:rules --project PROJECT_ID` after configuring the Firebase CLI. Do not use test-mode rules in production.
3. Set `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID` in Google AI Studio's deployment environment. These are the Firebase web-app configuration values, not a service-account key.
4. Publish, then visit `https://YOUR-DOMAIN/#admin` and sign in with the designated Google account. It will initially show “no admin access.” Copy that account's UID from Firebase Authentication.
5. Locally, with a service-account JSON stored **outside the repo**, run `GOOGLE_APPLICATION_CREDENTIALS=/safe/path/service-account.json node scripts/grant-admin.mjs UID PROJECT_ID`. The script requires an email-verified account and sets an `admin` custom claim. Sign out and in to refresh the token. Delete the local service-account file when it is no longer needed. Never put it in AI Studio, GitHub, or the browser.

Only a signed-in, email-verified account with the `admin` claim can write Firestore content. The admin page is not linked publicly, but the URL itself is not a security mechanism. The Firestore rules are. Public visitors can read published content only. A managed entry with the same ID overrides a starter item; removing a starter item records a deletion marker. New articles and videos can be language-specific; churches can be shared across all languages.

The starter data is still bundled with the app. Changes made through the admin area are stored in Firestore and appear without a republish. Keep Firestore backups and review translated theological content before publishing it.
