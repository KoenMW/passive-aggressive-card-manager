<script lang="ts">
  import Button from "@components/Button.svelte";
  import Card from "@components/card.svelte";
  import CardTypeSelect from "@components/cardTypeSelect.svelte";
  import {
    createCard,
    getColour,
    type card,
    type cardNames,
  } from "@core/types";
  import { chunkArray } from "@core/utils";
  import { cards, downloadJson, setCards, uploadJson } from "@stores/card";
  import { onMount } from "svelte";

  let pages: HTMLElement;
  let download: boolean;
  let currentFilter: cardNames = "None";

  const filterCards = (cards: card[], filter: cardNames): card[] => {
    if (filter === "None") return cards;
    return cards.filter(
      (card) =>
        card.cardHalf1.cardType.type === filter ||
        (card.cardHalf2 && card.cardHalf2.cardType.type === filter)
    );
  };

  $: filterColour = getColour(currentFilter);

  $: filteredCards = filterCards($cards, currentFilter);

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    download = !!params.get("download");
  });
</script>

{#if !download}
  <section class="button-container">
    <div class="select-wrapper" style="background-color: {filterColour};">
      <CardTypeSelect
        cardType={currentFilter}
        on:type={({ detail }) => (currentFilter = detail)}
        names={[
          "None",
          "Movement",
          "Mystery",
          "Curse",
          "Starter",
          "Board",
          "Change",
          "Deck",
        ]}
        noPassive
      />
    </div>

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

  <h1>cards {$cards.length}</h1>
  <section class="container">
    {#each filteredCards as c}
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

  .select-wrapper {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
</style>
