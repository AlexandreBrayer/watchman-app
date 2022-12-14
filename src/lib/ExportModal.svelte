<script lang="ts">
  import { Modal, Button } from "flowbite-svelte";
  import { generateCsv, countProducts } from "../utils/watchmanApi";
  import { explorerParams } from "../stores/stores";
  let open = false;
  let fields = [
    "name",
    "ref",
    "desc",
    "images",
    "price",
    "reducedPrice",
    "currency",
    "url",
    "brand",
    "meta",
    "createdAt",
  ];
  let selectedFields: String[] = ["name"];
  let count : Promise<any> = countProducts($explorerParams.filters);
  async function downloadCsv() {
    const data = await generateCsv(selectedFields, $explorerParams.filters);
    const encodedData = encodeURIComponent(data);
    const link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedData);
    link.setAttribute("download", "data.csv");
    link.click();
    link.remove();
  }
</script>

<div class="w-full my-1 flex justify-center">
  <Button on:click={() => {
    open = true
    count = countProducts($explorerParams);
    }}>Exporter</Button>
  <Modal title={"Exporter"} bind:open>
    {#await count}
      <p>Chargement...</p>
    {:then count}
      <p>Nombre de produits : {count.count}</p>
    {/await }
    <p>Champs :</p>
    {#each fields as field}
      <Button
        class="mx-1"
        on:click={() => {
          if (selectedFields.includes(field)) {
            selectedFields = selectedFields.filter((f) => f !== field);
          } else {
            selectedFields = [...selectedFields, field];
          }
        }}
        color={selectedFields.includes(field) ? "green" : "red"}>{field}</Button
      >
    {/each}
    <svelte:fragment slot="footer">
      <Button on:click={downloadCsv}>Générer le csv</Button>
      <Button on:click={() => (open = false)} color="alternative"
        >Abandonner
      </Button>
    </svelte:fragment>
  </Modal>
</div>
