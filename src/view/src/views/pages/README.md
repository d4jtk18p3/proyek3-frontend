# Pages

Satu halaman yang terdiri dari component-component yang lebih kecil . Tetapi tidak reusable

Misal Ada Folder Home terdiri dari Home Itu sendiri yang terdiri dari 
beberapa section.Maka Folder mungkin terdiri dari beberapa Vue-Component Dibawah :

**Struktur Folder Page :**

    ->page
        -> home
            -> HomeMain.vue
            -> TopSection.vue
            -> BottomSection.vue
            -> HomeCarousel.vue
        -> about
            -> AboutMain.vue
            -> AboutOne.vue
            -> AboutTwo.vue
        -> user

Untuk Keterangan Lengkap bisa dibaca <a href="https://vueschool.io/articles/vuejs-tutorials/structuring-vue-components/">di sini</a> (abaikan layout component)
