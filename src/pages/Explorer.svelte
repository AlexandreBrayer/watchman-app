<script lang="ts">
  import {
    Spinner,
    Button,
    Textarea,
  } from "flowbite-svelte";
  import Pagination from "../lib/Pagination.svelte";
  import { navigate } from "svelte-routing";
  import { productsExplorer } from "../utils/watchmanApi";
    import moment from 'moment';
    moment.locale('fr');

  let page = 1;
  let limit = 20;
  let filters = "{}";
  let textareaprops = {
    placeholder: "Filtres",
  };

  async function getProducts(goTo: number) {
    let myFilters = {};
    try {
      myFilters = JSON.parse(filters);
    } catch (e) {
      console.log(e);
    }
    page = goTo;
    try {
      const reslut = await productsExplorer(page, myFilters, limit);
      return reslut;
    } catch (e) {
      console.log(e);
    }
  }
  let promise = getProducts(1);
</script>

{#await promise}
  <Spinner />
{:then products}
  {#if products.length < 1}
    <div class="m-6">Aucun produit</div>
  {:else}
    <Textarea bind:value={filters} {...textareaprops} class="max-w-xl" />
    <Button
      on:click={() => {
        promise = getProducts(1);
      }}
      color="green"
      pill={true}>Filtrer</Button
    >
    <Pagination
      on:next={() => {
        promise = getProducts(page + 1);
      }}
      on:previous={() => {
        promise = getProducts(page - 1);
      }}
    />
    <div class="table-container">
      <table class="explorer-table">
        <thead>
          <th class="py-2">Nom</th>
          <th class="py-2">Ref.</th>
          <th class="py-2">Images</th>
          <th class="py-2">Prix</th>
          <th class="py-2">Prix barrés</th>
          <th class="py-2">url</th>
          <th class="py-2">Marque</th>
          <th class="py-2">Meta-données</th>
          <th class="py-2">Créé à</th>
          <th class="py-2" />
        </thead>
        <tbody>
          {#each products as product}
            <tr class="table-row">
              <td class="cell-wrap p-2 text-gray-900">{product.name}</td>
              <td class="cell-wrap p-2 text-gray-900">{product.ref}</td>
              <td class="cell-wrap p-2 text-gray-900">
                <img src={product.images[0]} class="img-centered" alt="N/A" />
              </td>
              <td class="cell-wrap p-2 text-gray-900">
                {product.price}
                {product.currency}
              </td>
              <td class="cell-wrap p-2 text-gray-900"
                >{product.reducedPrice} {product.currency}
              </td>
              <td class="cell-wrap p-2 text-gray-900">
                <a rel="noreferrer" href={product.url} target="_blank">Link</a>
              </td>
              <td class="cell-wrap p-2 text-gray-900"
                >{product.brand}
              </td>
              <td class="cell-wrap p-2 text-gray-900">
                <ul>
                  {#each Object.entries(product.meta) as [key, value]}
                    <li
                      class="li-wrap whitespace-nowrap font-medium p-4 text-gray-900"
                    >
                      <span>{key}: {value}</span>
                    </li>
                  {/each}
                </ul>
              </td>
              <td class="cell-wrap p-2 text-gray-900">
                {moment(product.createdAt).format(('DD/MM/YYYY'))}
              </td>
              <td>
                <Button
                  color="green"
                  on:click={() => {
                    navigate(`/explorer/${product._id}`);
                  }}
                  pill={true}>View</Button
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <Pagination
      on:next={() => {
        promise = getProducts(page + 1);
      }}
      on:previous={() => {
        promise = getProducts(page - 1);
      }}
    />
  {/if}
{/await}

<style>
  .table-container {
    overflow: auto;
    max-width: 100vw;
  }
  .cell-wrap {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 10vw;
    text-align: center;
  }
  .li-wrap {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .explorer-table {
    width: 100%;
  }
  .img-centered {
    width: 100px;
    margin: auto;
  }
  .table-row:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
