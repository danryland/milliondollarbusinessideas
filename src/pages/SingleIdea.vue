<template>
  <q-page v-if="idea" class="single-idea">
    <div class="hero text-center">
      <div class="container container-small">
        <h1 class="text-h3 q-my-none">{{ idea.title }}</h1>
      </div>
    </div>
    <div class="idea">
      <div class="container">
        <h2 class="text-h4 text-center">The idea</h2>
        <q-card :class="['note', randomNote]">
          <q-card-section>
            <p>{{ idea.description }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="section mvp">
      <div class="container">
        <h2>Build the prototype</h2>
        <div class="box">
          <div class="left">
            <h3>MVP</h3>
            <p>{{ idea.mvp }}</p>
            <q-btn
              :disable="isBuilding"
              :loading="isBuilding"
              @click="showAlert"
              icon="fa-solid fa-hammer fa-size"
              label="Build it"
              outline
              size="lg"
              class="q-px-lg full-width"
            />
          </div>
          <div class="right">
            <q-img
              alt="Image of the prototype"
              src="https://placehold.co/1024x1024"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="section users">
      <div class="container">
        <h2>Get your first users</h2>
        <div class="box">
          <div class="left">
            <h3>First 10 users</h3>
            <p>{{ idea.first_users }}</p>
            <q-btn
              :disable="isMarketing"
              :loading="isMarketing"
              @click="showAlert"
              icon="fa-solid fa-crystal-ball fa-size"
              label="Visualise my users"
              color="white"
              text-color="dark"
              size="lg"
              class="q-px-lg full-width"
            />
          </div>
          <div class="right">
            <q-img
              alt="Image of your first users"
              src="https://placehold.co/1024x1024"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="section million text-dark">
      <div class="container">
        <h2>Make your <span>first million</span></h2>
        <div class="box">
          <div class="left">
            <h3>First million</h3>
            <p>{{ idea.first_million }}</p>
            <q-btn
              :disable="isMarketing"
              :loading="isMarketing"
              @click="showAlert"
              icon="fa-solid fa-sack-dollar fa-size"
              label="Show me the money"
              color="white"
              text-color="dark"
              size="lg"
              class="q-px-lg full-width"
            />
          </div>
          <div class="right">
            <q-img
              alt="Image of your first million"
              src="https://placehold.co/1024x1024"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import supabase from "../supabase";

export default {
  name: "SingleIdea",
  props: {
    id: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const idea = ref(null);
    const randomNote = ref("");
    const isBuilding = ref(false);

    const showAlert = () => {
      window.alert("Coming soon");
    };

    const generateRandomNote = () => {
      let number = Math.floor(Math.random() * 8) + 1;
      randomNote.value = `note-${number}`;
    };

    onMounted(generateRandomNote);

    onMounted(async () => {
      const { data, error } = await supabase
        .from("ideas")
        .select("title, description, mvp, first_users, first_million")
        .eq("id", props.id)
        .single();

      if (error) {
        console.log("Error: ", error);
      } else {
        idea.value = data;
      }
    });

    return {
      idea,
      randomNote,
      isBuilding,
      showAlert,
    };
  },
};
</script>
