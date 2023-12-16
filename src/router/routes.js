const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "ideas",
        name: "ideas",
        component: () => import("pages/IdeasPage.vue"),
      },
      {
        path: "idea/:id-:slug",
        name: "idea",
        component: () => import("pages/SingleIdea.vue"),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
