<script lang="ts">
  export let colour: "green" | "red" | "blue" = "green";
</script>

<button class="button {colour}" on:click><slot /></button>

<style lang="scss">
  .button {
    clip-path: var(--shapeWhole);
    background-color: #17da20;
    border: none;
    color: black;
    padding: 1em 2em;
    text-align: center;
    font-size: 16px;
    cursor: pointer;

    transition: all 0.1s ease;

    &:hover {
      color: white;
      background-color: #105c15;
      clip-path: var(--shapeWholeReverse);
    }
  }

  .red {
    background-color: #ca2418;

    &:hover {
      background-color: #8f1c0f;
    }
  }

  .blue {
    background-color: #2196f3;

    &:hover {
      background-color: #0f5288;
    }
  }
</style>
