<template>
  <q-page class="flex flex-center">
    <div class="text-center q-pa-md flex column flex-center">
      <h1 class="text-h3 q-mb-xl q-mt-none">Choose an idea</h1>
      <q-card :class="['note', 'note-' + Math.floor(Math.random() * 7 + 1)]">
        <q-card-section>
          <p>
            A platform where musicians collaborate with AI for music
            composition, ensuring human creativity is at the forefront.
          </p>
        </q-card-section>
      </q-card>
    </div>
    <q-footer class="bg-transparent flex flex-center q-pa-xl q-gutter-md">
      <q-btn
        size="lg"
        round
        color="grey-4"
        text-color="dark"
        unelevated
        icon="fa-sharp fa-solid fa-refresh"
        @click="reloadPage"
      />
      <q-btn
        size="lg"
        round
        color="primary"
        text-color="dark"
        icon="fa-sharp fa-solid fa-check"
        @click="showAlert"
      />
    </q-footer>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "IdeasPage",
  setup() {
    const isLoading = ref(false);

    const showAlert = () => {
      window.alert("Coming soon");
    };

    const reloadPage = () => {
      window.location.reload();
    };

    return {
      isLoading,
      showAlert,
      reloadPage,
    };
  },
};
</script>
