# Server

## Daftar Isi

- [Prasyarat](#prasyarat)
- [Pengembangan](#pengembangan)
  - [Menggunakan Node.js versi terbaru](#menggunakan-nodejs-versi-terbaru)
    - [Windows](#windows)
    - [Linux](#linux)
  - [Menjalankan & menkonfigurasikan PostgreSQL](#menjalankan--menkonfigurasikan-postgresql)
    - [Windows (dengan pgAdmin)](#windows-dengan-pgadmin)
    - [Docker](#docker)
  - [Mengubah `.env.development` sesuai keadaan local environment](#mengubah-envdevelopment-sesuai-keadaan-local-environment)
  - [Instal dependencies](#instal-dependencies)
  - [Migrasi database](#migrasi-database)
    - [Menyinkronkan database schema](#menyinkronkan-database-schema)
  - [Menjalankan server dalam mode development](#menjalankan-server-dalam-development-mode)
- [Lain-lain](#lain-lain)
  - [Membuat migration skeleton](#membuat-migration-skeleton)

## Prasyarat

1. Instal [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) atau [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) (untuk windows).
2. Instal [PostgreSQL](https://www.postgresql.org/download/).
3. (opsional) Instal [Docker](https://docs.docker.com/get-docker/).

## Pengembangan

### Menggunakan Node.js versi terbaru

[Node.js](https://nodejs.org/) dengan versi `15.x.x` dibutuhkan untuk menjalankan [server](#server). Untuk menginstal versi yang dibutuhkan gunakan Node Version Manager (NVM).

###### Windows

``` cmd
$ nvm use 15.12.0
```

###### Linux

``` sh
$ nvm use
```

### Menjalankan & menkonfigurasikan PostgreSQL

Konfigurasi standar yang dibuat membutuhkan database dengan nama `proyek3`, nama user `proyek3`, dan password `proyek3`.

###### Windows (dengan pgAdmin)

Untuk membuat user dengan nama `proyek3` dan password `proyek3`, ikuti langkah berikut:

1. Buka pgAdmin.
2. Pada bagian `Browser` pilih `Servers > PostgreSQL`.
3. Klik kanan, pada context menu pilih `Create > Login/Group Role...`.
4. Pada window `Create - Login/Group Role` dalam tab `General`, isi kolom `Name` dengan `proyek3`.
5. Pada window `Create - Login/Group Role` dalam tab `Definition`, isi kolom `Password` dengan `proyek3`.
6. Pada window `Create - Login/Group Role` dalam tab `Privileges`, ubah kolom `Can login?` menjadi `Yes`.
7. Pada window `Create - Login/Group Role`, klik tombol `Save`.

Untuk membuat database dengan nama `proyek3`, ikuti langkah berikut:

1. Buka pgAdmin.
2. Pada bagian `Browser` pilih `Servers > PostgreSQL > Databases`.
3. Klik kanan, pada context menu pilih `Create > Database...`.
4. Pada window `Create - Database` dalam tab `General`, isi kolom `Database` dengan `proyek3`.
5. Pada window `Create - Database` dalam tab `General`, isi kolom `Owner` dengan user `proyek3`.
6. Pada window `Create - Database`, klik tombol `Save`.

###### Docker

``` sh
$ docker run \
    --rm \
    --network host \
    --name proyek3-postgres \
    -e POSTGRES_USER=proyek3 \
    -e POSTGRES_PASSWORD=proyek3 \
    -e POSTGRES_DB=proyek3 \
    -d postgres
```

### Mengubah `.env.development` sesuai keadaan local environment

Jika database dengan nama `proyek3`, nama user `proyek3`, dan password `proyek3` telah dibuat, maka langkah ini dapat diabaikan.

### Instal dependencies

Proyek ini memiliki ketergantungan terhadap library dari pihak ketiga. Untuk menginstal semua library yang dibutuhkan jalankan perintah berikut:

``` sh
$ npm install
```

### Migrasikan database schema

[Schema migration](https://sequelize.org/master/manual/migrations.html) digunakan untuk mengelola dan melacak perubahan yang dilakukan terhadap database schema. Terdapat cara yang lebih mudah untuk mensinkronasikan database schema, yaitu dengan menggunakan `sequelize.sync()` namun terdapat kelemahan seperti yang dijelaskan [disini](https://sequelize.org/master/manual/model-basics.html#synchronization-in-production). Sehingga, cara tersebut tidak dapat digunakan dalam proyek ini.

#### Menyinkronkan database schema

Dalam melakukan pengembangan [server](#server), pastikan database schema telah tersinkronisasi dengan versi terbaru, hal ini dapat dilakukan dengan menjalankan perintah berikut:

``` sh
$ npx sequelize-cli db:migrate
```

### Menjalankan server dalam development mode

Untuk menjalankan [server](#server) dalam development mode, jalankan perintah berikut:

``` sh
$ npm run serve:development
```

Dalam development mode, setiap perubahan yang dilakukan terhadap source code akan terdeteksi. Sehingga, [server](#server) akan langsung direstart secara otomatis. Untuk menghentikan [server](#server) tekan tombol `CTRL+C`.

## Lain-lain

#### Membuat migration skeleton

Untuk dapat mengubah database schema, migration file harus dibuat dengan cara menjalankan perintah berikut:

``` sh
$ npx sequelize-cli migration:generate --name migration-skeleton
```

Perintah diatas akan membuat migration file dengan nama `resources/xxx-migration-skeleton.js`, lalu karena proyek ini menggunakan standar ES6 sementara sequelize menggunakan standar commonJS, maka file extension harus diubah menjadi `resources/xxx-migration-skeleton.cjs` agar proses migrasi dapat dilakukan.

Catatan: untuk saat ini, perintah `npx sequelize-cli model:generate` tidak didukung.
