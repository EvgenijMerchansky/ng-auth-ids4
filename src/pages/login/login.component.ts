import { Component, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {
    class: 'app-login'
  },
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  @ViewChild('formSubmit', { read: ElementRef, static: true }) form;

  isExternalLogin: boolean = false;
  defaultLoginEndpoint: string = environment.baseApiUrl + environment.loginApiUrl;
  claims: any;
  hasLoadedProfile: boolean;
  loginFailed: boolean = false;

  ngOnDestroy(): void {
    this.spinner.hide();
    this.isExternalLogin = false;
  }

  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
    private router: Router,
    private spinner: NgxSpinnerService)
  { 
    if (this.authService.isLoggedIn()) {
      this.router.navigate([environment.afterSignInPrivateRoute]);
    }
  }

  enableLoginSpinner = (): void => {
    this.spinner.show();

    this.form.nativeElement.submit();
  }

  get isAuthenticated(): boolean {
    this.claims = this.oauthService.getIdentityClaims();

    if (this.claims !== undefined && this.claims !== null) {

      if(!this.hasLoadedProfile) {
        this.hasLoadedProfile = true;
        this.oauthService.loadUserProfile();
      }
      return true;
    }
    return false;
  }

  ngOnInit() {}

  goToRegister = (): void => {
    this.spinner.show();
    this.router.navigate(['/register']);
  }

  loginByGoogle = async (): Promise<void> => {
    this.spinner.show();
    this.isExternalLogin = true;
    const actionUrl = environment.baseApiUrl + environment.googleAuthEndpoint;

    const googleEmail: string = await this.authService.googleSignIn();

    this.submitLoginForm(actionUrl, googleEmail)
  }

  loginByFacebook = async (): Promise<void> => {
    this.spinner.show();
    this.isExternalLogin = true;
    const actionUrl = environment.baseApiUrl + environment.facebookAuthEndpoint;

    const facebookEmail: string = await this.authService.facebookSignIn();

    if (facebookEmail !== null) {
      this.submitLoginForm(actionUrl, facebookEmail)
      return;
    }

    this.submitLoginForm(actionUrl, null)    
  }

  private submitLoginForm = (actionUrl, userEmail): void => {

    const formСonstituents = this.form.nativeElement.querySelectorAll(".external-login-support");
    formСonstituents[0].value = userEmail;
    formСonstituents[1].value = null;

    this.form.nativeElement.action = actionUrl;
    this.form.nativeElement.submit();
  }
}