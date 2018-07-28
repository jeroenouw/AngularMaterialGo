import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/subscription';

import { AlertService, BlockchainService } from '../shared';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent implements OnInit, OnDestroy {
  @Input() loading = false;
  private subscription: Subscription;

  data;
  IPFSHash;
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
    this. subscription = this.blockchainService.postBlockchainData({IPFSHash: this.IPFSHash})
      .subscribe(
        data => this.IPFSHash = JSON.stringify(data),
        error => this.errorMessage = <any>error,
        () => this.postBlockFinished()
      );
  }

  postBlockFinished() {
    this.alertService.showToaster('Block created, please refresh!');
    this.loading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
