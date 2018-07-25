import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertService, AuthService } from '../shared';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Input() loading = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService) {
}

  ngOnInit() {

  }

  onSignup(form: NgForm) {
    this.loading = true;
    const username = form.value.username;
    const password = form.value.password;
    // this.authService.signinUser(username, password);
  }

  onSignupGoogle(form: NgForm) {
    this.loading = true;
    // this.authService.signUpWithGoogle();
  }

  onSignupTwitter(form: NgForm) {
    this.loading = true;
    // this.authService.signUpWithTwitter();
  }

  onSignupFacebook(form: NgForm) {
    this.loading = true;
    // this.authService.signUpWithFacebook();
  }

  onSignupGithub(form: NgForm) {
    this.loading = true;
    // this.authService.signUpWithGithub();
  }

}
