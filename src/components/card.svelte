<script lang="ts">
  import { type card } from "@core/types";
  import Cardhalf from "./cardhalf.svelte";
  import Cardwhole from "./cardwhole.svelte";
  import CardTypeSelect from "./cardTypeSelect.svelte";

  export let card: card;
</script>

<div class="card">
  {#if card.cardHalf2}
    <p class="first">
      <CardTypeSelect
        cardType={card.cardHalf1.cardType.type}
        passive={card.cardHalf1.cardType.passive}
        on:type={({ detail }) => (card.cardHalf1.cardType.type = detail)}
        on:passive={({ detail }) => (card.cardHalf1.cardType.passive = detail)}
      />
    </p>
    <Cardhalf card={card.cardHalf1} />
    <Cardhalf card={card.cardHalf2} rotation={180} />
    <p class="second">
      <CardTypeSelect
        cardType={card.cardHalf2.cardType.type}
        passive={card.cardHalf2.cardType.passive}
        on:type={({ detail }) => {
          if (card.cardHalf2) card.cardHalf2.cardType.type = detail;
        }}
        on:passive={({ detail }) => {
          if (card.cardHalf2) card.cardHalf2.cardType.passive = detail;
        }}
      />
    </p>
  {:else}
    <Cardwhole card={card.cardHalf1} />
  {/if}
</div>

<style lang="scss">
  .card {
    position: relative;
    width: min-content;
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
</style>
