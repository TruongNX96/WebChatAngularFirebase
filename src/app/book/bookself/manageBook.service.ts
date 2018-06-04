import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { AuthService } from '../../auth/auth.service';
@Injectable()
export class ManageBookService implements OnInit {
    getBookEvent = new EventEmitter();
    libraryBook = [];
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {

    }

    ngOnInit() {
    }

    // Add book from search to firebase
    addBook(book) {
        firebase.database().ref('users/' + this.authService.account.uid + '/books/' + book.id).set({
            book: book
        });
    }

    // Get book from firebase to component
    getBook() {
        firebase.database().ref('users/' + this.authService.account.uid + '/books/').on('value', (books) => {
            if (books.val() != null) {
                this.libraryBook = Object.values(books.val());
                this.getBookEvent.emit();
            } else {
                this.libraryBook = [];
                this.getBookEvent.emit();
            }
        });
    }

    delBook(book) {
        firebase.database().ref('users/' + this.authService.account.uid + '/books/').child(book).remove();
        this.getBook();
    }
    creatBook(bookid2, title2, description2, image2, authors2) {
        firebase.database().ref('users/' + this.authService.account.uid + '/books/' + bookid2).set({
            book: {
                id: bookid2,
                volumeInfo: {
                    authors: authors2,
                    title: title2,
                    description: description2,
                    imageLinks: {
                        smallThumbnail: image2,
                        thumbnail: image2
                    }
                }
            }
        });
    }

}
