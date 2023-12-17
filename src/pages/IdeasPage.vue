<template>
  <q-page class="flex flex-center">
    <div class="text-center q-pa-md flex column flex-center">
      <div class="q-mb-lg">
        <h1 class="text-h4 q-mb-sm">Choose an idea</h1>
        <p class="text-subtitle1 text-grey-7" v-if="ideas.length">
          From our
          <strong>{{ totalIdeas }} <i>million dollar ideas</i></strong
          >,<br />here's
          <strong>{{ activeIdea + 1 }} of {{ ideas.length }}</strong> to get
          your started:
        </p>
        <div v-if="interest">
          From our
          <strong>{{ totalIdeas }} <i>million dollar ideas</i></strong
          >,<br />here's
          <strong>{{ activeIdea }} of {{ ideas.length }}</strong> ideas linked
          to <strong>{{ interest }}</strong>
        </div>
      </div>
      <div class="note-holder">
        <div v-if="interest">
          <q-card class="note note-1">
            <q-card-section>
              <p>Coming soon</p>
            </q-card-section>
          </q-card>
        </div>
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
              :class="['note', 'note-' + (index + 1)]"
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
import { useRoute } from "vue-router";

export default {
  name: "IdeasPage",
  setup() {
    const isLoading = ref(false);
    const ideas = ref([]);
    const activeIdea = ref(0);
    const totalIdeas = ref(1);
    const route = useRoute();
    const interest = ref(null);

    const getTotalIdeas = async () => {
      const { data: totalIdeasData, error } = await supabase
        .from("ideas")
        .select("count");

      if (error) {
        console.log("Error fetching total ideas:", error);
      }

      totalIdeas.value = totalIdeasData[0]["count"];
    };

    const getIdeas = async () => {
      isLoading.value = true;

      const { data: ideasData, error } = await supabase.rpc(
        "get_20_random_ideas"
      );

      if (error) {
        console.error("Error fetching ideas:", error);
        return;
      }

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

    onMounted(async () => {
      await getTotalIdeas();
      interest.value = route.query.interest;
      console.log(route);
      if (interest.value) {
        console.log(interest);
        //await generateCustomIdeas(interest);
      } else {
        await getIdeas();
      }
    });

    return {
      isLoading,
      showAlert,
      reloadPage,
      ideas,
      activeIdea,
      showNextIdea,
      getLength,
      totalIdeas,
      interest,
    };
  },
};
</script>
