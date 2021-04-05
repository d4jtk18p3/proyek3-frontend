<template>
  <v-app>
    <SideBar/>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./views/pages/home/HelloWorld"
import SideBar from "./views/component/UI/SideBar"

export default {
  name: "App",
  props: {
    propsExample: {
      type: String,
      required: true,
      validator: (value) => {
        return value.toString() !== `Dani`
      }
    }
  },
  components: {
    HelloWorld,
    SideBar
  },
  data () {
    return {

    }
  }
}
</script>
