import axios from "axios"
import * as Keycloak from "keycloak-js"
import Vue from "vue"
import VueRouter from "vue-router"
// import _ from "lodash"

Vue.use(VueRouter)

const routes = [
  {
    path: "/akun",
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "akun" */"../views/akun/Home"),
    children: [
      {
        path: "masuk",
        meta: { requiresAuth: false },
        component: () => import(/* webpackChunkName: "akun.masuk" */"../views/akun/Masuk")
      }
    ]
  },
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
        component: () => import(/* webpackChunkName: "add-new-user-" */ "../views/admin/pages/addNewUser/AddNewsUserMain")
      },
      {
        path: "/admin/add-user/form",
        name: "AddNewUserByForm",
        component: () => import(/* webpackChunkName: "add-new-user-by-form" */ "../views/admin/pages/addNewUser/AddNewUserByForm")
      },
      {
        path: "/admin/add-user/excel",
        name: "AddNewUserByExcel",
        component: () => import(/* webpackChunkName: "add-new-user-by-excel" */ "../views/admin/pages/addNewUser/AddNewUserByExcel")
      }
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
    path: "/absensi",
    component: () => import("../views/absensi/AbsensiMain"),
    children: [
      {
        path: "/absensi/mahasiswa/absensi",
        name: "AbsensiMahasiswa",
        component: () => import(/* webpackChunkName: "absensimahasiswa" */ "../views/absensi/pages/mahasiswa/AbsensiMahasiswa")
      },
      {
        path: "/absensi/mahasiswa/upload",
        name: "UploadBukti",
        component: () => import(/* webpackChunkName: "uploadbukti" */ "../views/absensi/pages/mahasiswa/UploadBuktiMhs")
      },
      {
        path: "/absensi/dosen/absensi",
        name: "AbsensiDosen",
        component: () => import(/* webpackChunkName: "absensidosen" */ "../views/absensi/pages/dosen/AbsensiDosen")
      }
    ]
  },
  {
    path: "/logbook",
    component: () => import("../views/logbook/LogbookMain"),
    children: [
      // route logbook - dosen
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
        path: "/logbook/logbook-mahasiswa/:prodi/:namaMataKuliah/:kelas/:nim/viewlogbook/:idEntri",
        name: "ViewLogbook",
        component: () => import(/* webpackChunkName: "viewlogbook" */"../views/logbook/pages/dosen/ViewDetailLogbookMahasiswa"),
        props: true
      },
      // route logbook - mahasiswa
      {
        path: "/logbook/mylogbook",
        name: "MyLogbook",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "logbooksaya" */"../views/logbook/pages/mahasiswa/LogbookSaya"),
        props: true
      },
      {
        path: "/logbook/addlogbook",
        name: "AddLogbook",
        component: () => import(/* webpackChunkName: "tambahlogbook" */"../views/logbook/pages/mahasiswa/TambahLogbook"),
        props: true
      },
      {
        path: "/logbook/editlogbook/:idEntriLogbook",
        name: "EditLogbook",
        component: () => import(/* webpackChunkName: "ubahlogbook" */"../views/logbook/pages/mahasiswa/EditLogbook"),
        props: true
      },
      {
        path: "/logbook/viewlogbook/:idEntriLogbook",
        name: "ViewLogbookMahasiswa",
        component: () => import(/* webpackChunkName: "lihatlogbook" */"../views/logbook/pages/mahasiswa/LihatLogbook"),
        props: true
      }
    ]
  },
  {
    path: "/monitoring",
    component: () => import("../views/monitoring/MonitoringMain"),
    children: [
      // {
      //   path: "/monitoring/dashboard-tugas",
      //   name: "Dashboard",
      //   component: () => import(/* webpackChunkName: "dashboard" */"../views/monitoring/pages/dashboard/DashboardMain")
      // },
      {
        path: "/monitoring/dosen/monitoring-tugas",
        name: "MonitoringDosenMain",
        component: () => import(/* webpackChunkName: "absensimahasiswadosenview" */ "../views/monitoring/pages/dosen/MonitoringDosenMatkul")
      },
      {
        path: "/monitoring/dosen/monitoring-tugas/daftar-tugas",
        name: "MonitoringDosenDaftarTugas",
        component: () => import(/* webpackChunkName: "absensimahasiswadosenview" */ "../views/monitoring/pages/dosen/MonitoringDosenDaftarTugas")
      },
      {
        path: "/monitoring/dosen/monitoring-tugas/matkul",
        name: "MonitoringDosenDaftarTugas",
        component: () => import(/* webpackChunkName: "absensimahasiswadosenview" */ "../views/monitoring/pages/dosen/MonitoringDosenMain")
      },
      {
        path: "/monitoring/dosen/monitoring-tugas/daftar-tugas/tugas",
        name: "MonitoringDosenTugas",
        component: () => import(/* webpackChunkName: "absensimahasiswadosenview" */ "../views/monitoring/pages/dosen/MonitoringDosenTabel")
      },
      {
        path: "/monitoring/dosen/monitoring-tugas/tabel-detail",
        name: "MonitoringDosenDetailTabel",
        component: () => import(/* webpackChunkName: "absensimahasiswadosenview" */ "../views/monitoring/pages/dosen/MonitoringDosenDetailTabel")
      },
      {
        path: "/monitoring/mahasiswa/dashboard",
        name: "Dashboard",
        component: () => import(/* webpackChunkName: "dashboard" */"../views/monitoring/pages/mahasiswa/dashboard/Dashboard")
      },
      {
        path: "/monitoring/mahasiswa/daftar-tugas",
        name: "MonitoringMenu",
        component: () => import(/* webpackChunkName: "dashboard" */"../views/monitoring/pages/mahasiswa/monitoring/Monitoring")
      },
      {
        path: "/monitoring/mahasiswa/namaMatkul/namaTugas",
        name: "Monitoring",
        component: () => import(/* webpackChunkName: "dashboard" */"../views/monitoring/pages/mahasiswa/monitoring/MonitoringTugas")
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
      },
      {
        path: "/component-template/paragraph",
        name: "Paragraph",
        component: () => import(/* webpackChunkName: "paragraph-template" */ "../views/componentTemplate/pages/ParapgraphTemplate")
      },
      {
        path: "/component-template/dialog",
        name: "Dialog",
        component: () => import(/* webpackChunkName: "paragraph-template" */ "../views/componentTemplate/pages/DialogTemplate")
      }
    ]
  }
]

