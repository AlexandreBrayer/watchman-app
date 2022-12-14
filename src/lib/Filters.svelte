<script lang="ts">
  import { Button, Toggle } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import { explorerParams } from "../stores/stores";

  const dispatch = createEventDispatcher();

  let enabled = false;
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
        <input class="" type="text" bind:value={$explorerParams.filters.name.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.filters.name.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Ref.</span>
        <input class="" type="text" bind:value={$explorerParams.filters.ref.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.filters.ref.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Marque</span>
        <input class="" type="text" bind:value={$explorerParams.filters.brand.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.filters.brand.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Url</span>
        <input class="" type="text" bind:value={$explorerParams.filters.url.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.filters.url.strict}
          type="checkbox"
        />
      </div>
    </div>
    <div class="w-1/2">
      <div class=" w-full flex flex-col justify-end items-end">
        <div>
          <input bind:checked={$explorerParams.dateBarrier.use} id="useDateBarrier" type="checkbox">
          <label for="useDateBarrier">Utiliser une date limite</label>
        </div>
        {#if $explorerParams.dateBarrier.use}
          <div class="flex justify-center items-center">
            <div class="flex justify-center py-1 items-center">
              <input
                class=""
                type="date"
                bind:value={$explorerParams.dateBarrier.value}
              />
            </div>
          </div>          
          <Toggle bind:checked={$explorerParams.dateBarrier.after}>{$explorerParams.dateBarrier.after ? "Apres" : "Avant"}</Toggle>
        {/if}
      </div>
    </div>
    <Button on:click={() => dispatch("filter")}>Filtrer</Button>
  </div>
{/if}
