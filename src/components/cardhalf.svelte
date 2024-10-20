<script lang="ts">
  import { getColour, getSVG, type cardHalf } from "@core/types";

  export let card: cardHalf;
  export let rotation: number = 0;
  export let back: boolean = false;

  $: backgroundColour = getColour(card.cardType.type);
</script>

<div class="wrapper" style=" --rotation: {rotation}deg">
  <div class="card" style="--colour: {backgroundColour};">
    {#if back}
      <img src={getSVG(card.cardType.type)} alt="My Icon" class="cardIcon" />
      {#if card.cardType.passive}
        <p class="mirrored">Passive</p>
      {/if}
    {:else}
      <div contenteditable="true" class="cardText" bind:innerText={card.text} />
    {/if}
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    transform: rotate(var(--rotation));
    width: min-content;
    height: 146px;
  }

  .card {
    position: relative;
    --shape: polygon(0% 0%, 50% 0%, 100% 6.6%, 100% 100%, 0% 100%);
    color: black;
    background-color: var(--colour);
    clip-path: var(--shape);
    padding: 14px 14px 0;
    width: 166px;
    min-height: 132px;
    font-size: 12px;
    display: flex;
    max-height: max-content;
    flex-direction: column;
    overflow: visible;

    &::before {
      content: "";
      position: absolute;
      top: 7px;
      left: 7px;
      width: 180px;
      min-height: 139px;
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
      min-height: 132px;
      clip-path: var(--shape);
      background-color: var(--colour);
      z-index: -1;
    }

    .cardText {
      margin: auto 0 auto 0;
      width: 100%;
      background: transparent;
      border: none;
      color: black;
      font-size: 12px;
      height: max-content;
      text-align: center;
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
  }

  .mirrored {
    transform: scaleX(-1);
  }
</style>
