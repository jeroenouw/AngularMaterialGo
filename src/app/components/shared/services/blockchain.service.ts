import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { NgForm } from '@angular/forms';

import { AlertService } from './alert.service';

@Injectable()
export class BlockchainService {
  @Input() loading = false;
  headers: HttpHeaders;
  options: any;
  uid: string;
  email: string;
  user: string;
  action: string;
  postData: Object;
  errorMessage: string;

  BLOCKCHAIN_URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private alertService: AlertService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = ({ headers: this.headers });
  }

  getBlockchainData(): Observable<any> {
    return this.http.get(`${this.BLOCKCHAIN_URL}`, this.options)
      .pipe(catchError(this.handleError));
  }

  postBlockchainData(param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http.post(`${this.BLOCKCHAIN_URL}`, body, this.options)
      .pipe(catchError(this.handleError));
  }

  postBlockPerAction(UID: string, Email: string, User: string, Action: string) {
    this.loading = true;
    this.postBlockchainData({uid: UID, email: Email, user: User, action: Action}).subscribe(
      data => this.postData = JSON.stringify(data),
      error => this.errorMessage = <any>error,
      () => this.postBlockPerActionFinished()
    );
  }

  postBlockPerActionFinished() {
    this.alertService.showToaster('Block created, please refresh this page!');
    this.loading = false;
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return errMsg;
  }
}
