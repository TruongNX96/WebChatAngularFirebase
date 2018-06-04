import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';

@Injectable()
export class CanActivateService implements CanActivate {
    constructor(
        private route: Router,
        private authService: AuthService
    ) {

    }
    canActivate() {
        // If Login, return true;
        if (this.authService.account !== null) {
            return true;
        } else {
            // Direct to '/'
            this.route.navigate(['/auth']);
            return false;
        }
    }
}
