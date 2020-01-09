import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.spinner.hide();
  }

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  ngOnInit() {}

  goToLogin(): void {
    this.spinner.show();
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    this.spinner.show();
    if (this.registerForm.status &&
        this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      
      this.authService.register(this.registerForm.value).subscribe(data => {
        if(data.id) {
          window.alert("You successfully registred on platform!")
          this.router.navigate(['/login']);
          this.spinner.hide();
        }

      }, () => {
        window.alert('Incorrect password!');
        this.spinner.hide();
      });
    } else {
      window.alert('Passwords does not match!');
      this.spinner.hide();
    }
  }
}