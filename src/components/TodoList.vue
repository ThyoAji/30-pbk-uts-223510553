<template>
  <div class="todo-container">
    <!-- Kotak input -->
    <div class="input-container">
      <input v-model="localNewTodo" placeholder="Masukkan Kegiatan" class="input-field" />
    </div>

    <!-- Tombol tambahkan kegiatan -->
    <button @click="emitAddTodo" class="add-button">Tambah Kegiatan</button>

    <!-- Tombol tampilkan/sembunyikan yang sudah selesai -->
    <button @click="emitToggleCompleted" class="toggle-button">
      {{ localHideCompleted ? 'Tampilkan Semua' : 'Sembunyikan yang sudah selesai' }}
    </button>

    <!-- Daftar kegiatan -->
    <ul class="todo-list">
      <li v-for="todo in visibleTodos" :key="todo.id" class="todo-item">
        <div class="todo-item-content">
          <span :class="{ 'completed': todo.completed }" @click="emitToggleComplete(todo)">{{ todo.text }}</span>
          <button v-if="!todo.completed" @click="emitCompleteTodo(todo.id)" class="complete-button">Selesai</button>
          <button v-else @click="emitUnCompleteTodo(todo.id)" class="uncomplete-button">Batalkan Selesai</button>
          <button @click="emitRemoveTodo(todo.id)" class="remove-button">Hapus</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    todos: Array,
    hideCompleted: Boolean,
  },
  data() {
    return {
      localNewTodo: '',
      localHideCompleted: this.hideCompleted,
    };
  },
  computed: {
    visibleTodos() {
      return this.localHideCompleted ? this.todos.filter((todo) => !todo.completed) : this.todos;
    },
  },
  methods: {
    emitAddTodo() {
      if (this.localNewTodo.trim() !== '') {
        this.$emit('add-todo', {
          id: this.todos.length + 1,
          text: this.localNewTodo,
          completed: false,
        });
        this.localNewTodo = '';
      } else {
        console.error('Kegiatan tidak boleh kosong!');
      }
    },
    emitToggleComplete(todo) {
      this.$emit('toggle-complete', todo);
    },
    emitCompleteTodo(id) {
      this.$emit('complete-todo', id);
    },
    emitUnCompleteTodo(id) {
      this.$emit('uncomplete-todo', id);
    },
    emitRemoveTodo(id) {
      this.$emit('remove-todo', id);
    },
    emitToggleCompleted() {
      this.localHideCompleted = !this.localHideCompleted;
    },
  },
};
</script>

<style scoped>
.todo-container {
  background-image: url('src/assets/itachi.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #ccc;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-field {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
}

.add-button {
  margin-left: 10px;
  padding: 8px 16px;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.add-button:hover {
  background-color: orange;
}

.toggle-button {
  padding: 8px 16px;
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: orange;
}

.todo-list {
  padding-left: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background-color: #222;
  padding: 10px;
  border-radius: 4px;
}

.todo-item-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.completed {
  text-decoration: line-through;
}

.complete-button,
.uncomplete-button,
.remove-button {
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.complete-button {
  background-color: #28a745;
  color: #fff;
}

.uncomplete-button {
  background-color: #ffc107;
  color: #fff;
}

.remove-button {
  background-color: #dc3545;
  color: #fff;
}

.complete-button:hover,
.uncomplete-button:hover,
.remove-button:hover {
  opacity: 0.8;
  background-color: orange;
}
</style>
