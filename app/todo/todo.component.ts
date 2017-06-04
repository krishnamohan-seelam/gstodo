import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Todo[];

  constructor(private _todoService: TodoService) {

  }

  ngOnInit() {

    this.todos = [];
    this._todoService.getTodoTasks()
      .then((todos: Todo[]) => {
      this.todos = todos;

      });

  }

  addTodo($event, todoTask) {
    if ($event.which === 1) {
      var nextTodo = { "task": todoTask.value, "isCompleted": false };
      var result = this._todoService.saveTodo(nextTodo);
      result.subscribe(res => {
        this.todos.push(res);
        todoTask.value=''
      })
    }
  }


 updateTodoStatus(todoTask)
 {
     var updTodo = { "_id":todoTask._id, "task":todoTask.task, "isCompleted":!todoTask.isCompleted}
     console.log(updTodo);
     this._todoService.updateTodo(updTodo)
                      .map(res =>res.json())
                      .subscribe(data => { todoTask.isCompleted=!todoTask.isCompleted});
                                
 }

 updateTodoTask($event, todo){
    if($event.which === 13){
      todo.task = $event.target.value;
      var updTodo = {
        _id: todo._id,
        task: todo.task,
        isCompleted: todo.isCompleted
      };
      
      this._todoService.updateTodo(updTodo)
      .map(res => res.json())
      .subscribe(data => {
        this.setEditState(todo, false);
      });
    }
  }
  setEditState(todo, state){
    if(state){
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }
deleteTodoTask(todoTask:Todo)
{
    
 var index= this.todos.indexOf(todoTask,0);
  if (index !== -1) {
        this.todos.splice(index, 1);
  }
}

}
