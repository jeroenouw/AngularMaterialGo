import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { AuthService, BlockchainService } from '../shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('imageAnimation', [

      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(2)',
      })),

      transition('small <=> large', animate('500ms ease-in', keyframes([
        style({ opacity: 0, transform: 'translateY(-80%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(25px)', offset: 1 })
      ]))),
    ]),
  ]
})
export class ProfileComponent implements OnInit {
  data: any;
  fullImagePath: string;
  state = 'small';

  constructor(
    private router: Router,
    private authService: AuthService,
    private blockchainService: BlockchainService) {
    this.fullImagePath = '/assets/img/mb-bg-04.png';
  }

  ngOnInit() {
    this.authService.getAccount().subscribe(
      (res: any) => {
        this.data = res;
      },
      (err: any) => {
        console.error(err);
        this.router.navigateByUrl('/profile');
      });
  }

  postBlockPerAction() {
    return this.blockchainService.postBlockPerAction(
      '1a678b49-0162-4cc6-8bdd-4e5b76c67249', 'ngxmatgo@gmail.com', 'genesisuser', 'clicked profile picture'
    );
  }

  animateImage() {
    this.state = (this.state === 'small' ? 'large' : 'small');
    this.postBlockPerAction();
  }

}
