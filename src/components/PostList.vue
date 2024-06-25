<template>
  <div class="post-container">
    <h2>Postingan</h2><br>
    <div class="select-container">
      <select v-model="selectedUser" @change="handleUserChange">
        <option disabled value="">Pilih pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <h3 v-if="selectedUserName">Postingan oleh: {{ selectedUserName }}</h3>
    <div v-if="filteredPosts.length > 0">
      <ul>
        <li v-for="post in filteredPosts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p style="text-align: center;">Tidak ada postingan untuk pengguna ini.</p>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from 'vue';

export default {
  props: {
    users: Array,
    selectedUser: Object,
  },
  setup(props) {
    const filteredPosts = ref([]);
    const selectedUser = ref(props.selectedUser ? props.selectedUser.id : null);

    const fetchFilteredPosts = async (userId) => {
      if (userId !== null && userId !== '') {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (response.ok) {
          filteredPosts.value = await response.json();
        } else {
          filteredPosts.value = [];
          console.error('Gagal memuat postingan');
        }
      } else {
        filteredPosts.value = [];
      }
    };

    const handleUserChange = (event) => {
      const userId = parseInt(event.target.value);
      const user = props.users.find(user => user.id === userId);
      selectedUser.value = user ? user.id : null;
      fetchFilteredPosts(selectedUser.value);
    };

    watch(() => props.selectedUser, (newVal) => {
      selectedUser.value = newVal ? newVal.id : null;
      fetchFilteredPosts(selectedUser.value);
    });

    onMounted(() => {
      if (props.selectedUser) {
        selectedUser.value = props.selectedUser.id;
        fetchFilteredPosts(selectedUser.value);
      }
    });

    const selectedUserName = computed(() => {
      const user = props.users.find(user => user.id === selectedUser.value);
      return user ? user.name : '';
    });

    return {
      filteredPosts,
      selectedUser,
      handleUserChange,
      selectedUserName
    };
  },
};
</script>

<style scoped>
.post-container {
  background-image: url('src/assets/itachi.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #ccc;
}

.select-container {
  margin-bottom: 20px;
}

.select-container select {
  padding: 8px;
  border-radius: 4px;
  width: 100%;
}

h2, h3 {
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #222;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

li h3 {
  margin: 0 0 10px;
  color: #fff;
}

li p {
  margin: 0;
  color: #ccc;
}
</style>
