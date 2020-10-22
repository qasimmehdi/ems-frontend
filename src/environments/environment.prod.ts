export const playStoreLink = 'https://play.google.com/store/apps';
export const appStoreLink = 'https://www.apple.com/ios/app-store/';

const firebaseConfig = {
    // FIREBASE OBJECT KEYS HERE
    apiKey: "AIzaSyA1ukik5O32EIpJIahQ8jnsuJPtT4D_jgg",
    authDomain: "qa-trainerhub.firebaseapp.com",
    databaseURL: "https://qa-trainerhub.firebaseio.com",
    projectId: "qa-trainerhub",
    storageBucket: "qa-trainerhub.appspot.com",
    messagingSenderId: "567224523552",
    appId: "1:567224523552:web:a23b392ddf9151336bd545",
    measurementId: "G-ET2V5P12B1"
};

export const environment = {
    apiUrl: 'https://dev.trainerhub.io/api/appservice/v1',
    apiaccountUrl: 'https://dev.trainerhub.io/api/accountservice/v1',
    baseUrl: 'https://dev.trainerhub.io',

    hmr: false,
    secure: false,
    production: false,
    assets: {
        dotaImages:
            'https://cdn-keycloak-angular.herokuapp.com/assets/images/dota-heroes/'
    },
    apis: { dota: 'http://localhost:3000' },
    firebase: firebaseConfig,
    version: 'jenkinsBuildNO'
};