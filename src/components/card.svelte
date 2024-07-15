<script lang="ts">
  import { getColour, type card } from "@core/types";
  import Cardhalf from "./cardhalf.svelte";
  import Cardwhole from "./cardwhole.svelte";
  import CardTypeSelect from "./cardTypeSelect.svelte";

  export let card: card;

  const id1 = Math.random().toString(36).substring(7);
  const id2 = Math.random().toString(36).substring(7);

  $: console.log(card.cardHalf1.cardType.passive ? "visible" : "invisible");
</script>

<div class="card">
  {#if card.cardHalf2}
    <p class="first">
      <CardTypeSelect
        cardType={card.cardHalf1.cardType.type}
        on:change={({ detail }) => (card.cardHalf1.cardType.type = detail)}
      />
      <input
        type="checkbox"
        id={id1}
        bind:checked={card.cardHalf1.cardType.passive}
        class="hidden"
      />
      <label
        for={id1}
        class="passive no-select {card.cardHalf1.cardType.passive
          ? ''
          : 'invisible'}">Passive</label
      >
    </p>
    <Cardhalf card={card.cardHalf1} />
    <Cardhalf card={card.cardHalf2} rotation={180} />
    <p class="second">
      <CardTypeSelect
        cardType={card.cardHalf2.cardType.type}
        on:change={({ detail }) => {
          if (card.cardHalf2) card.cardHalf2.cardType.type = detail;
        }}
      />
      <input
        type="checkbox"
        id={id2}
        bind:checked={card.cardHalf2.cardType.passive}
        class="hidden"
      />
      <label
        for={id2}
        class="passive no-select {card.cardHalf2.cardType.passive
          ? ''
          : 'invisible'}">Passive</label
      >
    </p>
  {:else}
    <div class="wrapper">
      <Cardwhole card={card.cardHalf1} />
    </div>
  {/if}
</div>

<style lang="scss">
  .card {
    position: relative;
    width: min-content;
  }

  .wrapper {
    padding: 14px;
    width: 166px;
    height: 264px;
    position: relative;
  }

  .first {
    top: 14px;
    left: 14px;
  }

  .second {
    bottom: 14px;
    right: 14px;
    transform: rotate(180deg);
  }

  p {
    position: absolute;
    margin: 0;
    display: flex;
    align-items: flex-start;
    z-index: 3;
    color: black;
  }
  .passive {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
</style>
