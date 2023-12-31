package com.todo.app.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.todo.app.entity.Todo;
import com.todo.app.repository.TodoRepository;

@Service
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> allTodos() {
        return this.todoRepository.findAll(Sort.by(Direction.ASC, "endAt"));
    }

    public Todo updateTodo(Todo newTodo, Integer id) {
        Optional<Todo> optionalTarget = this.todoRepository.findById(id);
        if (optionalTarget.isPresent()) {
            Todo target = optionalTarget.get();
            target.setTitle(newTodo.getTitle());
            target.setEndAt(newTodo.getEndAt());
            target.setCurrentStatus(newTodo.getCurrentStatus());
            return this.save(target);
        } else {
            return null;
        }
    }

    public Todo deleteTodo(Integer id) {
        Optional<Todo> optionalTarget = this.todoRepository.findById(id);
        if (optionalTarget.isPresent()) {
            Todo target = optionalTarget.get();
            target.setDeletedAt(LocalDateTime.now());
            return this.save(target);
        } else {
            return null;
        }
    }

    public Todo save(Todo todo) {
        return this.todoRepository.save(todo);
    }
}
