<script lang="ts">
  import Button from "@components/Button.svelte";
  import Card from "@components/card.svelte";
  import { createCard } from "@core/types";
  import { chunkArray } from "@core/utils";
  import { cards, downloadJson, setCards, uploadJson } from "@stores/card";
  import { onMount } from "svelte";

  let pages: HTMLElement;
  let download: boolean;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    download = !!params.get("download");
  });
</script>

{#if !download}
  <section class="button-container">
    <Button
      on:click={() => {
        cards.set([...$cards, createCard(2)]);
      }}
      colour="blue">add two sided</Button
    >

    <Button
      on:click={() => {
        cards.set([...$cards, createCard(1)]);
        console.log($cards.length);
      }}
      colour="blue">add one sided</Button
    >

    <Button
      on:click={() => {
        setCards($cards);
      }}>save</Button
    >

    <Button on:click={uploadJson}>import JSON</Button>
    <Button on:click={downloadJson}>export JSON</Button>
    <Button
      on:click={() => {
        const a = document.createElement("a");
        a.href = `${window.location.href}?download=true`;
        a.click();
      }}>Download</Button
    >
  </section>

  <h1>cards</h1>
  <section class="container">
    {#each $cards as c}
      <div class="wrapper">
        <Card card={c} />
        <Button
          on:click={() => {
            setCards($cards.filter((card) => card.id !== c.id));
          }}
          colour="red">remove</Button
        >
      </div>
    {/each}
  </section>
{:else}
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
{/if}

<style lang="scss">
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .button-container {
    padding: 1em;
    width: 100%;
    background-color: #242424;
    display: flex;
    justify-content: center;
    gap: 20px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .page {
    width: 21cm;
    height: 29.7cm;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
</style>
