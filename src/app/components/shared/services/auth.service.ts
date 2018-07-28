import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AlertService } from './alert.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  headers: HttpHeaders;
  options: any;

  API_URL = 'http://localhost:4000';
  TOKEN_KEY = 'token';

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    private userService: UserService) {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9', 'Cache-Control': 'no-cache' });
      this.options = ({ headers: this.headers });
  }

  // get token() {
  //   return localStorage.getItem(this.TOKEN_KEY);
  // }

  signinUser(username: string, password: string) {
    const body = { username: username, password: password };
    return this.http.post(this.API_URL + '/login', body, this.options).subscribe(
      (res: any) => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.router.navigate(['/home']);
        this.alertService.showToaster('Login succesful');
      }
    );
  }

  get isAuthenticated() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/home']);
    this.alertService.showToaster('Logout succesful');
  }

}
