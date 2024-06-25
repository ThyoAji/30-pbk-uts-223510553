<template>
  <div class="panduan">
    <h2>~ Panduan Penggunaan Aplikasi ~</h2>
    <p>Di sini Anda dapat menemukan panduan penggunaan fitur-fitur yang tersedia dalam aplikasi.</p>

    <div class="feature">
      <h3>Fitur Menu Todo:</h3>
      <ol>
        <li>Anda dapat menambahkan kegiatan baru dengan mengklik tombol "Tambah Kegiatan".</li>
        <li>Untuk menyelesaikan kegiatan, klik pada tanda centang di sampingnya.</li>
        <li>Anda dapat menghapus kegiatan dengan mengklik tombol "Hapus".</li>
        <li>Gunakan tombol "Sembunyikan Selesai" untuk menyembunyikan kegiatan yang telah selesai.</li>
      </ol>
    </div>

    <div class="feature">
      <h3>Fitur Menu Post:</h3>
      <ol>
        <li>Menu Post digunakan untuk melihat catatan.</li>
        <li>Pilih pengguna dari dropdown untuk melihat catatan yang dibuat oleh pengguna tersebut.</li>
      </ol>
    </div>

    <div class="feature">
      <h3>Fitur Menu Album:</h3>
      <ol>
        <li>Menu Album digunakan untuk melihat foto.</li>
        <li>Pilih pengguna dari dropdown untuk melihat album yang dibuat oleh pengguna tersebut.</li>
      </ol>
    </div>

    <p>Silakan jelajahi fitur-fitur tersebut dan jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan lebih lanjut.</p>
  </div>
</template>

<script>
export default {
  name: 'Panduan',
};
</script>

<style scoped>
.panduan {
  padding: 20px;
  background-image: url('src/assets/itachi.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2, h3 {
  color: gray;
}

.feature {
  margin-top: 20px;
}

.feature ol {
  list-style-position: inside; /* Mengatur posisi angka/urutan di dalam daftar */
  margin-left: 0; /* Menghapus margin kiri bawaan dari daftar */
  padding-left: 20px; /* Memberi padding kiri untuk daftar */
}

.feature li {
  margin-bottom: 5px;
}

</style>
