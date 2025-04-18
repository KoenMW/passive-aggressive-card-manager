<script lang="ts">
  import Button from "@components/Button.svelte";
  import Card from "@components/card.svelte";
  import CardFilter from "@components/CardFilter.svelte";
  import CardTypeSelect from "@components/cardTypeSelect.svelte";
  import {
    type cardNames,
    getColour,
    createCard,
    type card,
  } from "@core/types";
  import { cards, setCards, uploadJson, downloadJson } from "@stores/card";
  import { route } from "@stores/router";

  let currentFilter: cardNames = "None";

  let stringFilter: string = "";

  $: filteredCards = filterCards($cards, currentFilter, stringFilter);

  const checkStringFilter = (card: card, stringFilter: string) => {
    stringFilter = stringFilter.toLocaleLowerCase();
    return (
      !stringFilter ||
      card.cardHalf1.text.toLocaleLowerCase().includes(stringFilter) ||
      (card.cardHalf2 &&
        card.cardHalf2.text.toLocaleLowerCase().includes(stringFilter))
    );
  };

  const filterCards = (
    cards: card[],
    filter: cardNames,
    stringFilter: string
  ): card[] => {
    return cards.filter(
      (card) =>
        (card.cardHalf1.cardType.type === filter ||
          filter === "None" ||
          (card.cardHalf2 && card.cardHalf2.cardType.type === filter)) &&
        checkStringFilter(card, stringFilter)
    );
  };

  $: console.log(stringFilter);
</script>

<section class="button-container">
  <CardFilter bind:currentFilter />

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
      route.set("download");
    }}>Download</Button
  >
  <Button
    on:click={() => {
      route.set("half");
    }}>view halves</Button
  >
</section>

<h1>cards {filteredCards.length}</h1>
<div class="filter">
  search filter: <input type="text" bind:value={stringFilter} />
</div>
<section class="container">
  {#each filteredCards as c}
    <div class="wrapper">
      <Card card={c} readable />
      <Button
        on:click={() => {
          setCards($cards.filter((card) => card.id !== c.id));
        }}
        colour="red">remove</Button
      >
    </div>
  {/each}
</section>

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

  .filter {
    padding: 1rem;
  }
</style>
