import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService, BlockchainService } from '../shared';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @Input() loading = false;

  constructor(
    private authService: AuthService,
    private blockchainService: BlockchainService) {
  }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    this.loading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
    this.postBlockPerAction();
  }

  postBlockPerAction() {
    return this.blockchainService.postBlockPerAction(
      '1a678b49-0162-4cc6-8bdd-4e5b76c67249', 'ngxmatgo@gmail.com', 'genesisuser', 'login'
    );
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
}
