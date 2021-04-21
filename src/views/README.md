# Component

Folder Ini akan digunakan untuk membuat component yang reusable.
Dibagi menjadi 2 Tipe dibawah berikut



### **Domain Component**

<t>Adalah component yang akan digunakan spesifik pada domain dari web. Seperti **ArticleListItem.Vue**



### **UI Component**
Adalah component yang umum tidak terikat pada domain. Seperti **Button.Vue** , **Header.vue** , dst


**Struktur Folder Component :**


    ->component
        -> article
            -> ArticleCircleImageItem.vue
            -> ArticeSqureImageItem.vue
            -> ArticleImageOnlyItem.vue
        -> jadwal
            -> JadwalItem.vue
            -> SmallJadwalItem.vue
        -> UI
            ->NavBar.vue
            ->Sidebar.vue
            ->Footer.vue
            ->InteractiveButton.vue



Untuk Keterangan Lengkap bisa dibaca <a href="https://vueschool.io/articles/vuejs-tutorials/structuring-vue-components/">di sini</a> (abaikan layout component)


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
