import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/apps/trendy/browser`).app();

export const ssr = functions.https.onRequest(universal);
