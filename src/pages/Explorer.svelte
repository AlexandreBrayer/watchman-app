<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Spinner,
    Button,
  } from "flowbite-svelte";
  import Pagination from "../lib/Pagination.svelte";
  import MetaTableCell from "../lib/MetaTableCell.svelte";
  import { navigate } from "svelte-routing";

  let page = 1;

  async function getProducts(goTo: number) {
    page = goTo;
    const result = await fetch("http://localhost:3000/product/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: page,
        limit: 20,
        filters: {},
      }),
    });
    const data = await result.json();
    return data;
  }
  let promise = getProducts(1);
</script>

{#await promise}
  <Spinner />
{:then products}
  <Pagination
    on:next={() => {
      promise = getProducts(page + 1);
    }}
    on:previous={() => {
      promise = getProducts(page - 1);
    }}
  />
  <div class="table-container">
    <Table striped={true}>
      <TableHead>
        {#each Object.entries(products[0]) as [key, _]}
          <TableHeadCell>{key}</TableHeadCell>
        {/each}
      </TableHead>
      <TableBody>
        {#each products as product}
          <TableBodyRow>
            {#each Object.entries(product) as [key, value]}
              {#if key === "images"}
                <TableBodyCell>
                  <img src={value[0]} style="width: 100px;" alt="N/A" />
                </TableBodyCell>
              {:else if key === "url" && typeof value === "string"}
                <TableBodyCell>
                  <a rel="noreferrer" href={value} target="_blank">Link</a>
                </TableBodyCell>
              {:else if key === "meta" && typeof value === "object"}
                <MetaTableCell meta={value} />
              {:else}
                <TableBodyCell>{@html value}</TableBodyCell>
              {/if}
            {/each}
            <TableBodyCell>
              <Button
                color="green"
                on:click={() => {
                  navigate(`/explorer/${product._id}`);
                }}
                pill={true}>View</Button
              >
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>
  <Pagination
    on:next={() => {
      promise = getProducts(page + 1);
    }}
    on:previous={() => {
      promise = getProducts(page - 1);
    }}
  />
{/await}

