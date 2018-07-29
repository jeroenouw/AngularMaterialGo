import { Component, OnInit } from '@angular/core';

import { BlockchainService, AlertService } from '../shared';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent implements OnInit {
  data: Object;
  uid: string;
  email: string;
  user: string;
  action: string;

  constructor(
    private blockchainService: BlockchainService,
    private alertService: AlertService) {
    }

  ngOnInit() {
    this.data = this.blockchainService.getBlockchainData();
  }

  postBlock() {
    this.alertService.showToaster('Check command line for mining progress!');
    return this.blockchainService.postBlockPerAction(
      this.uid, this.email, this.user, this.action
    );
  }
}
