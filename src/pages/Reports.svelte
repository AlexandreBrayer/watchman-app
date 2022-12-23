<script lang="ts">
  import { receiveReports } from "../utils/watchmanApi";
  import { Spinner } from "flowbite-svelte";
  let page = 1;
  let limit = 20;
  let promise = receiveReports(page, limit);
  import moment from "moment";
  moment.locale("fr");
</script>

{#await promise}
  <Spinner />
{:then reports}
  <table>
    <th> Date </th>
    <th> Produits trouvés </th>
    <th> Temps d'execution </th>
    <th> Process </th>
    {#each reports.reports as report}
    <tr class={report.error == undefined ? "row" : "row error"}>
      <td>{moment(report.createdAt).format("DD/MM/YYYY HH:mm")}</td>
      <td>{report.productsFound}</td>
      <td>{(report.executionTime/60000).toFixed(2)} minute(s)</td>
      <td>{report.process}</td>
    </tr>
  {/each}
  </table>
  
{/await}

<style>
  table {
    width: 100%;
    text-align: center;
  }
  th {
    text-align: center;
  }
  td {
    padding: 10px;
  }
  .row {
    border: 1px solid #ccc;
    background-color: #e6ffe6;
    padding: 10px;
    margin: 10px 0;
  }
  .error {
    background-color: #ffcccc;
  }
</style>