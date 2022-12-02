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
  import { executeFlux } from "../utils/watchmanApi";

  async function getFluxes() {
    try {
      const result = await fetch("http://localhost:3000/flux");
      const data = await result.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  let promise = getFluxes();
</script>

{#await promise}
  <Spinner />
{:then fluxes}
  <Table>
    <TableHead>
      <TableHeadCell>Id</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Actions</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each fluxes as flux}
        <TableBodyRow>
          <TableBodyCell>{flux._id}</TableBodyCell>
          <TableBodyCell>{flux.name}</TableBodyCell>
          <TableBodyCell>
            <Button on:click={async () => {
              await executeFlux({ id: flux._id });
            }}
            >Lancer</Button>
            <Button>Activer</Button
            >
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
{/await}
