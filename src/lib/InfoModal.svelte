<script lang="ts">
  import { Modal, Button } from "flowbite-svelte";
  import { receiveLastReportByFluxId } from "../utils/watchmanApi";
  export let fluxId: string = "";
  let open = false;
  let report: Promise<Array<any>> = receiveLastReportByFluxId(fluxId);
</script>

<Button
  color="yellow"
  on:click={async () => {
    open = true;
    report = await receiveLastReportByFluxId(fluxId);
  }}>Infos</Button
>

<Modal
  bind:open
  title="Informations sur le flux"
  on:close={() => (open = false)}
>
  <p>Id : {fluxId}</p>
  {#await report}
    <p>Chargement...</p>
  {:then report}
    <p>Nombre de process(es) : {report.length}</p>
    <p>
      Nombre de produits trouvés au dernier lancement : {report
        .map((r) => r.productsFound)
        .reduce((a, b) => a + b, 0)}
    </p>
    <p>
      Temps de traitement du dernier lancement :
      {report.map((r) => r.executionTime).reduce((a, b) => (a > b ? a : b), 0) /
        60000}
      minute(s)
    </p>
  {/await}
</Modal>
