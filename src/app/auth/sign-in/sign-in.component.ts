import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  hide = true;
  email2: string;
  password2: string;
  infoUser = this.authService.infoUser;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.sendInfoUser.subscribe(() => {
      this.infoUser = this.authService.infoUser;
    });
  }

  // Send email and password to enforcement method signin() in AuthService
  signin() {
    this.authService.signin(this.email2, this.password2);
  }

  // Enforcement method signin() in AuthService to Log Out account
  logout() {
    this.authService.logout();
  }
}
