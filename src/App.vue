<template>
  <div id="app">
 <sidebar-menu :menu="menu" />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/qa">QA</router-link>  |
      <router-link to="/pids">Pids</router-link>  |
      <router-link to="/ctc">Ctc</router-link>  
    </div>
    <router-view />
  </div>
</template>
<script>
import { SidebarMenu } from 'vue-sidebar-menu'

export default {
      components: {
        SidebarMenu
    },
  data() {
    return {
      menu: [
                    {
                        header: true,
                        title: 'Main Navigation',
                        // component: componentName
                        // visibleOnCollapse: true
                    },
                    { // item
                        href: '/',
                        title: 'Dashboard',
                        icon: 'fa fa-user',
                        // disabled: true
                        /*
                        badge: {
                            text: 'new',
                            // class:''
                        }
                        */
                    },
                    { // item with child
                        href: '/charts',
                        title: 'Charts',
                        icon: 'fas fa-chart-area',
                        child: [
                            {
                                href: '/charts/sublink',
                                title: 'Sub Link',
                            }
                        ]
                    },

      ]
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
