import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertService, BlockchainService } from '../shared';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent implements OnInit, OnDestroy {
  @Input() loading = false;
  data: Object;
  uid: string;
  email: string;
  user: string;
  action: string;
  postBlockchainData: Object;
  errorMessage: string;

  constructor(
    private alertService: AlertService,
    private blockchainService: BlockchainService) {
    }

  ngOnInit() {
    this.data = this.blockchainService.getBlockchainData();
  }

  postBlock(form: NgForm) {
    this.loading = true;
    this.alertService.showToaster('Check command line for mining progress!');
    this.blockchainService.postBlockchainData({uid: this.uid, email: this.email, user: this.user, action: this.action}).subscribe(
      data => this.postBlockchainData = JSON.stringify(data),
      error => this.errorMessage = <any>error,
      () => this.postBlockFinished()
    );
  }

  postBlockFinished() {
    this.alertService.showToaster('Block created, please refresh this page!');
    this.loading = false;
  }

  ngOnDestroy() {
  }
}
