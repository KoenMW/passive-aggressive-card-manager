<script lang="ts">
  import A4 from "@views/404.svelte";

  import { pages, path, type Route } from "@stores/routes";

  const errorPage: Route = {
    name: "404",
    path: "/404",
    component: A4,
  };

  $: route =
    pages.find((page) => {
      document.title = page.name;
      return (
        page.path === $path || page.path === $path.split("/").filter(Boolean)[0]
      );
    }) ?? errorPage;

  window.onpopstate = () => {
    $path = window.location.pathname;
  };
</script>

<svelte:component this={route.component} />
