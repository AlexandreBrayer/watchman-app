<script lang="ts">
  import { Pagination } from "flowbite-svelte";
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const previous = () => {
    dispatch('previous');
  };
  const next = () => {
    dispatch('next');
  };
</script>

<div class="flex flex-col items-center justify-center">
  <Pagination table>
    <div
      on:click={previous}
      on:keydown={() => {}}
      slot="prev"
      class="flex items-center gap-2"
    >
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
          clip-rule="evenodd"
        /></svg
      >
      Prev
    </div>
    <div
      on:click={next}
      on:keydown={() => {}}
      slot="next"
      class="flex items-center gap-2"
    >
      Next
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        /></svg
      >
    </div>
  </Pagination>
</div>
