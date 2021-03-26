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
