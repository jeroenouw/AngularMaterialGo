import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AlertService } from './alert.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  headers: HttpHeaders;
  options: any;

  API_URL = 'http://localhost:4000/api';
  TOKEN_KEY = 'token';

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    private userService: UserService) {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
      this.options = ({ headers: this.headers });
  }

  // get token() {
  //   return localStorage.getItem(this.TOKEN_KEY);
  // }

  signinUser(email: string, password: string) {
    const body = { email: email, password: password };
    return this.http.post(this.API_URL + '/login', body, this.options).subscribe(
      (res: any) => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.router.navigate(['/home']);
        this.alertService.showToaster('Login succesful');
      }
    );
  }

  isAuthenticated() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/home']);
    this.alertService.showToaster('Logout succesful');
  }

}
