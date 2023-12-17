<template>
  <q-page class="flex flex-center">
    <div class="text-center q-pa-md flex column flex-center">
      <div class="q-mb-lg">
        <h1 class="text-h4 q-mb-sm" v-if="ideas.length">Choose an idea</h1>
        <p class="text-subtitle1 text-grey-7" v-if="!interest && ideas.length">
          From our
          <strong>{{ totalIdeas }} <i>million dollar ideas</i></strong
          >,<br />here's
          <strong>{{ activeIdea + 1 }} of {{ ideas.length }}</strong> to get
          your started:
        </p>
        <p class="text-subtitle1 text-grey-7" v-if="interest && ideas.length">
          From our
          <strong>{{ totalIdeas }} <i>million dollar ideas</i></strong
          >,<br />here's
          <strong>{{ activeIdea + 1 }} of {{ ideas.length }}</strong> ideas
          linked to <strong>{{ interest }}</strong>
        </p>
      </div>
      <div class="note-holder">
        <div v-if="!ideas.length && isLoading">
          <q-spinner size="32px" class="q-mb-md" />
          <p class="text-subtitle1 text-grey-7">
            <strong>Generating ideas...</strong><br /><small
              >10-20s to complete. {{ duration }}s so far</small
            >
          </p>
        </div>
        <div v-if="!ideas.length && hasError && !isLoading">
          <q-icon
            name="fa-regular fa-face-anxious-sweat"
            size="32px"
            class="q-mb-sm text-red-5"
          />
          <p class="text-subtitle1 text-grey-7">
            <strong>Oops...</strong><br /><small
              >We hit a problem - Try reloading</small
            >
          </p>
        </div>
        <div v-if="interest">
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
                @click="showAlert()"
              >
                <q-card-section>
                  <p>{{ idea.description }}</p>
                </q-card-section>
              </q-card>
            </transition>
          </div>
        </div>
        <div v-else>
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
        v-if="!interest"
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
      <q-btn
        v-if="interest"
        size="lg"
        round
        color="primary"
        text-color="dark"
        icon="fa-sharp fa-solid fa-check"
        @click="showAlert()"
      />
    </q-footer>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import supabase from "../supabase";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "IdeasPage",
  setup() {
    const isLoading = ref(false);
    const ideas = ref([]);
    const activeIdea = ref(0);
    const totalIdeas = ref(1);
    const route = useRoute();
    const interest = ref(null);
    const hasError = ref(false);
    const duration = ref(0);

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

    const generateCustomIdeas = async (interestValue) => {
      isLoading.value = true;
      duration.value = 0;
      const intervalId = setInterval(() => {
        duration.value += 1;
      }, 1000);
      try {
        const response = await axios.post(
          `${process.env.SUPABASE_FUNCTION}/bespoke-idea`,
          { interest: interestValue.value },
          {
            headers: {
              Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Bespoke ideas: ", response.data);
        ideas.value = response.data.ideas;

        if (response.data.ideas) {
        }
      } catch (error) {
        console.error("Error fetching custom ideas:", error);
        hasError.value = true;
      } finally {
        isLoading.value = false;
        clearInterval(intervalId);
      }
    };

    onMounted(async () => {
      await getTotalIdeas();
      interest.value = route.query.interest;
      //console.log(route);
      if (interest.value) {
        //console.log(interest);
        await generateCustomIdeas(interest);
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
      hasError,
      duration,
    };
  },
};
</script>
