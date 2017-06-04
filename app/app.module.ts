import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TodoComponent } from './todo/todo.component';
import {TodoService} from  './services/todo.service';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule

  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
