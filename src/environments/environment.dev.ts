export const playStoreLink = 'https://play.google.com/store/apps';
export const appStoreLink = 'https://www.apple.com/ios/app-store/';

const firebaseConfig = {
    // FIREBASE OBJECT KEYS HERE
};

export const environment = {
    apiUrl: 'https://dev.gymrabbit.io/api/appservice/v1',
    apiaccountUrl: 'https://dev.gymrabbit.io/api/accountservice/v1',
    baseUrl: 'https://dev.gymrabbit.io',

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