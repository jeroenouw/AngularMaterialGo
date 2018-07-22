import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable()
export class UserService {
  public displayName: string;
  public email: string;
  public bio: any;
  public image: any;
  public uid: any;

  constructor(private alertService: AlertService) {
  }

}
