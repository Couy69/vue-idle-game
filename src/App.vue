<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Serif+SC');
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+SC');
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');

#app {
  font-family: 'Noto Sans','Source Sans Pro','Avenir', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
div,button,span,p,h1,h2,h3,h4,h5,b,input{
  font-family: 'Noto Sans','Source Sans Pro','Avenir', Helvetica, Arial, sans-serif !important;
}
</style>
