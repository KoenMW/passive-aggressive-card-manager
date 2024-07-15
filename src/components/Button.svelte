<script lang="ts">
  export let colour: "green" | "red" | "blue" = "green";
</script>

<button class="button {colour}" on:click><slot /></button>

<style lang="scss">
  .button {
    background-color: #1f6422;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }

  .red {
    background-color: #f44336;
  }

  .blue {
    background-color: #2196f3;
  }
</style>
