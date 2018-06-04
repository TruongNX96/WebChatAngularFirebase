import { Component, OnInit } from '@angular/core';
import { SearchBookService } from './searchBook.service';
import { ManageBookService } from '../bookself/manageBook.service';
import { AuthService } from '../../auth/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataBook;
  constructor(
    private searchBooksService: SearchBookService,
    private manageBookService: ManageBookService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.searchBooksService.searchEvent.subscribe(() => {
      this.dataBook = this.searchBooksService.dataBook;
    });

  }


  // Enforcement method onSearch() in SearchService to get book
  onSearch(value) {
    this.searchBooksService.onSearch(value);
  }

  addBook(book) {
    this.manageBookService.addBook(book);
    alert('Successfully !'); // ^.^
  }

}
