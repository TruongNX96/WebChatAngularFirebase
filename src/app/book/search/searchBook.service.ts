import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Injectable, EventEmitter, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchBookService implements OnInit {
    searchEvent = new EventEmitter();
    dataBook = [];
    constructor(
        private http: HttpClient
    ) {
    }
    ngOnInit() {

    }

    // Get book form book api
    onSearch(value) {
        this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + value)
            .subscribe((data: any) => {
                this.dataBook = data.items;
                this.searchEvent.emit();
            });
    }


}
