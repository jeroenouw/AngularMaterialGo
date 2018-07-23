import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BlockchainService } from '../shared';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent implements OnInit {
  data;
  IPFSHash;
  errorMessage: string;

  constructor(private _blockchainService: BlockchainService) {}

  ngOnInit() {
    this.data = this._blockchainService.getBlockchainData();
  }

  postData(form: NgForm) {
    this._blockchainService.postBlockchainData({IPFSHash: this.IPFSHash})
      .subscribe(
        data => this.IPFSHash = JSON.stringify(data),
        error => this.errorMessage = <any>error,
        () => console.log('Post finished')
      );
  }
}
