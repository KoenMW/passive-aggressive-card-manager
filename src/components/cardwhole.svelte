<script lang="ts">
  import { getColour, getSVG, type cardHalf } from "@core/types";
  import CardTypeSelect from "./cardTypeSelect.svelte";

  export let card: cardHalf;
  export let back: boolean = false;
</script>

<div class="card" style="--colour: {getColour(card.cardType.type)};">
  {#if !back}
    <p>
      <CardTypeSelect
        cardType={card.cardType.type}
        passive={card.cardType.passive}
        names={["Mystery", "Curse"]}
        on:type={({ detail }) => (card.cardType.type = detail)}
      />
    </p>
    <div contenteditable="true" class="cardText" bind:innerText={card.text} />
  {:else}
    <img src={getSVG(card.cardType.type)} alt="My Icon" class="cardIcon" />
  {/if}
</div>

<style lang="scss">
  .card {
    position: relative;
    color: black;
    background-color: var(--colour);
    clip-path: var(--shapeWhole);
    padding: 14px;
    width: 166px;
    height: 264px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: "";
      position: absolute;
      top: 7px;
      left: 7px;
      width: 180px;
      height: 278px;
      clip-path: var(--shapeWhole);
      background-color: black;
      z-index: -2;
    }

    &::after {
      content: "";
      position: absolute;
      top: 14px;
      left: 14px;
      width: 166px;
      height: 264px;
      clip-path: var(--shapeWhole);
      background-color: var(--colour);
      z-index: -1;
    }

    p {
      position: absolute;
      top: 30px;
      left: 108px;
      margin: 0;
      display: flex;
      align-items: top;
      width: 70px;
      height: 70px;
      transform: rotate(90deg);
    }

    .cardText {
      transform: rotate(90deg);
      color: black;
      font-size: 12px;
      width: 264px;
      &:focus {
        outline: none;
      }
    }
  }

  .cardIcon {
    width: 50%;
    height: 50%;
    margin: auto;
    object-fit: contain;
    rotate: 90deg;
  }
</style>
