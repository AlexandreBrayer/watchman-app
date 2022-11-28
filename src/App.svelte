<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import { Navbar, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
  import Explorer from "./pages/Explorer.svelte";
  import ExplorerId from "./pages/ExplorerId.svelte";
  export let url = "";
</script>

<Router {url}>
  <Navbar let:hidden let:toggle>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi active={true}>
        <Link to="/explorer">Explorer</Link>
      </NavLi>
    </NavUl>
  </Navbar>

  <Route path="/explorer">
    <Explorer />
  </Route>
  <Route let:params path="/explorer/:id">
    <ExplorerId {params} />
  </Route>
</Router>
