<script lang="ts">
  import { getColour } from "@core/types";

  import CardTypeSelect from "./cardTypeSelect.svelte";
  import type { cardNames } from "@core/types";

  export let currentFilter: cardNames = "None";

  $: filterColour = getColour(currentFilter);
</script>

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

<style>
  .select-wrapper {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
</style>
