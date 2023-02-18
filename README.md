# REST API Dengan Express js dan Mongoose
Ini adalah proyek REST API dengan Node.js dan Mongoose. Proyek ini memungkinkan Anda untuk membuat, membaca, memperbarui, dan menghapus data dari MongoDB. Proyek ini mencakup lima model:
1. Registration dan Login admin
2. Kategori kelas
3. Kelas
4. Peserta
5. Akses kelas peserta

Untuk menjalankan proyek ini, Anda perlu melakukan hal berikut:
1. Instal Node js dan MongoDB di perangkat Anda.
2. Copy atau clone kode pada repositori ini.
3. Jalankan perintah npm install untuk menginstal semua dependensi.
4. Jalankan program dengan perintah node index atau jika memiliki nodemon nodemon index.
5. Server akan berjalan di http://localhost:5000.

Anda dapat menggunakan Postman untuk menguji API. 
- Silahkan import link postman collection berikut untuk melihat dokumentasinya 
   https://api.postman.com/collections/24529439-7574ee51-4a9c-4686-ab98-8828695ea892?access_key=PMAT-01GSFQB6SBDZ6EK4KRJS8441J9 
- Berikut adalah API yang tersedia:
## 1. Registration dan Login admin
    POST /admin/register Untuk register.
    POST /admin/login untuk login.
## 2. Kategori kelas
    POST /category/add Untuk menambahkan kategori kelas.
    GET /category Untuk melihat semua kategori kelas.
    GET /category/{id} Untuk melihat satu kategori kelas.
    PUT /category/{id} Untuk memperbaruhi kategori kelas.
    DELETE /category/{id} Untuk menghapus kategori kelas.
## 3. Kelas
    POST /courses Untuk menambahkan kelas.
    GET /courses Untuk melihat semua kelas.
    GET /courses/{id} Untuk melihat satu kelas.
    PUT /courses/{id} Untuk memperbaruhi kelas.
    DELETE /courses/{id} Untuk menghapus kelas.
## 4. Peserta
    POST /users Untuk menambahkan peserta.
    GET /users Untuk melihat semua peserta.
    GET /users/{id} Untuk melihat satu peserta.
    PUT /users/{id} Untuk memperbaruhi peserta.
    DELETE /users/{id} Untuk menghapus peserta.
## 5. Akses kelas peserta
    POST /usercourse Untuk menambahkan akses kelas peserta.
    GET /usercourse Untuk melihat semua akses kelas peserta.
    GET /usercourse/{id} Untuk melihat satu akses kelas peserta.
    PUT /usercourse/{id} Untuk memperbaruhi akses kelas peserta.
    DELETE /usercourse/{id} Untuk menghapus akses kelas peserta.
    

    
    
