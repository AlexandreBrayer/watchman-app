<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let filters: Filters = {
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
  };

  let enabled = true;
</script>

<div class="w-full mb-1 flex justify-center">
  <Button
    on:click={() => {
      enabled = !enabled;
    }}>Filtres</Button
  >
</div>
{#if enabled}
  <div class="w-3/5 flex-wrap flex m-auto justify-center">
    <div class="w-1/2">
      <div class=" w-full flex justify-start items-center">
        <span class="text-center mr-2">Nom</span>
        <input class="" type="text" bind:value={filters.filters.name.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={filters.filters.name.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Ref.</span>
        <input class="" type="text" bind:value={filters.filters.ref.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={filters.filters.ref.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Marque</span>
        <input class="" type="text" bind:value={filters.filters.brand.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={filters.filters.brand.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Url</span>
        <input class="" type="text" bind:value={filters.filters.url.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={filters.filters.url.strict}
          type="checkbox"
        />
      </div>
    </div>
    <div class="w-1/2">
      <div class=" w-full flex justify-end items-center" />
    </div>
    <Button on:click={() => dispatch("filter", filters)}>Filtrer</Button>
  </div>
{/if}
