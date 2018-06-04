import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyDyYTBMQHx0FAksc6zjQz-VrvBEH1rH7xg',
      authDomain: 'ngproject-truongnx.firebaseapp.com',
      databaseURL: 'https://ngproject-truongnx.firebaseio.com',
      projectId: 'ngproject-truongnx',
      storageBucket: 'gs://ngproject-truongnx.appspot.com',
      messagingSenderId: '992300181490'
    });
  }
}
