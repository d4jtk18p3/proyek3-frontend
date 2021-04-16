import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "dashboard" */"../views/pages/dashboard/DashboardMain")
  },
  {
    path: "/mahasiswa/profile",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ "../views/pages/profile/ProfileMahasiswa")
  },
  {
    path: "/mahasiswa/profilling",
    name: "Profilling",
    component: () => import(/* webpackChunkName: "profillingmahasiswa" */ "../views/pages/profilling/ProfillingMain")
  },
  {
    path: "/mahasiswa/absensi",
    name: "AbsensiMahasiswa",
    component: () => import(/* webpackChunkName: "absensimahasiswa" */ "../views/pages/absensi/mahasiswa/AbsensiMahasiswaView")
  },
  {
    path: "/mahasiswa/nilai",
    name: "NilaiMahasiswa",
    component: () => import(/* webpackChunkName: "absensimahasiswa" */ "../views/pages/nilai/mahasiswa/NilaiMahasiswaMain")
  },
  {
    path: "/dosen/absensi",
    name: "AbsensiDosen",
    component: () => import(/* webpackChunkName: "absensimahasiswadosenviewhome" */ "../views/pages/absensi/dosen/AbsensiDosenMain")
  },
  {
    path: "/dosen/absensi-mahasiswa",
    name: "AbsensiMahasiswaDosenView",
    component: () => import(/* webpackChunkName: "absensimahasiswadosenview" */ "../views/pages/absensi/dosen/AbsensiMahasiswaDosenView")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
