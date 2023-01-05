<script lang="ts">
  import { user } from "../stores/stores";
  import Svavatar from "./Svavatar.svelte";
  import { Spinner } from "flowbite-svelte";
  function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, "0"))
        .join("");
      return hashHex;
    });
  }
  let promise = hash($user.username);
</script>

<div class="flex">
  <div class="mr-4">
    Welcome back {$user.username} !
  </div>
  {#await promise}
    <Spinner />
  {:then hash}
    <Svavatar type={"jdenticon"} width={48} height={48} seed={hash} />
  {/await}
</div>
