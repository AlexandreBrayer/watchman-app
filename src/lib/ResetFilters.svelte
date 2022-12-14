<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { explorerParams } from "../stores/stores";
  function ResetFilters() {
    $explorerParams = {
      filters: {
        name: {
          value: "",
          strict: false,
        },
        ref: {
          value: "",
          strict: false,
        },
        brand: {
          value: "",
          strict: false,
        },
        url: {
          value: "",
          strict: false,
        },
      },
      sortBy: {
        createdAt: "-1",
      },
      dateBarrier: {
        use: false,
        value: new Date().toISOString().split("T")[0],
        after: true,
      },
      page: 1,
      limit: 20,
    };
  }
</script>

<Button class="my-2" color="red" on:click={ResetFilters}>
  Réinitialiser les filtres
</Button>
