<template>
  <div id="app">
    <p
    class="pa-4 text-center font-weight-bold text-h6"
    style="color: red"
    >{{formattedElapsedTime}}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data () {
    return {
      elapsedTime: 0,
      timer: undefined
    }
  },
  computed: {
    formattedElapsedTime () {
      const date = new Date(null)
      date.setSeconds(this.elapsedTime / 1000)
      const utc = date.toUTCString()
      return utc.substr(utc.indexOf(":") - 2, 8)
    }
  },
  methods: {
    start () {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000
      }, 1000)
      console.log(this.elapsedTime)
    },
    stop () {
      this.$emit("clicked", this.timer)
      clearInterval(this.elapsedTime)
    },
    reset () {
      this.elapsedTime = 0
    }
  }
}
</script>
