<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import { Navbar, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
  import Explorer from "./pages/Explorer.svelte";
  import ExplorerId from "./pages/ExplorerId.svelte";
  import Flux from "./pages/Flux.svelte";
  import Reports from "./pages/Reports.svelte";
  import Home from "./pages/Home.svelte";
  import Register from "./pages/Register.svelte";
  import Login from "./pages/Login.svelte";
  export let url = "";
  import { user } from "./stores/stores";
  import { onMount } from "svelte";
  import jwt_decode from "jwt-decode";
  import ProfileCard from "./lib/ProfileCard.svelte";
  type User = {
    _id: number;
    username: string;
    email: string;
  };
  onMount(() => {
    const myself = localStorage.getItem("user");
    if (myself) {
      const decoded: {
        user: User;
        iat: number;
        exp: number;
      } = jwt_decode(JSON.parse(myself).token);
      if (decoded.exp < Date.now() / 1000 - 60) {
        console.log("token expired");
        localStorage.removeItem("user");
      } else {
        $user = {
          username: decoded.user.username,
          email: decoded.user.email,
          token: JSON.parse(myself).token,
        };
      }
    }
  });
</script>

<Router {url}>
  <Navbar let:hidden let:toggle>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi active={true}>
        <Link to="/">Home</Link>
      </NavLi>
      <NavLi active={true}>
        <Link to="/explorer">Explorer</Link>
      </NavLi>
      <NavLi active={true}>
        <Link to="/flux">Fluxes</Link>
      </NavLi>
      <NavLi active={true}>
        <Link to="/reports">Reports</Link>
      </NavLi>
      {#if $user.token == ""}
        <NavLi active={true}>
          <Link to="/register">Register</Link>
        </NavLi>
        <NavLi active={true}>
          <Link to="/login">Login</Link>
        </NavLi>
      {/if}
    </NavUl>
    {#if $user.token != ""}
      <ProfileCard />
    {/if}
  </Navbar>

  <Route path="/">
    <Home />
  </Route>
  <Route path="/explorer">
    <Explorer />
  </Route>
  <Route let:params path="/explorer/:id">
    <ExplorerId {params} />
  </Route>
  <Route path="/flux">
    <Flux />
  </Route>
  <Route path="/reports">
    <Reports />
  </Route>
  <Route path="/register">
    <Register />
  </Route>
  <Route path="/login">
    <Login />
  </Route>
</Router>
