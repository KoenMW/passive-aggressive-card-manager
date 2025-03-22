<script lang="ts">
  import Card from "@components/card.svelte";
  import { chunkArray } from "@core/utils";
  import { cards } from "@stores/card";

  let pages: HTMLElement;
</script>

<div>
  <section class="print" bind:this={pages}>
    {#each chunkArray($cards) as chunk}
      <div class="page">
        {#each chunk as c}
          <Card card={c} />
        {/each}
      </div>
      <div class="page">
        {#each chunk as c}
          <Card card={c} back />
        {/each}
      </div>
    {/each}
  </section>
</div>

<style lang="scss">
  .page {
    width: 21cm;
    height: 29.7cm;
    margin-bottom: 3cm;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
</style>
