<script lang="ts">
  import { type cardNames, getColour, getSVG } from "@core/types";
  import exp from "constants";
  import { createEventDispatcher } from "svelte";

  export let cardType: cardNames;

  export let passive: boolean = false;
  export let back: boolean = false;
  export let noPassive: boolean = false;
  const id = Math.random().toString(36).substring(7);

  const dispatch = createEventDispatcher();

  let toggle = false;

  export let names: cardNames[] = [
    "Board",
    "Change",
    "Deck",
    "Movement",
    "Mystery",
    "Curse",
    "Starter",
  ];

  $: backgroundColour = getColour(cardType);

  $: dispatch("type", cardType);
  $: dispatch("passive", passive);
</script>

{#if !back}
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

  {#if !noPassive}
    <input type="checkbox" {id} bind:checked={passive} class="hidden" />
    <label for={id} class="passive no-select {passive ? '' : 'invisible'}"
      >Passive</label
    >
  {/if}
{/if}

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

  .passive {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
</style>
