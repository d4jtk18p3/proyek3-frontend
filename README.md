# view

## Daftar Isi

- [Prasyarat](#prasyarat)
- [Pengembangan](#pengembangan)
  - [Menggunakan Node.js versi terbaru](#menggunakan-nodejs-versi-terbaru)
    - [Windows](#windows)
    - [Linux](#linux)
  - [Instal dependencies](#instal-dependencies)
  - [Menjalankan view dalam mode development](#menjalankan-view-dalam-development-mode)

## Prasyarat

1. Instal [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) atau [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) (untuk windows).

## Pengembangan

### Menggunakan Node.js versi terbaru

[Node.js](https://nodejs.org/) dengan versi `15.x.x` dibutuhkan untuk menjalankan [view](#view). Untuk menginstal versi yang dibutuhkan gunakan Node Version Manager (NVM).

###### Windows

``` cmd
$ nvm use 15.12.0
```

###### Linux

``` sh
$ nvm use
```

### Instal dependencies

Proyek ini memiliki ketergantungan terhadap library dari pihak ketiga. Untuk menginstal semua library yang dibutuhkan jalankan perintah berikut:

``` sh
$ npm install
```

### Menjalankan view dalam development mode

Untuk menjalankan [view](#view) dalam development mode, jalankan perintah berikut:

``` sh
$ npm run serve:development
```
