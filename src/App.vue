<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: 'Inter', Arial, sans-serif;
  background: #0c1d31;
}

body {
  min-height: 100vh;
}

button, input, select {
  font: inherit;
}

#app {
  min-height: 100vh;
  background: #0c1d31;
}
</style>
