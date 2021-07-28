import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: "/home",
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "akun" */"../views/Home")
  },
  // {
  //   path: "/akun",
  //   meta: { requiresAuth: true },
  //   component: () => import(/* webpackChunkName: "akun" */"../views/akun/Main"),
  //   children: [
  //     {
  //       path: "/akun/login",
  //       meta: { requiresAuth: false },
  //       component: () => import(/* webpackChunkName: "akun.masuk" */"../views/akun/pages/Login")
  //     }
  //   ]
  // },
  // {
  //   path: "/template",
  //   component: () => import("../views/template/TemplateMain"),
  //   children: [
  //     {
  //       path: "/template/dashboard",
  //       name: "Dashboard",
  //       component: () => import(/* webpackChunkName: "dashboard" */"../views/template/pages/dashboard/DashboardMain")
  //     },
  //     {
  //       path: "/template/mahasiswa/profile",
  //       name: "Profile",
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "profile" */ "../views/template/pages/profile/ProfileMahasiswa")
  //     },
  //     {
  //       path: "/template/mahasiswa/profilling",
  //       name: "Profilling",
  //       component: () => import(/* webpackChunkName: "profillingmahasiswa" */ "../views/template/pages/profilling/ProfillingMain")
  //     },
  //     {
  //       path: "/template/mahasiswa/absensi",
  //       name: "AbsensiMahasiswa",
  //       component: () => import(/* webpackChunkName: "absensimahasiswa" */ "../views/template/pages/absensi/mahasiswa/AbsensiMahasiswa")
  //     },
  //     {
  //       path: "/template/mahasiswa/upload",
  //       name: "AbsensiMahasiswa",
  //       component: () => import(/* webpackChunkName: "absensimahasiswa" */ "../views/template/pages/absensi/mahasiswa/UploadBuktiMhs")
  //     },
  //     {
  //       path: "/template/mahasiswa/nilai",
  //       name: "NilaiMahasiswa",
  //       component: () => import(/* webpackChunkName: "absensimahasiswa" */ "../views/template/pages/nilai/mahasiswa/NilaiMahasiswaMain")
  //     },
  //     {
  //       path: "/template/dosen/absensi",
  //       name: "AbsensiDosen",
  //       component: () => import(/* webpackChunkName: "absensimahasiswadosenviewhome" */ "../views/template/pages/absensi/dosen/AbsensiDosenMain")
  //     },
  //     {
  //       path: "/template/dosen/absensi-mahasiswa",
  //       name: "AbsensiMahasiswaDosenView",
  //       component: () => import(/* webpackChunkName: "absensimahasiswadosenview" */ "../views/template/pages/absensi/dosen/AbsensiMahasiswaDosenView")
  //     }
  //   ]
  // },
  {
    path: "/admin",
    // meta: { requiresAuth: true },
    component: () => import("../views/admin/AdminMain"),
    children: [
      {
        path: "/admin",
        // meta: { requiresAuth: true },
        name: "AddNewUser",
        component: () =>
          import(
            /* webpackChunkName: "add-new-user-" */ "../views/admin/pages/AddNewUser/AddNewsUserMain"
          )
      },
      {
        path: "/admin/add-user/form",
        // meta: { requiresAuth: true },
        name: "AddNewUserByForm",
        component: () =>
          import(
            /* webpackChunkName: "add-new-user-by-form" */ "../views/admin/pages/AddNewUser/AddNewUserByForm"
          )
      },
      {
        path: "/admin/add-user/excel",
        // meta: { requiresAuth: true },
        name: "AddNewUserByExcel",
        component: () =>
          import(
            /* webpackChunkName: "add-new-user-by-form" */ "../views/admin/pages/AddNewUser/AddNewUserByExcel"
          )
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
        component: () =>
          import(
            /* webpackChunkName: "add-new-user" */ "../views/auth/pages/forgetPassword/ForgetPassword"
          )
      },
      {
        path: "/auth/reset-password",
        name: "ResetPassword",
        component: () =>
          import(
            /* webpackChunkName: "add-new-user" */ "../views/auth/pages/ResetPassword/ResetPassword"
          )
      }
    ]
  },
  {
    path: "/absensi",
    meta: { requiresAuth: true },
    component: () => import("../views/absensi/AbsensiMain"),
    children: [
      {
        meta: {
          requiresAuth: true,
          title: "Absensi Mahasiswa"
        },
        path: "/absensi/mahasiswa/absensi",
        name: "AbsensiMahasiswa",
        component: () =>
          import(
            /* webpackChunkName: "absensimahasiswa" */ "../views/absensi/pages/mahasiswa/AbsensiMahasiswa"
          )
      },
      {
        path: "/absensi/dosen/dosenwali",
        meta: { requiresAuth: true },
        name: "NilaiMahasiswa",
        component: () => import(/* webpackChunkName: "absensimahasiswa" */ "../views/absensi/pages/dosen/AbsensiDosenWali")
      },
      {
        path: "/absensi/mahasiswa/upload",
        meta: { requiresAuth: true },
        name: "UploadBukti",
        component: () =>
          import(
            /* webpackChunkName: "uploadbukti" */ "../views/absensi/pages/mahasiswa/UploadBuktiMhs"
          )
      },
      {
        path: "/absensi/dosen/absensi",
        meta: { requiresAuth: true },
        name: "AbsensiDosen",
        component: () =>
          import(
            /* webpackChunkName: "absensidosen" */ "../views/absensi/pages/dosen/AbsensiDosen"
          )
      },
      {
        path: "/absensi/dosen/perkuliahan",
        meta: { requiresAuth: false },
        name: "Perkuliahan",
        component: () =>
          import(
            /* webpackChunkName: "absensimahasiswadosenview" */ "../views/absensi/pages/dosen/PerkuliahanDosen"
          ),
        props: true
      }
    ]
  },
  {
    path: "/logbook",
    meta: { requiresAuth: true },
    component: () => import("../views/logbook/LogbookMain"),
    children: [
      // route logbook - dosen
      {
        path: "/logbook/dashboard",
        meta: { requiresAuth: true },
        name: "DashboardLogbook",
        component: () =>
          import(
            /* webpackChunkName: "dashboardlogbook" */ "../views/logbook/pages/dosen/DashboardLogbook"
          ),
        props: true
      },
      {
        path: "/logbook/logbook-mahasiswa",
        meta: { requiresAuth: true },
        name: "ListMataKuliah",
        component: () =>
          import(
            /* webpackChunkName: "listmatakuliah" */ "../views/logbook/pages/dosen/ListMataKuliah"
          ),
        props: true
      },
      {
        path: "/logbook/logbook-mahasiswa/:prodi/:namaMataKuliah/:kelasString",
        meta: { requiresAuth: true },
        name: "ListMahasiswa",
        component: () =>
          import(
            /* webpackChunkName: "listmahasiswa" */ "../views/logbook/pages/dosen/ListMahasiswa"
          ),
        props: true
      },
      {
        path: "/logbook/logbook-mahasiswa/:prodi/:namaMataKuliah/:kelasString/:nim",
        meta: { requiresAuth: true },
        name: "ListLogbook",
        component: () =>
          import(
            /* webpackChunkName: "listLogbook" */ "../views/logbook/pages/dosen/LogbookMahasiswa"
          ),
        props: true
      },
      {
        path:
          "/logbook/logbook-mahasiswa/:prodi/:namaMataKuliah/:kelasString/:nim/viewlogbook/:idEntri",
        meta: { requiresAuth: true },
        name: "ViewLogbook",
        component: () =>
          import(
            /* webpackChunkName: "viewlogbook" */ "../views/logbook/pages/dosen/ViewDetailLogbookMahasiswa"
          ),
        props: true
      },
      // route logbook - mahasiswa
      {
        path: "/logbook/mylogbook",
        meta: { requiresAuth: true },
        name: "MyLogbook",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "logbooksaya" */ "../views/logbook/pages/mahasiswa/LogbookSaya"
          ),
        props: true
      },
      {
        path: "/logbook/addlogbook",
        meta: { requiresAuth: true },
        name: "AddLogbook",
        component: () =>
          import(
            /* webpackChunkName: "tambahlogbook" */ "../views/logbook/pages/mahasiswa/TambahLogbook"
          ),
        props: true
      },
      {
        path: "/logbook/editlogbook/:idEntriLogbook",
        meta: { requiresAuth: true },
        name: "EditLogbook",
        component: () =>
          import(
            /* webpackChunkName: "ubahlogbook" */ "../views/logbook/pages/mahasiswa/EditLogbook"
          ),
        props: true
      },
      {
        path: "/logbook/viewlogbook/:idEntriLogbook",
        meta: { requiresAuth: true },
        name: "ViewLogbookMahasiswa",
        component: () =>
          import(
            /* webpackChunkName: "lihatlogbook" */ "../views/logbook/pages/mahasiswa/LihatLogbook"
          ),
        props: true
      }
    ]
  },
  {
    path: "/monitoring",
    meta: { requiresAuth: true },
    component: () => import("../views/monitoring/monitoringmain"),
    children: [
      {
        path: "/monitoring/dosen/dashboard-tugas",
        meta: { requiresAuth: true },
        name: "DashboardDosenMain",
        component: () => import(/* webpackChunkName: "dashboardDosenMain" */"../views/monitoring/pages/dosen/DashboardDosenMain")
      },
      {
        path: "/monitoring/dosen/dashboard-tugas/daftar-tugas/:id_matkul/:id_perkuliahan",
        meta: { requiresAuth: true },
        name: "DashboardDosenMonitoring",
        component: () => import(/* webpackChunkName: "dashboardDosenMonitoring" */"../views/monitoring/pages/dosen/DashboardDosenMonitoring")
      },
      {
        path: "/monitoring/dosen/monitoring-tugas",
        meta: { requiresAuth: true },
        name: "MonitoringDosenMatkul",
        component: () => import(/* webpackChunkName: "monitoringDosenMatkul" */ "../views/monitoring/pages/dosen/MonitoringDosenMatkul")
      },
      {
        path: "/monitoring/dosen/monitoring-tugas/daftar-tugas/:id_matkul/:id_perkuliahan",
        meta: { requiresAuth: true },
        name: "MonitoringDosenDaftarTugas",
        component: () => import(/* webpackChunkName: "monitoringDosenDaftarTugas" */ "../views/monitoring/pages/dosen/MonitoringDosenDaftarTugas")
      },
      // {
      //   path: "/monitoring/dosen/monitoring-tugas/matkul",
      //   name: "MonitoringDosenMain",
      //   component: () => import(/* webpackChunkName: "monitoringDosenMain" */ "../views/monitoring/pages/dosen/MonitoringDosenMain")
      // },
      {
        path: "/monitoring/dosen/monitoring-tugas/daftar-tugas/:id_matkul/:id_perkuliahan/tugas/:id_tugas",
        meta: { requiresAuth: true },
        name: "MonitoringDosenTugas",
        component: () => import(/* webpackChunkName: "monitoringDosenTugas" */ "../views/monitoring/pages/dosen/MonitoringDosenTabel")
      },
      {
        path: "/monitoring/dosen/monitoring-tugas/daftar-tugas/:id_matkul/:id_perkuliahan/tugas/:id_tugas/:id_mhs",
        meta: { requiresAuth: true },
        name: "MonitoringDosenDetailTabel",
        component: () => import(/* webpackChunkName: "monitoringDosenDetailTabel" */ "../views/monitoring/pages/dosen/MonitoringDosenDetailTabel")
      },
      {
        path: "/monitoring/mahasiswa/dashboard",
        meta: { requiresAuth: true },
        name: "DashboardMonitoringMhs",
        component: () => import(/* webpackChunkName: "dashboard" */"../views/monitoring/pages/mahasiswa/dashboard/DashboardMahasiswa")
      },
      {
        path: "/monitoring/mahasiswa/daftar-tugas",
        meta: { requiresAuth: true },
        name: "MonitoringMenu",
        component: () => import(/* webpackChunkName: "dashboard" */"../views/monitoring/pages/mahasiswa/monitoring/MonitoringMahasiswaDaftarTugas")
      },
      {
        path: "/monitoring/mahasiswa/matakuliah/:namaMatkul&:namaTugas&:id",
        meta: { requiresAuth: true },
        name: "MonitoringTugas",
        component: () => import(/* webpackChunkName: "dashboard" */"../views/monitoring/pages/mahasiswa/monitoring/MonitoringMahasiswaTugasItem")
      },
      {
        path: "/monitoring/mahasiswa/monitoringTeman/:namaMatkul&:namaTugas&:id",
        meta: { requiresAuth: true },
        name: "MonitoringTeman",
        component: () => import(/* webpackChunkName: "dashboard" */"../views/monitoring/pages/mahasiswa/monitoring/MonitoringMahasiswaBersama")
      },
      {
        path: "/monitoring/mahasiswa/matakuliah",
        meta: { requiresAuth: true },
        name: "MonitoringDaftarMatkul",
        component: () => import(/* webpackChunkName: "dashboard" */"../views/monitoring/pages/mahasiswa/monitoring/MonitoringMahasiswaDaftarMatKul")
      }
      // {
      //   path: "/auth/reset-password",
      //   name: "ResetPassword",
      //   component: () => import(/* webpackChunkName: "add-new-user" */ "../views/auth/pages/resetPassword/ResetPassword")
      // }
    ]
  },
  {
    path: "/component-template",
    component: () => import("../views/componentTemplate/ComponentTemplateMain"),
    children: [
      {
        path: "/component-template/button",
        name: "ButtonTemplate",
        component: () =>
          import(
            /* webpackChunkName: "btn-template" */ "../views/componentTemplate/pages/ButtonTemplate"
          )
      },
      {
        path: "/component-template/alert",
        name: "AlertTemplate",
        component: () =>
          import(
            /* webpackChunkName: "alert-template" */ "../views/componentTemplate/pages/AlertTemplate"
          )
      },
      {
        path: "/component-template/textfield",
        name: "TextfieldTemplate",
        component: () =>
          import(
            /* webpackChunkName: "textfield-template" */ "../views/componentTemplate/pages/TextFieldTemplate"
          )
      },
      {
        path: "/component-template/combobox",
        name: "ComboBoxTemplate",
        component: () =>
          import(
            /* webpackChunkName: "combobox-template" */ "../views/componentTemplate/pages/ComboBoxTemplate"
          )
      },
      {
        path: "/component-template/textarea",
        name: "TextAreaTemplate",
        component: () =>
          import(
            /* webpackChunkName: "textare-template" */ "../views/componentTemplate/pages/TextAreaTemplate"
          )
      },
      {
        path: "/component-template/grafik",
        name: "GrafikTemplate",
        component: () =>
          import(
            /* webpackChunkName: "textare-template" */ "../views/componentTemplate/pages/GrafikTemplate"
          )
      },
      {
        path: "/component-template/typography",
        name: "TypographyTemplate",
        component: () =>
          import(
            /* webpackChunkName: "textare-template" */ "../views/componentTemplate/pages/TypographyTemplate"
          )
      },
      {
        path: "/component-template/calendar",
        name: "Calendar",
        component: () =>
          import(
            /* webpackChunkName: "textare-template" */ "../views/componentTemplate/pages/CalendarTemplate"
          )
      },
      {
        path: "/component-template/paragraph",
        name: "Paragraph",
        component: () =>
          import(
            /* webpackChunkName: "paragraph-template" */ "../views/componentTemplate/pages/ParapgraphTemplate"
          )
      },
      {
        path: "/component-template/dialog",
        name: "Dialog",
        component: () =>
          import(
            /* webpackChunkName: "paragraph-template" */ "../views/componentTemplate/pages/DialogTemplate"
          )
      }
    ]
  },
  {
    path: "/penilaian",
    meta: { requiresAuth: true },
    component: () => import("../views/penilaian/PenilaianMain"),
    children: [
      {
        path: "/penilaian/input-nilai",
        name: "Input Nilai Mahasiswa",
        component: () =>
          import(
            /* webpackChunkName: "inputnilaisection" */ "../views/penilaian/pages/dosen/InputNilaiSection.vue"
          )
      },
      {
        path: "/penilaian/input-nilai-matkul/:id",
        meta: { requiresAuth: true },
        name: "Input Nilai Matkul",
        component: () =>
          import(
            /* webpackChunkName: "inputnilaisection" */ "../views/penilaian/pages/dosen/InputNilaiMatkul.vue"
          ),
        props: true
      },
      {
        path: "/penilaian/dashboard-nilai-mahasiswa",
        meta: { requiresAuth: true },
        name: "Dashboard Nilai Mahasiswa",
        component: () =>
          import(
            /* webpackChunkName: "inputnilaisection" */ "../views/penilaian/pages/mahasiswa/DashboardNilaiMahasiswa.vue"
          )
      },
      {
        path: "/penilaian/dashboard-nilai-dosen-pengampu",
        meta: { requiresAuth: true },
        name: "Dashboard Nilai Section",
        component: () =>
          import(
            /* webpackChunkName: "inputnilaisection" */ "../views/penilaian/pages/dosen/DashboardNilaiSection.vue"
          )
      },
      {
        path: "/penilaian/dashboard-nilai-dosen-pengampu/:id",
        meta: { requiresAuth: true },
        name: "Dashboard Nilai Dosen Pengampu",
        component: () =>
          import(
            /* webpackChunkName: "inputnilaisection" */ "../views/penilaian/pages/dosen/DashboardNilaiDosenPengampu.vue"
          )
      },
      {
        path: "/penilaian/transkripsi-nilai/:id",
        meta: { requiresAuth: true },
        name: "Transkripsi Nilai",
        component: () =>
          import(
            /* webpackChunkName: "inputnilaisection" */ "../views/penilaian/pages/mahasiswa/TranskripsiNilai.vue"
          ),
        props: true
      }
    ]
  }
]

const getRoutes = () => {
  const hostname = window.location.hostname

  if (hostname === process.env.VUE_APP_AKUN_HOSTNAME) {
    return [
      {
        path: "/",
        meta: { requiresAuth: true },
        component: () => import(
          /* webpackChunkName: "akun" */"../views/akun/Main"
        ),
        children: [
          {
            path: "login",
            meta: { requiresAuth: false },
            component: () => import(
              /* webpackChunkName: "akun.login" */"../views/akun/pages/Login"
            )
          },
          {
            path: "reset-password",
            meta: { requiresAuth: true },
            component: () => import(/* webpackChunkName: "akun.reset-password" */ "../views/akun/pages/ResetPassword")
          }
        ]
      }
    ]
  }
  return routes
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: getRoutes()
})

router.afterEach(async (to, from) => {
  if (!(to.meta.requiresAuth && from === VueRouter.START_LOCATION)) {
    return
  }

  store.dispatch("authenticate")
})

export default router
