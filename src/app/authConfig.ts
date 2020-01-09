import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.baseApiUrl,
  redirectUri: window.location.origin + '/' + environment.privatePageRoute,
  responseType: environment.responseType,
  clientId: environment.clientId,
  scope: environment.redirectScope,
  skipIssuerCheck: true,
  showDebugInformation: true,
  postLogoutRedirectUri: window.location.origin + '/' + environment.loginPageRoute,
  nonceStateSeparator: environment.nonce,
  silentRefreshRedirectUri: window.location.origin + '/' + environment.tokenRefreshIframeRoute,
}