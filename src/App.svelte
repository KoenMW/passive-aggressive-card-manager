<script lang="ts">
  import Button from "@components/Button.svelte";
  import Card from "@components/card.svelte";
  import { createCard } from "@core/types";
  import { cards, setCards } from "@stores/card";
</script>

<section class="button-container">
  <Button
    on:click={() => {
      cards.set([...$cards, createCard(2)]);
    }}
    colour="blue">add two sided</Button
  >

  <Button
    on:click={() => {
      cards.set([...$cards, createCard(1)]);
      console.log($cards.length);
    }}
    colour="blue">add one sided</Button
  >

  <Button
    on:click={() => {
      setCards($cards);
    }}>save</Button
  >
</section>

<h1>cards</h1>
<section class="container">
  {#each $cards as c}
    <div class="wrapper">
      <Card card={c} />
      <Button
        on:click={() => {
          setCards($cards.filter((card) => card.id !== c.id));
        }}
        colour="red">remove</Button
      >
    </div>
  {/each}
</section>

<style lang="scss">
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .button-container {
    padding: 1em;
    width: 100%;
    background-color: #242424;
    display: flex;
    justify-content: center;
    gap: 20px;
    position: sticky;
    top: 0;
    z-index: 10;
  }
</style>
