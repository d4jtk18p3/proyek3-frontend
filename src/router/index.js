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
        component: () => import(/* webpackChunkName: "add-new-user" */ "../views/admin/pages/AddNewUser/AddNewsUserMain")
      },
      {
        path: "/admin/list-akun",
        name: "ListAkun",
        component: () => import("../views/admin/pages/ListAkun/ListAkun")
      },
      {
        path: "/admin/akun/:id",
        name: "EditAkun",
        component: () => import("../views/admin/pages/EditAkun/EditAkun")
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
        component: () => import(/* webpackChunkName: "add-new-user" */ "../views/auth/pages/ResetPassword/ResetPassword")
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