// const fixup = (r) => {
//   if (_.isArray(r)) {
//     return _.map(r, route => {
//       return fixup(route)
//     })
//   }

//   if (_.has(r, "children")) {
//     r.children = fixup(r.children)
//   }
//   r.path = r.path.replace(/^\/akun/, "/")

//   return r
// }

// const fixup2 = (routes) => {
//   return fixup(_.filter(routes, route => {
//     return route.path.startsWith("/akun")
//   }))
// }

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  try {
    if (!(to.meta.requiresAuth && from === VueRouter.START_LOCATION)) {
      next()
      return
    }

    await axios.post("https://akun.6766998f.nip.io/keycloak-proxy/configure", {
      loginPattern: "/auth/realms/staging/protocol/openid-connect/auth",
      loginUrl: "http://localhost:5002/akun/masuk"
    }, {
      withCredentials: true
    })

    const keycloak = Keycloak({
      url: "https://akun.6766998f.nip.io/keycloak-proxy/auth",
      realm: "staging",
      clientId: "public"
    })
    const auth = await keycloak.init({ onLoad: "login-required" })

    if (!auth) {
      window.location.reload()
    } else {
      next()
    }

    setInterval(async () => {
      try {
        await keycloak.updateToken(70)
      } catch (err) {
        console.error(err)
      }
    }, 6000)
  } catch (err) {
    console.error(err)
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   if (from === VueRouter.START_LOCATION) {
//     return next()
//   }

//   const newTo = Object.assign({}, to)
//   newTo.path = newTo.path.replace(/^\/akun/, "/")

//   if (to.path === newTo.path) {
//     return next()
//   }

//   next(newTo)
// })

export default router
