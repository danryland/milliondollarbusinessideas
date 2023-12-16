<template>
  <q-page class="flex flex-center">
    <div class="text-center q-pa-md flex column flex-center">
      <h1 class="text-h4 q-mb-lg">Choose an idea</h1>
      <div class="note-holder">
        <div v-for="(idea, index) in ideas" :key="idea.id">
          <transition
            appear
            :enter-active-class="
              [
                'animated slower bounceInLeft',
                'animated slower bounceInDown',
                'animated slower bounceInRight',
                'animated slower bounceInUp',
              ][Math.floor(Math.random() * 4)]
            "
            :leave-active-class="
              [
                'animated slow bounceOutLeft',
                'animated slow bounceOutDown',
                'animated slow bounceOutRight',
                'animated slow bounceOutUp',
              ][Math.floor(Math.random() * 4)]
            "
          >
            <q-card
              v-if="index <= activeIdea"
              :class="['note', 'note-' + (index + 1), 'list-item']"
              :style="{ zIndex: index }"
              @click="
                $router.push({
                  name: 'idea',
                  params: {
                    id: idea.id,
                    slug: idea.title
                      .replace(/[^a-zA-Z0-9]/g, '-')
                      .toLowerCase(),
                  },
                })
              "
            >
              <q-card-section>
                <p>{{ idea.description }}</p>
              </q-card-section>
            </q-card>
          </transition>
        </div>
      </div>
    </div>
    <q-footer
      class="bg-transparent flex flex-center q-pa-xl q-gutter-md text-dark"
    >
      <q-btn
        size="lg"
        round
        text-color="dark"
        unelevated
        icon="fa-sharp fa-regular fa-arrow-left"
        @click="activeIdea = activeIdea - 1"
        :disable="activeIdea === 0"
      />

      <q-btn
        size="lg"
        round
        color="grey-4"
        text-color="dark"
        unelevated
        icon="fa-sharp fa-regular fa-refresh"
        @click="showNextIdea()"
        :disable="activeIdea > getLength(ideas) - 1"
      />
      <q-btn
        size="lg"
        round
        color="primary"
        text-color="dark"
        icon="fa-sharp fa-solid fa-check"
        @click="
          $router.push({
            name: 'idea',
            params: {
              id: ideas[activeIdea].id,
              slug: ideas[activeIdea].title
                .replace(/[^a-zA-Z0-9]/g, '-')
                .toLowerCase(),
            },
          })
        "
      />
    </q-footer>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import supabase from "../supabase";

export default {
  name: "IdeasPage",
  setup() {
    const isLoading = ref(false);
    const ideas = ref([]);
    const activeIdea = ref(0);

    const getIdeas = async () => {
      isLoading.value = true;

      const { data: ideasData, error } = await supabase.rpc(
        "get_20_random_ideas"
      );

      if (error) {
        console.error("Error fetching ideas:", error);
        return;
      }

      console.log(ideasData);

      ideas.value = ideasData;

      isLoading.value = false;
    };

    const showNextIdea = () => {
      activeIdea.value = activeIdea.value + 1;
    };

    const showAlert = () => {
      window.alert("Coming soon");
    };

    const reloadPage = () => {
      window.location.reload();
    };

    const getLength = (item) => {
      if (typeof item === "object" && item !== null) {
        return Object.keys(item).length;
      }
      return 0;
    };

    onMounted(getIdeas);

    return {
      isLoading,
      showAlert,
      reloadPage,
      ideas,
      activeIdea,
      showNextIdea,
      getLength,
    };
  },
};
</script>
