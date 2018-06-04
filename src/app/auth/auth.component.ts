import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
