import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth-service';
import { OAuthService } from 'angular-oauth2-oidc';


@Injectable()
export class GuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
    private router: Router)
  {
    const currentUrl = this.router.getCurrentNavigation().finalUrl.fragment;
    this.authService.setAllTokens(currentUrl);
  }

  canActivate(): boolean {
    if (this.oauthService.hasValidAccessToken) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}