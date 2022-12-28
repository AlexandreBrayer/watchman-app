<script lang="ts">
  import { Pagination } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import { explorerParams, productCount, totalPages } from "../stores/stores";
  import Icon from "@iconify/svelte";
  const dispatch = createEventDispatcher();
  const previous = () => {
    dispatch("previous");
  };
  const next = () => {
    dispatch("next");
  };
</script>

<div class="flex flex-col items-center justify-center mb-1">
  <Pagination table>
    <div
      on:click={previous}
      on:keydown={() => {}}
      slot="prev"
      class="flex items-center gap-2"
    >
      <Icon icon="mdi:chevron-left" class="w-5 h-5" />
      Prev
    </div>
    <div
      on:click={next}
      on:keydown={() => {}}
      slot="next"
      class="flex items-center gap-2"
    >
      Next
      <Icon icon="mdi:chevron-right" class="w-5 h-5" />
    </div>
  </Pagination>
  <p>page {$explorerParams.page} sur {$totalPages} ({$productCount} produits)</p>
</div>
