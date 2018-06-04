import { Component, OnInit, ViewChild, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  isChat: string;
  isSearch: string;
  isBook: string;
  subScription: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.subScription = this.router.events.subscribe((val) => {
      if (this.location.path() === '/chat') {
        this.isChat = 'chat';
        this.isBook = '';
        this.isSearch = '';
      } else if (this.location.path() === '/book/bookself') {
        this.isBook = 'bookself';
        this.isChat = '';
        this.isSearch = '';
      } else if (this.location.path() === '/book/search') {
        this.isSearch = 'search';
        this.isChat = '';
        this.isBook = '';
      } else {
        this.isSearch = '';
        this.isChat = '';
        this.isBook = '';
      }
    });
  }
  ngOnChanges() {
  }
  ngOnDestroy() {
    this.subScription.unsubscribe();
  }

  // Enforcement method signin() in AuthService to Log Out account
  logout() {
    this.authService.logout();
  }

}
