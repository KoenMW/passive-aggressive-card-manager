<script lang="ts">
  import CardFilter from "@components/CardFilter.svelte";
  import Cardhalf from "@components/cardhalf.svelte";
  import { type cardNames } from "@core/types";
  import { cards } from "@stores/card";

  let currentFilter: cardNames = "None";
  let sortPassives: boolean = false;

  $: halves = $cards
    .map((card) => {
      const cardHalves = [card.cardHalf1];
      if (card.cardHalf2) cardHalves.push(card.cardHalf2);
      return cardHalves;
    })
    .flat()
    .filter((half) => {
      if (currentFilter === "None") return half;
      if (half.cardType.type === currentFilter) return half;
    })
    .sort((a, b) => {
      if (!sortPassives) return 0;
      return Number(a.cardType.passive) - Number(b.cardType.passive);
    });
</script>

<section>
  <CardFilter bind:currentFilter />

  <label for="passive">sort passive</label>
  <input
    type="checkbox"
    name="passive"
    id="passive"
    bind:checked={sortPassives}
  />
</section>

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
  input[type="checkbox"] {
    display: none;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
</style>
