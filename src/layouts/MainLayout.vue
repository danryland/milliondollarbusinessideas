<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-dark justify-between items-center">
      <div class="logo">
        <router-link to="/" replace>
          <img
            alt="Million Dollar Business Ideas"
            src="~assets/img/logo-million-dollar-business-ideas.svg"
          />
        </router-link>
      </div>
      <div class="cta" v-if="$route.name !== 'search'">
        <q-btn
          size="sm"
          outline
          rounded
          class="btn-padding"
          label="Unlock all"
          no-caps
          @click="showModal = true"
        ></q-btn>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showModal">
      <q-card style="min-width: 350px">
        <q-card-section class="q-pa-lg">
          <h2 class="text-h5 q-mt-none">Email address</h2>
          <q-input standout rounded v-model="userEmail" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-lg">
          <q-btn flat class="text-dark" no-caps label="Cancel" v-close-popup />
          <q-btn
            :disable="!userEmail"
            color="primary"
            text-color="dark"
            no-caps
            rounded
            class="btn-padding"
            label="Unlock"
            @click="storeEmail()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../supabase";

export default {
  name: "MainLayout",

  setup() {
    const userEmail = ref(null);
    const showModal = ref(false);
    const router = useRouter();
    const storeEmail = async () => {
      try {
        // Check if the email already exists
        let { data: existingEmails, error } = await supabase
          .from("access_requests")
          .select("email")
          .eq("email", userEmail.value);

        if (error) throw error;

        // If the email doesn't exist, insert it
        if (!existingEmails.length) {
          let { error } = await supabase
            .from("access_requests")
            .insert({ email: userEmail.value });

          if (error) throw error;
        }

        showModal.value = false;
        router.push({ name: "search" });
      } catch (e) {
        console.error(e);
      }
    };
    return {
      showModal,
      userEmail,
      storeEmail,
    };
  },
};
</script>
