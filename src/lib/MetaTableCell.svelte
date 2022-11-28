<script lang="ts">
  export let meta: Object;
</script>

<div>
  <ul>
    {#each Object.entries(meta) as [key, value]}
      <li class="whitespace-nowrap font-medium py-4 px-6 text-gray-900">
        <span>{key}: {value}</span>
      </li>
    {/each}
  </ul>
</div>