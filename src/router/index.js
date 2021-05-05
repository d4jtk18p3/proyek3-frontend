import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/template",
    component: () => import("../views/template/TemplateMain"),
    children: [
      {
        path: "/template/dashboard",
        name: "Dashboard",
        component: () => import(/* webpackChunkName: "dashboard" */"../views/template/pages/dashboard/DashboardMain")
      },
      {
        path: "/template/mahasiswa/profile",
        name: "Profile",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "profile" */ "../views/template/pages/profile/ProfileMahasiswa")
      },
      {
        path: "/template/mahasiswa/profilling",
        name: "Profilling",
        component: () => import(/* webpackChunkName: "profillingmahasiswa" */ "../views/template/pages/profilling/ProfillingMain")
      },
      {
        path: "/template/mahasiswa/absensi",
        name: "AbsensiMahasiswa",
        component: () => import(/* webpackChunkName: "absensimahasiswa" */ "../views/template/pages/absensi/mahasiswa/AbsensiMahasiswaView")
      },
      {
        path: "/template/mahasiswa/nilai",
        name: "NilaiMahasiswa",
        component: () => import(/* webpackChunkName: "absensimahasiswa" */ "../views/template/pages/nilai/mahasiswa/NilaiMahasiswaMain")
      },
      {
        path: "/template/dosen/absensi",
        name: "AbsensiDosen",
        component: () => import(/* webpackChunkName: "absensimahasiswadosenviewhome" */ "../views/template/pages/absensi/dosen/AbsensiDosenMain")
      },
      {
        path: "/template/dosen/absensi-mahasiswa",
        name: "AbsensiMahasiswaDosenView",
        component: () => import(/* webpackChunkName: "absensimahasiswadosenview" */ "../views/template/pages/absensi/dosen/AbsensiMahasiswaDosenView")
      }
    ]
  },
  {
    path: "/admin",
    component: () => import("../views/admin/AdminMain"),
    children: [
      {
        path: "/admin",
        name: "AddNewUser",
        component: () => import(/* webpackChunkName: "add-new-user" */ "../views/admin/pages/addNewUser/AddNewsUserMain")
      }
      // {
      //   path: "/admin/add-user/form",
      //   name: "AddNewUserByForm",
      //   component: () => import(/* webpackChunkName: "add-new-user" */ "../views/admin/pages/AddNewUser/AddNewUserByForm")
      // }
    ]
  },
  {
    path: "/auth",
    component: () => import("../views/auth/AuthMain"),
    children: [
      {
        path: "/auth/forget-password",
        name: "ForgetPassword",
        component: () => import(/* webpackChunkName: "add-new-user" */ "../views/auth/pages/forgetPassword/ForgetPassword")
      },
      {
        path: "/auth/reset-password",
        name: "ResetPassword",
        component: () => import(/* webpackChunkName: "add-new-user" */ "../views/auth/pages/resetPassword/ResetPassword")
      }
    ]
  },
  {
    path: "/component-template",
    component: () => import("../views/componentTemplate/ComponentTemplateMain"),
    children: [
      {
        path: "/component-template/dashboard",
        name: "DashboardEx",
        component: () => import(/* webpackChunkName: "dashboard" */"../views/template/pages/dashboard/DashboardMain")
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
