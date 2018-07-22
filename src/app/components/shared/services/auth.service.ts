import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from './alert.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

}
