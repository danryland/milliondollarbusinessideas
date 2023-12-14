<template>
  <q-page class="flex flex-center">
    <div class="text-center q-pa-md">
      <h1 class="text-h1">
        <span class="top">Build in a weekend</span><br /><span class="bottom"
          >Make millions</span
        >
      </h1>
      <q-form class="q-my-xl">
        <!-- <p class="text-h5 text-weight-bold">Start with an interest:</p> -->
        <q-input
          v-model="input"
          debounce="1000"
          standout
          rounded
          class="q-mb-lg"
          placeholder="Your interest"
        >
          <template v-slot:append>
            <div v-if="input">
              <div v-if="isDirty">
                <q-icon
                  class="custom-icon"
                  color="red-8"
                  name="fa-regular fa-face-eyes-xmarks"
                  size="24px"
                />
              </div>
              <div v-else>
                <q-icon
                  class="custom-icon"
                  color="green"
                  name="fa-solid fa-check"
                  size="24px"
                />
              </div>
            </div>
          </template>
        </q-input>
        <div class="flex flex-center">
          <div class="q-gutter-md">
            <q-btn
              size="xl"
              color="primary"
              outline
              text-color="dark"
              rounded
              class="q-px-lg"
              no-caps
              label="Random"
              unelevated
              @click="$router.push({ name: 'ideas' })"
            />
            <q-btn
              :loading="isLoading"
              size="xl"
              color="primary"
              text-color="dark"
              rounded
              class="q-px-lg"
              no-caps
              label="Bespoke"
              unelevated
              :disable="input && isDirty"
              @click="showAlert"
            />
          </div>
        </div>
      </q-form>
      <p class="small">
        An
        <a
          href="https://github.com/danryland/milliondollarbusinessideas"
          target="_blank"
          >open source</a
        >
        project by<br />
        <a target="_blank" href="https://twitter.com/realdanryland"
          >Dan Ryland</a
        >, co-founder of
        <a target="_blank" href="https://insidrmusic.com">Insidr&nbsp;Music</a>
      </p>
    </div>
  </q-page>
</template>

<script>
import { ref, watch } from "vue";
// import { pipeline } from "@xenova/transformers";
import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.11.0";

export default {
  name: "IndexPage",
  setup() {
    const isLoading = ref(false);
    const input = ref(null);
    const isDirty = ref(false);

    const showAlert = () => {
      window.alert("Coming soon");
    };

    const classifyInput = async (value) => {
      isDirty.value = false;
      isLoading.value = true;
      let classifier = await pipeline(
        "text-classification",
        "Xenova/toxic-bert"
      );
      let results = await classifier(value, { topk: null });
      isDirty.value = results.some((result) => result.score > 0.5);
      isLoading.value = false;
    };

    watch(input, (value) => {
      classifyInput(value);
    });

    return {
      isLoading,
      isDirty,
      input,
      showAlert,
    };
  },
};
</script>
