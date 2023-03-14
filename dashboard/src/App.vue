<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Layout from './components/Layout.vue'

import { navigationStore } from '@/stores/navigation'
import { darkmodeStore } from './stores/darkmode';

const navigation = navigationStore();
const darkmode = darkmodeStore();

if (window.matchMedia('(prefers-color-scheme: dark)'))
  darkmode.darkmode = true;

window.addEventListener('resize', () => { if (window.innerWidth > 700) navigation.active = false; })
</script>

<template>
  <Layout>
    <header>
      <nav>
        <RouterLink to="/"><h1>Mongost</h1></RouterLink>
        <div>
          <div :class="{'active': navigation.active }">
            <RouterLink to="/databases">Databases</RouterLink><RouterLink to="/analyses">Analyses</RouterLink><RouterLink to="/storage">Storage</RouterLink><RouterLink to="/authentication">Authentication</RouterLink><RouterLink to="/settings">Settings</RouterLink><RouterLink to="/functions">Functions</RouterLink><RouterLink to="/api">API</RouterLink>
            <span class="material-symbols-outlined" @click="darkmode.toggle">dark_mode</span>
          </div>
          <span class="material-symbols-outlined" @click="navigation.toggle">menu</span>
        </div>
      </nav>
    </header>

    <main @click="navigation.toggle">
      <RouterView />
    </main>
  </Layout>
</template>

<style scoped>
  header {
    background: var(--color);
    border-bottom: 2px solid var(--dark);
  }

  nav {
    height: 100%;
    position: relative;
    max-width: 1500px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav > div {
    display: flex;
    align-items: center;
    gap: 40px;
    font-size: 18px;
  }
  nav > div > div {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  h1 {
    font-size: 35px;
  }

  main {
    background: var(--light);
    color: var(--dark);
  }
  .darkmode main {
    background: var(--dark);
    color: var(--light);
  }
</style>