<script>
  import Button from "@components/Button.svelte";
  import { goTo } from "@stores/routes";

  $: console.log(`404 page\nhref: ${window.location.href}`);
</script>

<section class="center">
  <h1>404</h1>
  <p>Page not found</p>

  <Button on:click={() => goTo("/")}>HOME</Button>
</section>

<style>
  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
