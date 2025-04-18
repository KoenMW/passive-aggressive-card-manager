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
  import { checkPassiveFilter, checkStringFilter } from "@core/utils";
  import { cards, setCards, uploadJson, downloadJson } from "@stores/card";
  import { route } from "@stores/router";

  let currentFilter: cardNames = "None";
  let stringFilter: string = "";
  let filterPassive: boolean = false;

  $: filteredCards = filterCards(
    $cards,
    currentFilter,
    stringFilter,
    filterPassive
  );

  const filterCards = (
    cards: card[],
    filter: cardNames,
    stringFilter: string,
    passiveFilter: boolean
  ): card[] => {
    return cards.filter(
      (card) =>
        (filter === "None" ||
          card.cardHalf1.cardType.type === filter ||
          (card.cardHalf2 && card.cardHalf2.cardType.type === filter)) &&
        checkStringFilter(card, stringFilter) &&
        checkPassiveFilter(card, passiveFilter)
    );
  };
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

  <label for="filter-passive">filter passive:</label>
  <input
    type="checkbox"
    name="filter-passive"
    id="filter-passive"
    bind:checked={filterPassive}
  />
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
