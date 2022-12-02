<script lang="ts">
  import { Spinner } from "flowbite-svelte";

  export let params;
  const id = params.id;

  async function getProduct(id: string) {
    try {
      const result = await fetch(`http://localhost:3000/product/${id}`);
      const data = await result.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  let promise = getProduct(id);
</script>

{#await promise}
  <Spinner />
{:then product}
  <div class="product-container m-6">
    <h1>{product.name}</h1>
    <div class="product-info">
      <span>REF: {product.ref}</span>
      <span>brand : {product.brand}</span>
      <span class="mt-4">RRP: {product.price}{product.currency}</span>
      <span>Prix réduit: {product.reducedPrice}{product.currency}</span>
      <span class="mt-4"
        >From process : {product.from.name}, url : {product.from.baseUrl} ({product
          .from._id})</span
      >
    </div>
    <div class="product-img-container">
      {#each product.images as image}
        <img class="product-img" src={image} alt={product.name} />
      {/each}
    </div>
    <div class="mt-4">{@html product.desc}</div>
    {#if product.meta}
      <ul class="ml-4 list-disc">
        {#each Object.entries(product.meta) as [key, value]}
          <li>{key}: {value}</li>
        {/each}
      </ul>
    {/if}
  </div>
{/await}

<style>
  .product-container {
    height: 100vh;
  }
  .product-img {
    max-width: 200px;
  }

  .product-info {
    display: flex;
    flex-direction: column;
  }

  .product-img-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
