<script lang="ts">
  import { getColour, type card } from "@core/types";
  import Cardhalf from "./cardhalf.svelte";
  import Cardwhole from "./cardwhole.svelte";
  import CardTypeSelect from "./cardTypeSelect.svelte";

  export let card: card;
  export let back: boolean = false;
  export let readable: boolean = false;

  $: fillColour = getColour(card.cardHalf1.cardType.type);
</script>

<div class={`card ${back && "back"}`} style="--colour: {fillColour}">
  {#if card.cardHalf2}
    <div class="first-half half">
      <p class="first">
        <CardTypeSelect
          cardType={card.cardHalf1.cardType.type}
          passive={card.cardHalf1.cardType.passive}
          on:type={({ detail }) => (card.cardHalf1.cardType.type = detail)}
          on:passive={({ detail }) =>
            (card.cardHalf1.cardType.passive = detail)}
          {back}
        />
      </p>
      <Cardhalf card={card.cardHalf1} {back} />
    </div>
    <div class="second-half half">
      <Cardhalf card={card.cardHalf2} rotation={readable ? 0 : 180} {back} />
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
          {back}
        />
      </p>
    </div>
    <div class="fill"></div>
  {:else}
    <Cardwhole card={card.cardHalf1} {back} />
  {/if}
</div>

<style lang="scss">
  .card {
    position: relative;
    width: min-content;
    height: 292px;
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

  .back {
    transform: scaleX(-1);
  }

  .second-half {
    position: absolute;
    top: 49.5%;
  }

  .fill {
    z-index: -1;
    width: 100%;
    height: 10%;
    background-color: var(--colour);
    position: absolute;
    top: 45%;
  }
</style>
