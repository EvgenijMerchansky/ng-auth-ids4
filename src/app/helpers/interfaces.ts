import { HttpHeaders } from '@angular/common/http';

export interface ICredentials {
  email: string;
  password: string;
}

export interface IErrorResponse {
  code: string,
  descriptions: string
}

export interface IUserResponse {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface ITestingData {
  allowRememberLogin: boolean;
  enableLocalLogin: boolean;
  externalProviders: []
  visibleExternalProviders: []
  isExternalLoginOnly: boolean;
  externalLoginScheme: string;
  email: string;
  password: string;
  rememberLogin: boolean;
  returnUrl: string;
}

export interface IDefaultOptions {
  method: string;
  headers: HttpHeaders;
}

export interface IRegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  returnUrl?: string;
}

export interface ICredentialsLogin {
  Email: string;
  Password?: string;
  ReturnUrl: string;
  ExternalProviders: any;
}

export interface IGoogleSignInResponse {
  id_token: string;
  access_token: string;
  provider_id: string;
}