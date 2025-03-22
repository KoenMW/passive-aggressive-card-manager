<script lang="ts">
  import { route, type routes } from "@stores/router";
  import Download from "@views/Download.svelte";
  import Half from "@views/Half.svelte";
  import Home from "@views/Home.svelte";
  import type { ComponentType } from "svelte";

  const routes: Record<routes, ComponentType> = {
    "": Home,
    download: Download,
    half: Half,
  };

  $: Page = routes[$route];
</script>

<svelte:component this={Page} />
