import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { OAuthService } from 'angular-oauth2-oidc';
import { IRegisterCredentials, IUserResponse, ITestingData, IDefaultOptions } from '../helpers/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  ngOnInit() {}

  constructor(
    private http: HttpClient,
    private router: Router,
    public fsAuth: AngularFireAuth,
    private oauthService: OAuthService) {}

  public isLoggedIn(): boolean {

    const accessToken = localStorage.getItem('access_token');

    return accessToken !== null;
  }

  public setAllTokens(url: string): void {
    if (this.isLoggedIn()) return;
    if (url === null || url === undefined) this.router.navigate(['/403']);

    const tokens: string[] = url.split('&');

    if (tokens.length === 0) return;
    localStorage.clear();

    for (var i = 0; i < tokens.length; i++) {
      const v = tokens[i],
            kvPair = v.split('=');

      // set all tokens to local storage:
      localStorage.setItem(kvPair[0], kvPair[1]); 
    }
    localStorage.setItem('user_id', this.getUserId());
  }

  public refreshTokens(url: string): void {
    if (url === null || url === undefined) this.router.navigate(['/403']);

    const tokens: string[] = url.split('&');

    if (tokens.length === 0) return;
    localStorage.clear();

    for (var i = 0; i < tokens.length; i++) {
      const v = tokens[i],
            kvPair = v.split('=');

      // set all tokens to local storage:
      localStorage.setItem(kvPair[0], kvPair[1]);
    }
    localStorage.setItem('user_id', this.getUserId());
  }

  public logOut(): Observable<any> {
    const url = environment.baseApiUrl + environment.logoutEndpoint;
  
    return this.http.get(url).pipe(tap(res => res));
  }

  public register(data: IRegisterCredentials): Observable<any> {
    const url = environment.baseApiUrl + environment.registerEndpoint;

    const registerModel: IRegisterCredentials = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      returnUrl: null
    }

    const formData: FormData = new FormData();

    for ( var key in registerModel ) {
      formData.append(key, registerModel[key]);
    }

    return this.http.post(url, formData, this.getDefaultOptions())
        .pipe<IUserResponse>(
          tap<IUserResponse>(res => res));
  }

  public getDataForTesting(): Observable<ITestingData> {
    const url = environment.baseApiUrl + environment.privateDataForTestingEndpoint;

    const header = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    });

    const options = {
      headers: header
    }

    return this.http
      .get<ITestingData>(url, options)
      .pipe(tap(res => res));
  }
  
  public async googleSignIn(): Promise<any> {

    const provider = new auth.GoogleAuthProvider(),
          credentials = await this.fsAuth.auth.signInWithPopup(provider);

    return credentials.user.email;
  }

  public async facebookSignIn(): Promise<any> {

    const provider = new auth.FacebookAuthProvider(),
          credentials = await this.fsAuth.auth.signInWithPopup(provider)

    const fbProfile: any = credentials.additionalUserInfo.profile;

    return fbProfile.email;
  }

  private getDefaultOptions(): IDefaultOptions {
    let headers = new HttpHeaders();
    return { method: 'POST', headers: headers };
  }

  getUserId = () => {
    const token: string = localStorage.getItem('access_token');

    const base64Url: string = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).sub.toString();
  };
}