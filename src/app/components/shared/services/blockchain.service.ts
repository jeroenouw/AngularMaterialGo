import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BlockchainService {
  headers: HttpHeaders;
  options: any;

  BLOCKCHAIN_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
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

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return errMsg;
  }
}
