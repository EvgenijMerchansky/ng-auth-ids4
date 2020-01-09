import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../src/app/services/auth-service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ITestingData } from '../../app/helpers/interfaces';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.spinner.hide();
  }

  public testingData: ITestingData = null;

  constructor(
    private oauthService: OAuthService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {}

  getTestingData = (): void => { // fix - check where iframe return controling by current function
    this.spinner.show();

    this.authService.getDataForTesting()
    .subscribe(data => {

      this.testingData = data
      this.spinner.hide();
    }, (err) => {

      if (err.status !== 401) return;
      this.oauthService.silentRefresh();

      this.authService.getDataForTesting()
        .subscribe(data => {

          this.testingData = data
          this.spinner.hide();
        })

      this.spinner.hide();
    });
  }

  logOut = (): void => {
    this.spinner.show();
    this.authService.logOut()
      .subscribe(() => {
        localStorage.clear();

        this.router.navigate(['/login']);
        this.spinner.hide();
      });
  }

  refreshToken = async () => {
    this.oauthService.silentRefresh();
  }
}