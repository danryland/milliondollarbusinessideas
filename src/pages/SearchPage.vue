<template>
  <q-page class="all-ideas">
    <q-table
      flat
      :rows="data"
      :columns="columns"
      :pagination="pagination"
      row-key="id"
      :grid="true"
      :grid-header="true"
      :hide-header="true"
      :filter="filter"
      :title="`Search ${data.length} business ideas`"
      @row-click="(evt, row, index) => navigateToIdea(evt, row, index)"
    >
      <template v-slot:top-right>
        <q-input
          dense
          rounded
          debounce="300"
          v-model="filter"
          placeholder="Search"
          standout
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import supabase from "../supabase";
import { useRouter } from "vue-router";

export default {
  name: "SearchPage",
  setup() {
    const router = useRouter();
    const data = ref([]);
    const columns = ref([
      // {
      //   name: "id",
      //   required: true,
      //   label: "ID",
      //   align: "left",
      //   field: "id",
      // },
      {
        name: "title",
        required: true,
        label: "Title",
        align: "left",
        field: "title",
        sortable: true,
        sortMethod: (a, b) => a.localeCompare(b),
      },
      {
        name: "description",
        required: true,
        label: "Description",
        align: "left",
        field: "description",
      },
      {
        name: "mvp",
        required: true,
        label: "MVP",
        align: "left",
        field: "mvp",
      },
      {
        name: "first_users",
        required: true,
        label: "First Users",
        align: "left",
        field: "first_users",
      },
      {
        name: "first_million",
        required: true,
        label: "First Million",
        align: "left",
        field: "first_million",
      },
    ]);

    const navigateToIdea = (evt, idea, index) => {
      const slug = idea.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      router.push({
        name: "idea",
        params: {
          id: idea.id,
          slug: slug,
        },
      });
    };

    onMounted(async () => {
      const { data: ideasData, error } = await supabase
        .from("ideas")
        .select("id, title, description, mvp, first_users, first_million");

      if (error) {
        console.log("Error: ", error);
      } else {
        data.value = ideasData;
      }
    });

    return {
      navigateToIdea,
      data,
      columns,
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 20,
        // rowsNumber: xx if getting data from a server
      },
      filter: ref(""),
    };
  },
};
</script>
