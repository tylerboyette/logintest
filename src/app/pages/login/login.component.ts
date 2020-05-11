import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AuthApiService } from '../../service/auth-api.service'
import { NotificationService } from '../../service/notification.service'
import { LoginUser } from '../../model/login-user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show_password: Boolean;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required
    ])
  });
  constructor(private router: Router, private authService: AuthApiService, private notifyService: NotificationService) {
  }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {

    if(!this.loginForm.touched || !this.loginForm.valid)
      return;

    let user:LoginUser = new LoginUser();
    user.email = this.loginForm.get('email').value;
    user.password = this.loginForm.get('password').value;

    this.authService.login(user).subscribe(
      (res)=>{
        localStorage.setItem("token",res.token)
        this.notifyService.showSuccess("Login success", "Success")
        this.router.navigate(['/dashboard']);
      },
      (error)=>{
        this.notifyService.showError("Login Fail", "Error")
      }
    )
  }
}
