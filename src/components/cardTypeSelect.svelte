<script lang="ts">
  import { type cardNames, getColour, getSVG } from "@core/types";
  import { createEventDispatcher } from "svelte";

  export let cardType: cardNames;

  const dispatch = createEventDispatcher();

  let toggle = false;

  export let names: cardNames[] = [
    "Board",
    "Change",
    "Deck",
    "Movement",
    "Mystery",
    "curse",
  ];

  $: backgroundColour = getColour(cardType);

  $: dispatch("change", cardType);
</script>

<div class="select">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <img
    src={getSVG(cardType)}
    alt="My Icon"
    class="cardIcon"
    on:click={() => (toggle = !toggle)}
  />

  {#if toggle}
    <div class="options" style="--colour: {backgroundColour}">
      {#each names as name}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          src={getSVG(name)}
          alt="My Icon"
          class="cardIcon {cardType === name ? 'hidden' : ''}"
          on:click={() => {
            cardType = name;
            toggle = false;
          }}
        />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .select {
    width: 30px;
    min-height: 30px;
    z-index: 5;
  }

  .cardIcon {
    width: 30px;
    height: 30px;
  }

  .options {
    display: flex;
    gap: 5px;
    flex-direction: column;
    width: min-content;
    background-color: var(--colour);
  }
</style>
