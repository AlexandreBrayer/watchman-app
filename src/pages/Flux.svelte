<script lang="ts">
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";
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
  import { executeFlux, receiveFluxes } from "../utils/watchmanApi";
  import InfoModal from "../lib/InfoModal.svelte";
  async function getFluxes() {
    try {
      const result = await receiveFluxes();
      return result;
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
            <Button
              on:click={async () => {
                try {
                  const response = await executeFlux({ id: flux._id });
                  if (response?.message === "Flux Spawned") {
                    toast.push("Flux executed", {
                      theme: {
                        "--toastColor": "mintcream",
                        "--toastBackground": "rgba(72,187,120,0.9)",
                        "--toastBarBackground": "#2F855A",
                      },
                    });
                  } else {
                    toast.push("Error!", {
                      theme: {
                        "--toastColor": "mintcream",
                        "--toastBackground": "rgba(255, 99, 71, 0.9)",
                        "--toastBarBackground": "#e53e3e",
                      },
                    });
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              Lancer
            </Button>
            <Button disabled>Activer</Button>
            <InfoModal fluxId={flux._id} />
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
{/await}
<SvelteToast />