<template>
  <q-page class="flex">
    <div v-if="idea" class="text-center q-pa-md">
      <h1 class="text-h4 q-mb-lg">{{ idea.title }}</h1>
      <div v-for="(value, key) in idea" :key="key">
        <div v-if="key !== 'title'">
          <h2 class="text-h5 q-mb-md" style="text-transform: capitalize">
            {{ key }}
          </h2>
          <p>{{ value }}</p>
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
    };
  },
};
</script>
