import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BlockchainService {
  headers: HttpHeaders;
  options: any;
  blockchainUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = ({ headers: this.headers });
  }

  getBlockchainData(): Observable<any> {
    return this._http.get(`${this.blockchainUrl}`, this.options)
      .pipe(catchError(this._handleError));
  }

  postBlockchainData(param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this._http.post(`${this.blockchainUrl}`, body, this.options)
      .pipe(catchError(this._handleError));
  }

  private _handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return errMsg;
  }
}
