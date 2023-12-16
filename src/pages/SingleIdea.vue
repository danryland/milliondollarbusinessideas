<template>
  <q-page v-if="idea" class="single-idea">
    <div class="hero text-center">
      <div class="container container-small">
        <h1 class="text-h4 q-my-none">{{ idea.title }}</h1>
      </div>
    </div>
    <div class="idea">
      <div class="container">
        <h2 class="text-h5 text-center">The idea</h2>
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
              @click="generateMvpImage()"
              icon="fa-solid fa-hammer fa-size"
              label="Build it"
              outline
              size="lg"
              class="q-px-lg full-width"
            />
            <div class="q-mt-md full-width text-center">
              <small><i>Can take up to 10s to complete</i></small>
            </div>
          </div>
          <div class="right">
            <div
              class="triangles"
              :class="{ 'triangles-open': mvpImage && !isBuilding }"
            >
              <div class="triangle-top"></div>
              <div class="triangle-left"></div>
              <div class="triangle-right"></div>
              <div class="triangle-bottom"></div>
            </div>
            <q-img
              v-if="mvpImage"
              alt="Image of the prototype"
              :src="mvpImage"
            />
            <q-img
              v-else
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
              :disable="isVisualising"
              :loading="isVisualising"
              @click="generateUsersImage()"
              icon="fa-solid fa-crystal-ball fa-size"
              label="Visualise my users"
              color="white"
              text-color="dark"
              size="lg"
              class="q-pa-lg full-width"
            />
            <div class="q-mt-md full-width text-center">
              <small><i>Can take up to 10s to complete</i></small>
            </div>
          </div>
          <div class="right">
            <div
              class="triangles"
              :class="{ 'triangles-open': usersImage && !isVisualising }"
            >
              <div class="triangle-top"></div>
              <div class="triangle-left"></div>
              <div class="triangle-right"></div>
              <div class="triangle-bottom"></div>
            </div>
            <q-img
              v-if="usersImage"
              alt="Image of your users"
              :src="usersImage"
            />
            <q-img
              v-else
              alt="Image of your users"
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
              :disable="isMoneyMaking"
              :loading="isMoneyMaking"
              @click="generateMillionsImage()"
              icon="fa-solid fa-sack-dollar fa-size"
              label="Show me the money"
              color="white"
              text-color="dark"
              size="lg"
              class="q-pa-lg full-width"
            />
            <div class="q-mt-md full-width text-center">
              <small><i>Can take up to 10s to complete</i></small>
            </div>
          </div>
          <div class="right">
            <div
              class="triangles"
              :class="{ 'triangles-open': millionsImage && !isMoneyMaking }"
            >
              <div class="triangle-top"></div>
              <div class="triangle-left"></div>
              <div class="triangle-right"></div>
              <div class="triangle-bottom"></div>
            </div>
            <q-img
              v-if="millionsImage"
              alt="Image of your millions"
              :src="millionsImage"
            />
            <q-img
              v-else
              alt="Image of your millions"
              src="https://placehold.co/1024x1024"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
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
    const mvpImage = ref("");
    const usersImage = ref("");
    const millionsImage = ref("");
    const isBuilding = ref(false);
    const isVisualising = ref(false);
    const isMoneyMaking = ref(false);

    const showAlert = () => {
      window.alert("Coming soon");
    };

    const generateRandomNote = () => {
      let number = Math.floor(Math.random() * 8) + 1;
      randomNote.value = `note-${number}`;
    };

    const generateImage = async (prompt) => {
      let data = JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.openai.com/v1/images/generations",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_API}`,
        },
        data: data,
      };

      try {
        const response = await axios.request(config);
        //console.log(response.data.data[0].url);
        return response.data.data[0].url;
      } catch (error) {
        console.log(error);
      }
    };

    const generateMvpImage = async () => {
      isBuilding.value = true;
      mvpImage.value = await generateImage(
        `a prototype of the following: ${idea.value.mvp}`
      );
      isBuilding.value = false;
    };

    const generateUsersImage = async () => {
      isVisualising.value = true;
      usersImage.value = await generateImage(
        `a persona of the following: ${idea.value.first_users} for the following idea: ${idea.value.title}`
      );
      isVisualising.value = false;
    };

    const generateMillionsImage = async () => {
      isMoneyMaking.value = true;
      millionsImage.value = await generateImage(
        `a pile of money infront of a red wall with a large painting of: ${idea.value.mvp} in a gold frame`
      );
      isMoneyMaking.value = false;
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
      isVisualising,
      isMoneyMaking,
      showAlert,
      generateMvpImage,
      generateUsersImage,
      generateMillionsImage,
      mvpImage,
      usersImage,
      millionsImage,
    };
  },
};
</script>
