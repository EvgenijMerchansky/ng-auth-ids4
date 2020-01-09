import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-silent-refresh',
  templateUrl: './silent-refresh.component.html',
  styleUrls: ['./silent-refresh.component.css']
})
export class SilentRefreshComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService)
  {
    const currentUrl = this.router.getCurrentNavigation().finalUrl.fragment;
    this.authService.refreshTokens(currentUrl);
  }

  ngOnInit() {}
}