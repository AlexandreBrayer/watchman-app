<script lang="ts">
  import { Button, Spinner, Toggle } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import { explorerParams } from "../stores/stores";
  import ResetFilters from "./ResetFilters.svelte";
  import Icon from "@iconify/svelte";
  import { receiveProcesses } from "../utils/watchmanApi";

  const dispatch = createEventDispatcher();
  let selected =""
  let enabled = false;
  let promise = receiveProcesses();
</script>

<div class="w-full mb-1 flex justify-center">
  <Button
    color="purple"
    on:click={() => {
      enabled = !enabled;
    }}
    >Filtres <Icon class="ml-1" icon={"mdi:filter"} />
  </Button>
</div>
{#if enabled}
  <div class="w-4/5 flex-wrap flex m-auto justify-center">
    <div class="w-1/3">
      filtres inclusifs
      <div class=" w-full flex justify-start items-center">
        <span class="text-center mr-2">Nom</span>
        <textarea class="" bind:value={$explorerParams.filters.name.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.filters.name.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Ref.</span>
        <textarea class="" bind:value={$explorerParams.filters.ref.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.filters.ref.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Marque</span>
        <textarea class="" bind:value={$explorerParams.filters.brand.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.filters.brand.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Url</span>
        <textarea class="" bind:value={$explorerParams.filters.url.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.filters.url.strict}
          type="checkbox"
        />
      </div>
    </div>
    <div class="w-1/3">
      filtres excusifs
      <div class=" w-full flex justify-start items-center">
        <span class="text-center mr-2">Nom</span>
        <textarea class="" bind:value={$explorerParams.excFilters.name.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.excFilters.name.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Ref.</span>
        <textarea class="" bind:value={$explorerParams.excFilters.ref.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.excFilters.ref.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Marque</span>
        <textarea
          class=""
          bind:value={$explorerParams.excFilters.brand.value}
        />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.excFilters.brand.strict}
          type="checkbox"
        />
      </div>
      <div class="py-1 w-full flex justify-start items-center">
        <span class="text-center mr-2">Url</span>
        <textarea class="" bind:value={$explorerParams.excFilters.url.value} />
        <span class="mx-2">Strict</span>
        <input
          class="z-10"
          bind:checked={$explorerParams.excFilters.url.strict}
          type="checkbox"
        />
      </div>
    </div>
    <div class="w-1/3">
      <div class=" w-full flex flex-col justify-end items-end">
        <div>
          <input
            bind:checked={$explorerParams.dateBarrier.use}
            id="useDateBarrier"
            type="checkbox"
          />
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
          <Toggle bind:checked={$explorerParams.dateBarrier.after}>
            {$explorerParams.dateBarrier.after ? "Apres" : "Avant"}
          </Toggle>
        {/if}
        {#await promise}
          <Spinner />
        {:then processes}
          <div class="my-2">
            <label for="process">Process</label>
            <select bind:value={selected} on:change={()=>$explorerParams.filters.from.value = selected} id="process">
              <option value="">TOUS</option>
              {#each processes as process}
                <option value={process._id}>{process.name}</option>
              {/each}
            </select>
          </div>
        {/await}
        <ResetFilters on:filter />
      </div>
    </div>
    <Button
      color="purple"
      on:click={() => {
        $explorerParams.page = 1;
        dispatch("filter");
      }}
    >
      Rechercher <Icon class="ml-1" icon={"mdi:magnify"} />
    </Button>
  </div>
{/if}
