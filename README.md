# NoteApp

Aplikasi ini adalah catatan sederhana untuk mencatat ide, daftar tugas, atau informasi penting lainnya. Dengan fitur registrasi pengguna, login, dan manajemen catatan, aplikasi ini memberikan pengalaman pengguna yang mudah dan efisien untuk mengorganisir catatan harian Anda.

## Panduan Penggunaan

### Langkah 1: Inisialisasi Database

Jalankan perintah berikut untuk melakukan inisialisasi database:

npm run initdb

### Langkah 2: Memulai Server

Setelah inisialisasi database selesai, jalankan server dengan perintah:

npm start

### Langkah 3: Menggunakan Postman

1. Buka Postman dan import file koleksi JSON yang dapat diunduh.

2. Setelah diimpor, jalankan permintaan pertama di koleksi:

   - Request: **Register** di folder **Authentication**
   - Permintaan ini telah terisi data yang diperlukan, sehingga Anda hanya perlu langsung menjalankannya.

3. Setelah berhasil mendaftar, jalankan permintaan selanjutnya:

   - Request: **Login** di folder **Authentication**
   - Ambil token dari respons body dan simpan di environment variable dengan nama `authToken`.

4. Ambil juga `userId` dari respons body dan simpan di environment variable dengan nama `userId`.

5. Jalankan permintaan berikutnya sesuai kebutuhan:

   - Request: **getUserInfo** di folder **Authentication**
   - Request: **changePassword** di folder **Authentication**

6. Untuk operasi tugas, buka folder **Tasks** dan jalankan permintaan yang diperlukan:
   - Request: **createTask**
   - Request: **getAllTasks**
   - Request: **getTaskById**
   - Request: **updateTask**
   - Request: **deleteTask** (Pastikan untuk memeriksa status di request **getTaskById** setelahnya).

Selamat menggunakan proyek ini!
