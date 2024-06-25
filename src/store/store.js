// store.js

import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [],
    hideCompleted: false,
  }),
  actions: {
    addTodo(todo) {
      this.todos.push(todo);
      this.$patch();
    },
    removeTodoById(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.$patch();
    },
    completeTodoById(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = true;
        this.$patch();
      }
    },
    uncompleteTodoById(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = false;
        this.$patch();
      }
    },
    toggleComplete(todo) {
      todo.completed = !todo.completed;
      this.$patch();
    },
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
  },
});
