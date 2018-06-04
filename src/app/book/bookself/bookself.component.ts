import { Component, OnInit } from '@angular/core';
import { ManageBookService } from './manageBook.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-bookself',
  templateUrl: './bookself.component.html',
  styleUrls: ['./bookself.component.css']
})

export class BookselfComponent implements OnInit {
  libraryBook = this.manageBookService.libraryBook;
  storageRef = firebase.storage().ref();
  bookid2;
  image2 = '';
  bathImgBook = '';
  description2;
  title2;
  authors2;
  constructor(
    private manageBookService: ManageBookService) { }

  ngOnInit() {
    // Get book when initialization component
    this.manageBookService.getBook();
    this.manageBookService.getBookEvent.subscribe(() => {
      this.libraryBook = this.manageBookService.libraryBook;
    });
  }

  delBook(book) {
    this.manageBookService.delBook(book);
  }
  creatBook() {
    this.manageBookService.creatBook(this.bookid2, this.title2, this.description2, this.image2, this.authors2);
  }

  onChange(event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    const metadata = {
      'contentType': file.type
    };
    const task = this.storageRef.child('images/' + file.name).put(file, metadata);
    const progress = task.on(firebase.storage.TaskEvent.STATE_CHANGED,
      null,
      null,
      () => {
        this.image2 = task.snapshot.downloadURL;
        this.bathImgBook = task.snapshot.ref.fullPath;
      });
    this.image2 = task.snapshot.downloadURL;
    this.bathImgBook = task.snapshot.ref.fullPath;
  }
}
