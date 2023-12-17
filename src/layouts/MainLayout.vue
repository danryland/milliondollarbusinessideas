<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-dark">
      <div class="logo">
        <router-link to="/" replace>
          <img
            alt="Million Dollar Business Ideas"
            src="~assets/img/logo-million-dollar-business-ideas.svg"
          />
        </router-link>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  setup() {},
};
</script>
