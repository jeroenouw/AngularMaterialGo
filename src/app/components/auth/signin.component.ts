import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertService, AuthService } from '../shared';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @Input() loading = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService) {
  }

  ngOnInit() {

  }

  onSignin(form: NgForm) {
    this.loading = true;
    const username = form.value.username;
    const password = form.value.password;
    this.authService.signinUser(username, password);
  }

  onSignInGoogle(form: NgForm) {
    this.loading = true;
    // this.authService.signInWithGoogle();
  }

  onSignInTwitter(form: NgForm) {
    this.loading = true;
    // this.authService.signInWithTwitter();
  }

  onSignInFacebook(form: NgForm) {
    this.loading = true;
    // this.authService.signInWithFacebook();
  }

  onSignInGithub(form: NgForm) {
    this.loading = true;
    // this.authService.signInWithGithub();
  }

  onSigninAnonymous(form: NgForm) {
    this.loading = true;
    // this.authService.signInAnonymous();
  }

}
