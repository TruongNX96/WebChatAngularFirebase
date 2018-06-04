import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide = true;
  email2: string;
  password2: string;
  fullName2: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  // Send email and password to enforcement method signup() in AuthService
  signup() {
    this.authService.signup(this.fullName2, this.email2, this.password2);
  }

  // Enforcement method signin() in AuthService to Log Out account
  logout() {
    this.authService.logout();
  }

}
