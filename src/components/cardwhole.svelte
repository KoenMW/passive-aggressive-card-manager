<script lang="ts">
  import { getColour, type cardHalf } from "@core/types";
  import CardTypeSelect from "./cardTypeSelect.svelte";

  export let card: cardHalf;
</script>

<div class="card" style="--colour: {getColour(card.cardType.type)};">
  <p>
    <CardTypeSelect
      cardType={card.cardType.type}
      passive={card.cardType.passive}
      names={["Mystery", "curse"]}
      on:type={({ detail }) => (card.cardType.type = detail)}
    />
  </p>
  <div contenteditable="true" class="cardText" bind:innerText={card.text} />
</div>

<style lang="scss">
  .card {
    position: relative;
    --shape: polygon(0% 0%, 50% 0%, 100% 6.6%, 100% 100%, 50% 100%, 0% 93.4%);
    color: black;
    background-color: var(--colour);
    clip-path: var(--shape);
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
      clip-path: var(--shape);
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
      clip-path: var(--shape);
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
</style>
