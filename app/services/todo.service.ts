import { Injectable } from '@angular/core';
import {Http,Headers,Response } from  '@angular/http';
import {Todo} from  '../models/Todo';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class TodoService {

  constructor(private _http:Http) {

   }
 
   restApiPath:string = '/api/v1/todo';
 

 getTodoTasks() :Promise<Todo[]>
 {

  return  this._http.get(this.restApiPath)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
               
 }

 private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        
        return res.json() as Todo[];
    }

saveTodo(todo)
{
   var  headers = new Headers();
   headers.append('Content-Type','application/json');
   return this._http.post(this.restApiPath , JSON.stringify(todo), {headers:headers}).map(res=>res.json());

}
updateTodo(todo)
{
   var  headers = new Headers();
   headers.append('Content-Type','application/json');
   return this._http.post(this.restApiPath+'/' +todo._id, JSON.stringify(todo), {headers:headers});

}
 private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }

}
