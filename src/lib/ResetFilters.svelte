<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { explorerParams } from "../stores/stores";
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";

  const dispatch = createEventDispatcher();

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
    dispatch("filter");
  }
</script>

<Button class="my-2" color="red" on:click={ResetFilters}>
  Réinitialiser les filtres <Icon class="ml-1" icon={"mdi:filter-remove"} />
</Button>
