import { Component } from '@angular/core';

import { AuthService, BlockchainService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = '';
  isAuthenticated = false;
  angularImage: string;

  menuItems: Array<Object> = [
    {
      icon: 'description',
      title: 'Medium @jeroenouw',
      link: 'https://medium.com/@jeroenouw'
    },
    {
      icon: 'archive',
      title: 'NPM packages',
      link: 'https://www.npmjs.com/~jeroenouw'
    },
    {
      icon: 'link',
      title: 'Fork on Github',
      link: 'https://github.com/jeroenouw/AngularMaterialGo'
    },
  ];

  constructor(
    public authService: AuthService,
    private blockchainService: BlockchainService
  ) {
    this.angularImage = '/assets/img/angular2.png';
  }

  postBlockPerAction() {
    return this.blockchainService.postBlockPerAction(
      '1a678b49-0162-4cc6-8bdd-4e5b76c67249', 'ngxmatgo@gmail.com', 'genesisuser', 'logout'
    );
  }

  onLogout() {
    this.postBlockPerAction();
    this.authService.logout();
  }
}
