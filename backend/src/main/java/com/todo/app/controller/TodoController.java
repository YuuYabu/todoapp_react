package com.todo.app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.app.entity.Todo;
import com.todo.app.service.TodoService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/todo")
    public List<Todo> getAll() {
        return this.todoService.allTodos();
    }

    @PostMapping("/todo/new")
    public void newTodo(@RequestBody Todo newTodo) {
        this.todoService.save(newTodo);
    }

    @PutMapping("/todo/{id}")
    public void updateTodo(@RequestBody Todo newTodo, @PathVariable Integer id) {
        this.todoService.updateTodo(newTodo, id);
    }

    @DeleteMapping("/todo/{id}")
    public void deleteTodo(@PathVariable Integer id) {
        this.todoService.deleteTodo(id);
    }
}
