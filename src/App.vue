<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="=" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          UAS
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/panduan" label="Pedoman" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="custom-drawer">
      <q-list>
        <q-item clickable @click="showTodos">
          <q-item-section>Todos</q-item-section>
        </q-item>
        <q-item clickable @click="showPostList">
          <q-item-section>Post List</q-item-section>
        </q-item>
        <q-item clickable @click="showAlbum">
          <q-item-section>Album</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="content">
        <router-view v-if="!drawerContent" />
        <Todos v-if="drawerContent === 'todos'" :todos="todos" :hideCompleted="hideCompleted" @add-todo="addTodo" @remove-todo="removeTodo" @complete-todo="completeTodo" @uncomplete-todo="uncompleteTodo" @toggle-complete="toggleComplete" />
        <PostList v-if="drawerContent === 'postlist'" :users="users" :selectedUser="selectedUser" :userPosts="userPosts" @select-user="loadPostsByUser" />
        <Album v-if="drawerContent === 'album'" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Todos from './components/TodoList.vue';
import PostList from './components/PostList.vue';
import Album from './components/Album.vue';

export default {
  name: 'App',
  components: {
    Todos,
    PostList,
    Album,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const drawerContent = ref(null);
    const router = useRouter();

    const todos = ref([]);
    const hideCompleted = ref(false);
    const users = ref([]);
    const selectedUser = ref(null);
    const userPosts = ref([]);

    const addTodo = (todo) => {
      todos.value.push(todo);
      saveToLocalStorage();
    };

    const removeTodo = (id) => {
      todos.value = todos.value.filter((todo) => todo.id !== id);
      saveToLocalStorage();
    };

    const completeTodo = (id) => {
      const todo = todos.value.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = true;
        saveToLocalStorage();
      }
    };

    const uncompleteTodo = (id) => {
      const todo = todos.value.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = false;
        saveToLocalStorage();
      }
    };

    const toggleComplete = (todo) => {
      todo.completed = !todo.completed;
      saveToLocalStorage();
    };

    const saveToLocalStorage = () => {
      localStorage.setItem('todos', JSON.stringify(todos.value));
    };

    const loadFromLocalStorage = () => {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        todos.value = JSON.parse(savedTodos);
      }
    };

    const loadUsers = () => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          users.value = data;
          selectedUser.value = data[0];
          loadPostsByUser(selectedUser.value.id);
        })
        .catch((error) => {
          console.error(`Error loading users:`, error);
        });
    };

    const loadPostsByUser = (userId) => {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          userPosts.value = data;
        })
        .catch((error) => {
          console.error(`Error loading posts for user ${userId}:`, error);
        });
    };

    const navigateTo = (path) => {
      leftDrawerOpen.value = false; // Close drawer when navigating
      router.push(path);
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const showTodos = () => {
      drawerContent.value = 'todos';
      navigateTo('/home');
    };

    const showPostList = () => {
      drawerContent.value = 'postlist';
      navigateTo('/home');
    };

    const showAlbum = () => {
      drawerContent.value = 'album';
      navigateTo('/home');
    };

    // Load data on component mount
    onMounted(() => {
      loadFromLocalStorage();
      loadUsers();
    });

    return {
      leftDrawerOpen,
      drawerContent,
      todos,
      hideCompleted,
      users,
      selectedUser,
      userPosts,
      addTodo,
      removeTodo,
      completeTodo,
      uncompleteTodo,
      toggleComplete,
      navigateTo,
      toggleLeftDrawer,
      showTodos,
      showPostList,
      showAlbum,
      loadFromLocalStorage,
      loadUsers,
      loadPostsByUser,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comic+Sans+MS&display=swap');

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-image: url('src/assets/itachi.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid #ccc;
  border-radius: 20px;
}

.info-container {
  background-color: rgba(0, 0, 0, 0.9);
  padding: 5px 1px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
}

.cartoon-font {
  font-family: 'Comic Sans MS', sans-serif;
}

.tab-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab-header button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  background-color: gray;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 20px;
  font-family: 'Comic Sans MS', sans-serif;
}

.tab-header button.active {
  background-color: red;
  border-radius: 20px;
}

.slide-in {
  animation: slide-in 1s ease;
  color: gray;
}

.slide-in1 {
  animation: slide-in 1.2s ease;
}

.slide-in2 {
  animation: slide-in 1.4s ease;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tambahkan gaya ini untuk mengubah background QDrawer menjadi hitam */
.custom-drawer {
  background-color: black !important;
}

.content {
  padding: 16px;
}

.q-drawer {
  width: 200px; /* Adjust the width as necessary */
}

.q-page-container {
  padding-left: 200px; /* Match the drawer width to avoid overlap */
}
</style>
