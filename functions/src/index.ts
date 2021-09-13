import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/browser`).app();

export const ssr = functions.https.onRequest(universal);
