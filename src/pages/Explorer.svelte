<script lang="ts">
  import { Spinner, Button } from "flowbite-svelte";
  import { navigate } from "svelte-routing";
  import { productsExplorer } from "../utils/watchmanApi";
  import moment from "moment";
  import Icon from "@iconify/svelte";
  import { explorerParams } from "../stores/stores";
  import Filters from "../lib/Filters.svelte";
  import Pagination from "../lib/Pagination.svelte";
  moment.locale("fr");

  async function getProducts(): Promise<[Product]> {
    console.log($explorerParams.page);
    if ($explorerParams.page < 1) {
      $explorerParams.page = 1;
      return promise;
    }
    try {
      const result: [Product] = await productsExplorer($explorerParams);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  let promise: Promise<[Product]> = getProducts();
</script>

<Filters
  on:filter={() => {
    promise = getProducts();
  }}
/>
{#await promise}
  <Spinner />
{:then products}
  {#if products.length < 1}
    <div class="m-6">Aucun produit</div>
  {:else}
    <Pagination
      on:next={() => {
        $explorerParams.page += 1;
        promise = getProducts();
      }}
      on:previous={() => {
        $explorerParams.page -= 1;
        promise = getProducts();
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
                $explorerParams.sortBy.createdAt === "1"
                  ? ($explorerParams.sortBy.createdAt = "-1")
                  : ($explorerParams.sortBy.createdAt = "1");
                promise = getProducts();
              }}
              class="flex text items-center"
              >Créé le <Icon
                class="pt-1"
                icon={$explorerParams.sortBy.createdAt === "-1"
                  ? "il:arrow-down"
                  : "il:arrow-up"}
              /></span
            ></th
          >
          <th class="py-2" />
        </thead>
        <tbody>
          {#each products as product}
            <tr class="table-row">
              <td class="cell-wrap p-2 text-gray-900"
                ><abbr class="custom-abbr" title={product.name}
                  >{product.name}</abbr
                ></td
              >
              <td class="cell-wrap p-2 text-gray-900"
                ><abbr class="custom-abbr" title={product.ref}
                  >{product.ref}</abbr
                >
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
        $explorerParams.page += 1;
        promise = getProducts();
      }}
      on:previous={() => {
        $explorerParams.page -= 1;
        promise = getProducts();
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
    position: absolute;
    background: #000;
    color: #fff;
    padding: 5px 10px;
    margin: -35px 0 0 0;
  }
</style>
