<script lang="ts">
  import { user } from "../stores/stores";
</script>

<button class="light-red"
  on:click={() => {
    localStorage.removeItem("user");
    $user = { username: "", email: "", token: "" };
  }}
>
  Logout
</button>

<style>

  .light-red {
    background-color: #e94e4e;
    color: #ffffff;
  }

</style>
