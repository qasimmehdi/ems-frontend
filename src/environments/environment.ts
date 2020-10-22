export const playStoreLink = 'https://play.google.com/store/apps';
export const appStoreLink = 'https://www.apple.com/ios/app-store/';

const firebaseConfig = {
    // FIREBASE OBJECT KEYS HERE
    apiKey: "AIzaSyCVzs3SLCR0PdJQ7lpNq1dOrGS14oMzQU0",
    authDomain: "dev-trainerhub-292022.firebaseapp.com",
    databaseURL: "https://dev-trainerhub-292022.firebaseio.com",
    projectId: "dev-trainerhub-292022",
    storageBucket: "dev-trainerhub-292022.appspot.com",
    messagingSenderId: "771246683110",
    appId: "1:771246683110:web:66457efc0e24153e489c27",
    measurementId: "G-11MTNZP83E"
};

export const environment = {
    apiUrl: 'https://dev.trainerhub.io/api/appservice/v1',
    apiaccountUrl: 'https://dev.trainerhub.io/api/accountservice/v1',
    baseUrl: 'https://dev.trainerhub.io',

    hmr: false,
    secure: false,
    production: false,
    apis: { dota: 'http://localhost:3000' },
    firebase: firebaseConfig,
    version: 'jenkinsBuildNO'
};