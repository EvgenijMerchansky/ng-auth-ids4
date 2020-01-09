// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sertificate: "http",
  host: 'localhost',
  port: 4200,
  privatePageRoute: 'private',
  loginPageRoute: 'login',
  tokenRefreshIframeRoute: 'silent_renew',
  redirectScope: 'openid ApiOne',
  responseType: 'id_token token',
  clientId: 'client_id_js',
  nonce: 'NonceValuedsafliudsayatroiewewryie123',
  state: 'SessionValueMakeItABitLongerasdfhjsadoighasdifjdsalkhrfakwelyrosdpiufghasidkgewr',
  baseApiUrl: 'https://localhost:44301',
  loginApiUrl: '/account/login',
  afterSignInPrivateRoute: '/private',
  googleAuthEndpoint: '/account/external-google-login',
  facebookAuthEndpoint: '/account/external-facebook-login',
  registerEndpoint: '/account/register',
  logoutEndpoint: '/account/logout',
  privateDataForTestingEndpoint: '/account/data',
  firebase: {
    apiKey: "AIzaSyADaBrJQrBYL9XLnmPnCwT4IWRwGVDBBuQ",
    authDomain: "example-d.firebaseapp.com",
    databaseURL: "https://example-d.firebaseio.com/users/G373F64wvDVjdlp7XvC2",
    projectId: "example-d",
    storageBucket: "example-d.appspot.com",
    messagingSenderId: "282846038950",
    appId: "1:282846038950:web:3faf85d5e425c4c1b5dd67",
    measurementId: "G-SJEQBBM2DZ"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
