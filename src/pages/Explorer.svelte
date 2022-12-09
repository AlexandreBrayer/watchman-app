<script lang="ts">
  import { Spinner, Button } from "flowbite-svelte";
  import Pagination from "../lib/Pagination.svelte";
  import { navigate } from "svelte-routing";
  import { productsExplorer } from "../utils/watchmanApi";
  import moment from "moment";
  import Filters from "../lib/Filters.svelte";
  import Icon from "@iconify/svelte";
  moment.locale("fr");

  let page = 1;
  let limit = 20;
  let descending = true;
  let filtersBind: any;

  function generateFilters(filters: Filters): Object {
    const newFilters = Object.keys(filters).reduce((acc, key) => {
      if (filters[key].value !== "") {
        acc[key] = filters[key];
      }
      return acc;
    }, {});
    return newFilters;
  }

  async function filter(e: { detail: { filters: Filters; }; }): Promise<void> {
    page = 1;
    const filters = e.detail.filters;
    const newFilters = generateFilters(filters);
    const sortBy = {
      createdAt: descending ? "-1" : "1",
    };
    promise = productsExplorer(
      page,
      { filters: newFilters, sortBy: sortBy },
      limit
    );
  }

  async function getProducts(
    goTo: number,
    filters: Object = {
      filters: generateFilters(filtersBind?.filters || {}),
      sortBy: { createdAt: descending ? "-1" : "1" },
    }
  ): Promise<[Product]> {
    if (goTo < 1) {
      return;
    }
    page = goTo;
    try {
      const result: [Product] = await productsExplorer(page, filters, limit);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  let promise: Promise<[Product]> = getProducts(1);
</script>

<Filters bind:filters={filtersBind} on:filter={filter} />
{#await promise}
  <Spinner />
{:then products}
  {#if products.length < 1}
    <div class="m-6">Aucun produit</div>
  {:else}
    <Pagination
      on:next={() => {
        promise = getProducts(page + 1);
      }}
      on:previous={() => {
        promise = getProducts(page - 1);
      }}
    />
    <div class="table-container px-2">
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
          <th class="py-2"
            ><span
              on:keydown
              on:click={() => {
                descending = !descending;
                promise = getProducts(page);
              }}
              class="flex text items-center"
              >Créé le <Icon
                class="pt-1"
                icon={descending ? "il:arrow-down" : "il:arrow-up"}
              /></span
            ></th
          >
          <th class="py-2" />
        </thead>
        <tbody>
          {#each products as product}
            <tr class="table-row">
              <td class="cell-wrap p-2 text-gray-900"><abbr class="custom-abbr" title= {product.name}>{product.name}</abbr></td>
              <td class="cell-wrap p-2 text-gray-900"><abbr class="custom-abbr" title= {product.ref}>{product.ref}</abbr> 
              </td>
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
              <td class="cell-wrap p-2 text-gray-900">{product.brand} </td>
              <td class="cell-wrap p-2 text-gray-900">
                <ul>
                  {#if product.meta}
                    {#each Object.entries(product.meta) as [key, value]}
                      <li
                        class="li-wrap whitespace-nowrap font-medium p-4 text-gray-900"
                      >
                        <span>{key}: {value}</span>
                      </li>
                    {/each}
                  {/if}
                </ul>
              </td>
              <td class="cell-wrap p-2 text-gray-900">
                {moment(product.createdAt).format("DD/MM/YYYY")}
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
  }
  .li-wrap {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .explorer-table {
    width: 100%;
    text-align: left;
  }
  .img-centered {
    width: 100px;
  }
  .table-row:nth-child(even) {
    background-color: #f2f2f2;
  }
  .custom-abbr {
    text-decoration: none;
    cursor: help;
  }
  .custom-abbr:hover:before {
   content: attr(title);
   position:absolute;
    background:#000;
    color:#fff;
    padding:5px 10px;
    margin:-35px 0 0 0;
}

</style>
