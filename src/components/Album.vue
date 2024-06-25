<template>
    <div class="album-container">
      <h2 class="header">Album Foto</h2>
      <div class="search-container">
        <input v-model="inputAlbumId" type="number" placeholder="Masukkan ID">
        <button @click="searchAlbum">Cari Album</button>
      </div>
      <div v-if="loading" class="loading">
        <p>Memuat data...</p>
      </div>
      <div v-else>
        <div v-if="album.id">
          <div class="album-details">
          </div>
          <div class="photos-container">
            <div v-for="photo in photos" :key="photo.id" class="photo-card">
              <img :src="photo.thumbnailUrl" alt="Thumbnail">
              <div class="photo-info">
                <p class="photo-text"><strong>User ID:</strong> {{ photo.albumId }}</p>
                <p class="photo-text"><strong>ID Foto:</strong> {{ photo.id }}</p>
                <p class="photo-text"><strong>Judul:</strong> {{ photo.title }}</p>
                <p class="photo-text"><strong>URL:</strong> <a :href="photo.url" target="_blank">{{ photo.url }}</a></p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Album tidak ditemukan.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      albumId: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        album: {},
        photos: [],
        loading: false,
        inputAlbumId: this.albumId,
        internalAlbumId: this.albumId
      };
    },
    async mounted() {
      if (this.internalAlbumId !== null) {
        try {
          this.loading = true;
          await this.getAlbums();
          this.loading = false;
        } catch (error) {
          console.error('Error loading album and photos:', error);
          this.loading = false;
        }
      }
    },
    methods: {
      async fetchPhotos() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/photos');
          if (!response.ok) {
            throw new Error('Failed to fetch photos');
          }
          this.photos = await response.json();
        } catch (error) {
          console.error('Error fetching photos:', error.message);
        }
      },
      async getAlbums() {
        this.album = {};
        this.photos = [];
        this.loading = true;
  
        if (this.photos.length === 0) {
          await this.fetchPhotos();
        }
        await this.fetchAlbum();
        this.selectByAlbumId();
        this.loading = false;
      },
      async fetchAlbum() {
        if (this.internalAlbumId !== null) {
          try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${this.internalAlbumId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch album');
            }
            this.album = await response.json();
          } catch (error) {
            console.error('Error fetching album data:', error);
          }
        } else {
          console.error('Invalid albumId:', this.internalAlbumId);
        }
      },
      selectByAlbumId() {
        if (this.photos.length > 0) {
          this.photos = this.photos.filter(photo => photo.albumId === parseInt(this.internalAlbumId));
        }
      },
      searchAlbum() {
        this.internalAlbumId = this.inputAlbumId;
        this.getAlbums();
      }
    },
    watch: {
      albumId: {
        immediate: true,
        handler(newVal) {
          if (newVal !== null) {
            this.internalAlbumId = newVal;
            this.getAlbums();
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .album-container {
    text-align: center;
    margin: 20px auto;
    max-width: 800px;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 12px;
    background-image: url('src/assets/itachi.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    color: #ffffff;
    margin-bottom: 20px;
    font-family: 'Comic Sans MS', sans-serif;
  }
  
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
    width: 150px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .loading {
    color: #007bff;
  }
  
  .album-details {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .photos-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .photo-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px;
    width: 200px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .photo-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .photo-info {
    padding: 10px;
    text-align: left;
  }
  
  .photo-info p {
    margin: 5px 0;
  }
  
  .photo-text {
    color: black;
  }
  </style>
  