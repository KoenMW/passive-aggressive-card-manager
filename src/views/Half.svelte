<script lang="ts">
  import Button from "@components/Button.svelte";
  import CardFilter from "@components/CardFilter.svelte";
  import Cardhalf from "@components/cardhalf.svelte";
  import { type cardHalf, type cardNames } from "@core/types";
  import { cards } from "@stores/card";
  import { route } from "@stores/router";

  let currentFilter: cardNames = "None";
  let stringFilter: string = "";
  let filterPassive: boolean = false;

  const checkPassiveFilter = (half: cardHalf, passiveFilter: boolean) => {
    return !passiveFilter || half.cardType.passive;
  };

  $: halves = $cards
    .map((card) => {
      const cardHalves = [card.cardHalf1];
      if (card.cardHalf2) cardHalves.push(card.cardHalf2);
      return cardHalves;
    })
    .flat()
    .filter((half) => {
      console.log(
        half.text
          .toLocaleLowerCase()
          .includes(stringFilter.toLocaleLowerCase()),
        (currentFilter === "None" || half.cardType.type === currentFilter) &&
          half.text
            .toLocaleLowerCase()
            .includes(stringFilter.toLocaleLowerCase()) &&
          checkPassiveFilter(half, filterPassive)
      );
      return (
        (currentFilter === "None" || half.cardType.type === currentFilter) &&
        half.text
          .toLocaleLowerCase()
          .includes(stringFilter.toLocaleLowerCase()) &&
        checkPassiveFilter(half, filterPassive)
      );
    });
</script>

<header>
  <Button
    on:click={() => {
      route.set("");
    }}>home</Button
  >
  <CardFilter bind:currentFilter />
</header>
{currentFilter}: {halves.length}
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
  {#each halves as half}
    <div>
      {half.cardType.passive ? "passive" : ""}
      {half.cardType.type}
      <Cardhalf card={half} editable={false} />
    </div>
  {/each}
</section>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  header {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
</style>
