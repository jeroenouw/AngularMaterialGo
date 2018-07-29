import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertService, BlockchainService } from '../shared';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  displayName = 'Your username';
  bio: any = 'Your bio';

  constructor(
    private alertService: AlertService,
    private blockchainService: BlockchainService) {
  }

  ngOnInit() {
  }

  onUpdateUserInfo(form: NgForm) {
    // const displayName = form.value.displayName;
    // const bio = form.value.bio;
    this.postBlockPerAction();
    this.alertService.showToaster('Your settings are saved');
  }

  postBlockPerAction() {
    return this.blockchainService.postBlockPerAction(
      '1a678b49-0162-4cc6-8bdd-4e5b76c67249', 'ngxmatgo@gmail.com', 'genesisuser', 'updated profile settings'
    );
  }

}
