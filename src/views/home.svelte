<script lang="ts">
  import Button from "@components/Button.svelte";
  import Card from "@components/card.svelte";
  import type { card } from "@core/types";

  let cards: card[] = [
    {
      cardHalf1: {
        cardType: {
          passive: true,
          type: "Board",
        },
        text: "This is a passive card. some larger text to test some things",
      },
      cardHalf2: {
        cardType: {
          passive: false,
          type: "Change",
        },
        text: "This is an active card",
      },
    },
    {
      cardHalf1: {
        cardType: {
          passive: true,
          type: "curse",
        },
        text: "this is a curse card",
      },
      cardHalf2: undefined,
    },
  ];

  const twosided: card = {
    cardHalf1: {
      cardType: {
        passive: true,
        type: "Deck",
      },
      text: "placeholder",
    },
    cardHalf2: {
      cardType: {
        passive: false,
        type: "Movement",
      },
      text: "placeholder",
    },
  };

  const onesided: card = {
    cardHalf1: {
      cardType: {
        passive: true,
        type: "Mystery",
      },
      text: "placeholder",
    },
    cardHalf2: undefined,
  };
</script>

<Button
  on:click={() => {
    cards = [...cards, twosided];
    console.log(cards.length);
  }}>add two sided</Button
>

<Button
  on:click={() => {
    cards = [...cards, onesided];
    console.log(cards.length);
  }}>add one sided</Button
>

<h1>cards</h1>
<section class="container">
  {#each cards as c}
    <Card card={c} />
  {/each}
</section>

<style lang="scss">
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
</style>
