import { createRouter, createWebHistory } from 'vue-router';
import Panduan from '../components/Panduan.vue';
import TodoList from '../components/TodoList.vue';
import PostList from '../components/PostList.vue';
import Album from '../components/Album.vue';

const routes = [
  {
    path: '/',
    name: 'Panduan',
    component: Panduan
  },
  {
    path: '/todos',
    name: 'Todos',
    component: TodoList
  },
  {
    path: '/postlist',
    name: 'PostList',
    component: PostList
  },
  {
    path: '/album',
    name: 'Album',
    component: Album
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
