<script lang="ts">
  import { getColour, type cardHalf } from "@core/types";
  import CardTypeSelect from "./cardTypeSelect.svelte";

  export let card: cardHalf;
</script>

<div class="card" style="--colour: {getColour(card.cardType.type)};">
  <p>
    <CardTypeSelect
      cardType={card.cardType}
      names={["Mystery", "curse"]}
      on:change={({ detail }) => (card.cardType.type = detail)}
    />
  </p>
  <div contenteditable="true" class="cardText" bind:innerText={card.text} />
</div>

<style lang="scss">
  .card {
    transform: rotate(90deg);

    position: absolute;
    left: -49px;
    top: 49px;
    --shape: polygon(0% 0%, 93.4% 0%, 100% 50%, 100% 100%, 6.6% 100%, 0% 50%);
    color: black;
    background-color: var(--colour);
    clip-path: var(--shape);
    padding: 14px;
    width: 264px;
    height: 166px;
    font-size: 12px;
    display: flex;

    &::before {
      content: "";
      position: absolute;
      top: 7px;
      left: 7px;
      width: 278px;
      height: 180px;
      clip-path: var(--shape);
      background-color: black;
      z-index: -2;
    }

    &::after {
      content: "";
      position: absolute;
      top: 14px;
      left: 14px;
      width: 264px;
      height: 166px;
      clip-path: var(--shape);
      background-color: var(--colour);
      z-index: -1;
    }

    p {
      position: absolute;
      top: 14px;
      left: 14px;
      margin: 0;
      display: flex;
      align-items: center;
    }

    .cardText {
      margin: auto 0 auto 0;
      text-align: center;
      width: 100%;
      background: transparent;
      border: none;
      color: black;
      font-size: 12px;
      height: max-content;
      &:focus {
        outline: none;
      }
    }
  }
</style>
