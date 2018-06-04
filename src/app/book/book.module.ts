import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appRoutes } from '../modules/routing.module';
import { SearchBookService } from './search/searchBook.service';
import { BookselfComponent } from './bookself/bookself.component';
import { SearchComponent } from './search/search.component';
import { BookComponent } from './book.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageBookService } from './bookself/manageBook.service';
import { AuthService } from '../auth/auth.service';
import { NgMaterialModule } from '../modules/ngMaterial.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    appRoutes,
    HttpClientModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchComponent,
    BookselfComponent,
    BookComponent
  ],
  providers: [SearchBookService, ManageBookService]
})
export class BookModule { }
