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
      // {
      //   path: "/admin",
      //   name: "AddNewUser",
      //   component: () => import(/* webpackChunkName: "add-new-user" */ "../views/admin/pages/addNewUser/AddNewsUserMain")
      // }
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
      }
      // {
      //   path: "/auth/reset-password",
      //   name: "ResetPassword",
      //   component: () => import(/* webpackChunkName: "add-new-user" */ "../views/auth/pages/resetPassword/ResetPassword")
      // }
    ]
  },
  {
    path: "/logbook",
    component: () => import("../views/logbook/LogbookMain"),
    children: [
      {
        path: "/logbook/dashboard",
        name: "DashboardLogbook",
        component: () => import(/* webpackChunkName: "dashboardlogbook" */"../views/logbook/pages/dosen/DashboardLogbook"),
        props: true
      },
      {
        path: "/logbook/logbook-mahasiswa",
        name: "ListMataKuliah",
        component: () => import(/* webpackChunkName: "listmatakuliah" */"../views/logbook/pages/dosen/ListMataKuliah"),
        props: true
      },
      {
        path: "/logbook/logbook-mahasiswa/:prodi/:namaMataKuliah/:kelas",
        name: "ListMahasiswa",
        component: () => import(/* webpackChunkName: "listmahasiswa" */"../views/logbook/pages/dosen/ListMahasiswa"),
        props: true
      },
      {
        path: "/logbook/logbook-mahasiswa/:prodi/:namaMataKuliah/:kelas/:nim",
        name: "ListLogbook",
        component: () => import(/* webpackChunkName: "listLogbook" */"../views/logbook/pages/dosen/LogbookMahasiswa"),
        props: true
      },
      {
        path: "/logbook/logbook-mahasiswa/:prodi/:namaMataKuliah/:kelas/:nim/viewlogbook/:logbookdate",
        name: "ViewLogbook",
        component: () => import(/* webpackChunkName: "viewlogbook" */"../views/logbook/pages/dosen/ViewDetailLogbookMahasiswa"),
        props: true
      }
    ]
  },
  {
    path: "/component-template",
    component: () => import("../views/componentTemplate/ComponentTemplateMain"),
    children: [
      {
        path: "/component-template/button",
        name: "ButtonTemplate",
        component: () => import(/* webpackChunkName: "btn-template" */ "../views/componentTemplate/pages/ButtonTemplate")
      },
      {
        path: "/component-template/alert",
        name: "AlertTemplate",
        component: () => import(/* webpackChunkName: "alert-template" */ "../views/componentTemplate/pages/AlertTemplate")
      },
      {
        path: "/component-template/textfield",
        name: "TextfieldTemplate",
        component: () => import(/* webpackChunkName: "textfield-template" */ "../views/componentTemplate/pages/TextFieldTemplate")
      },
      {
        path: "/component-template/combobox",
        name: "ComboBoxTemplate",
        component: () => import(/* webpackChunkName: "combobox-template" */ "../views/componentTemplate/pages/ComboBoxTemplate")
      },
      {
        path: "/component-template/textarea",
        name: "TextAreaTemplate",
        component: () => import(/* webpackChunkName: "textare-template" */ "../views/componentTemplate/pages/TextAreaTemplate")
      },
      {
        path: "/component-template/grafik",
        name: "GrafikTemplate",
        component: () => import(/* webpackChunkName: "textare-template" */ "../views/componentTemplate/pages/GrafikTemplate")
      },
      {
        path: "/component-template/typography",
        name: "TypographyTemplate",
        component: () => import(/* webpackChunkName: "textare-template" */ "../views/componentTemplate/pages/TypographyTemplate")
      },
      {
        path: "/component-template/calendar",
        name: "Calendar",
        component: () => import(/* webpackChunkName: "textare-template" */ "../views/componentTemplate/pages/CalendarTemplate")
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
