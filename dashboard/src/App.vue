<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Layout from './components/Layout.vue'

import { navigationStore } from '@/stores/navigation'
import { darkmodeStore } from './stores/darkmode';

const navigation = navigationStore();
const darkmode = darkmodeStore();

navigation.active = false;

if (window.matchMedia('(prefers-color-scheme: dark)'))
  darkmode.darkmode = true;

window.addEventListener('resize', () => { if (window.innerWidth > 1200) navigation.active = false; })
</script>

<template>
  <Layout>
    <header>
      <nav>
        <RouterLink to="/" @click="navigation.active = false;"><h1>Mongost</h1></RouterLink>
        <div>
          <div :class="{'active': navigation.active }">
            <RouterLink to="/databases" @click="navigation.active = false;">Databases</RouterLink><RouterLink to="/analyses" @click="navigation.active = false;">Analyses</RouterLink><RouterLink to="/storage" @click="navigation.active = false;">Storage</RouterLink><RouterLink to="/authentication" @click="navigation.active = false;">Authentication</RouterLink><RouterLink to="/settings" @click="navigation.active = false;">Settings</RouterLink><RouterLink to="/functions" @click="navigation.active = false;">Functions</RouterLink><RouterLink to="/api" @click="navigation.active = false;">API</RouterLink>
            <span class="material-symbols-outlined" @click="darkmode.toggle">{{darkmode.darkmode ? "light_mode" : "dark_mode"}}</span>
            <span class="material-symbols-outlined" @click="navigation.toggle">close</span>
          </div>
          <span class="material-symbols-outlined" @click="navigation.toggle">menu</span>
        </div>
      </nav>
    </header>

    <main @click="navigation.active = false;">
      <RouterView />
    </main>
  </Layout>
</template>

<style scoped>
  header {
    background: var(--color);
    width: 100%;
  }

  nav {
    height: 100%;
    width: 100%;
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
  nav > div > span, nav > div > div > span:last-child {
    display: none;
  }
  nav > div > div {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-right: 50px;
  }

  nav > div a {
    transition: transform .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  nav > div a:hover {
    transform: translateY(-4px);
  }

  h1 {
    font-size: 35px;
    margin-left: 50px;
  }

  main {
    background: var(--light);
    color: var(--dark);
    padding: 20px;
  }
  .darkmode main {
    background: var(--dark);
    color: var(--light);
  }

  @media screen and (max-width: 375px) {
    h1 {
      font-size: 25px;
    }
  }

  @media screen and (max-width: 1200px) {
    header {
      border: none;
    }
    nav > a {
      z-index: 10;
    }
    nav > div a:hover {
      transform: translateY(-2px);
    }
    nav > div {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      background: var(--color);
    }
    nav > div > span {
      display: flex;
      position: absolute;
      right: 0px;
      transform: translateX(-50%);
      font-size: 40px;
      
    }
    nav > div > div {
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      z-index: -1;
      background: var(--light);
      transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);

      flex-direction: column;
      align-items: flex-start;
      gap: 10px;

      padding-left: 50px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
    .darkmode nav > div > div {
      background: var(--dark);
      color: var(--light);
    }
    .darkmode nav a, .darkmode nav > div > div span {
      color: var(--light);
    }
    .active {
      transform: translateY(calc(100% + 2px));
    }
    nav > div > div > span:last-child {
      display: flex;
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
</style>