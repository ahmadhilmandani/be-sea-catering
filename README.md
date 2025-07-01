# SEA-Catering (Backend)

Ini adalah repository backend dari website **SEA-Catering**, sebuah platform layanan katering sehat yang mendukung berbagai jenis diet, pemesanan makanan, dan sistem langganan yang fleksibel. Backend ini dibangun menggunakan **Express (Node.js)** dan menggunakan **MySQL** sebagai basis data.

## Cara Menjalankan di Lokal

Ikuti langkah-langkah berikut untuk menjalankan backend ini di mesin lokal:

1. Clone repository:
   ```bash git clone https://github.com/ahmadhilmandani/be-sea-catering.git ```


3. Masuk ke folder project dan install dependency:
   cd be-sea-catering
   npm install


4. Ubah nama file `.env.example` menjadi `.env`


5. Setup database MySQL:
- Buat database baru di MySQL dengan nama **`sea-catering`** (nama harus persis sama).
- Import struktur dan data awal dari file **`dump-sea-catering.sql`** ke database tersebut.

5. Import data tambahan ke tabel:
- Import file **`delivery_days-table.csv`** ke tabel `delivery_days`
- Import file **`diet_type-table.csv`** ke tabel `diet_type`
- Import file **`meal_type-table.csv`** ke tabel `meal_type`
- Import file **`users-table.csv`** ke tabel `users`

Kamu bisa menggunakan tools seperti phpMyAdmin, MySQL Workbench, atau melalui perintah MySQL CLI.

6. Jalankan server lokal:
   npm run dev

7. Project siap digunakan. Web server akan berjalan di alamat default seperti `http://localhost:3000` (atau sesuai port pada `.env`).

## Akun Pengguna Default

Tersedia 2 akun pengguna untuk pengujian:

- **Admin**
- Email: `admin@sea.com`
- Password: `Admin@123`

- **User Biasa**
- Email: `hilman@g.com`
- Password: `Hilman@123`

Silakan gunakan kredensial ini untuk login dari frontend dan menguji fitur sesuai peran masing-masing.

## Catatan Penting

- Backend ini menggunakan format REST API.
- Jangan lupa untuk memastikan **MySQL** berjalan sebelum menjalankan server.

---

