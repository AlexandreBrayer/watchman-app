<script lang="ts">
  type User = {
    _id: number;
    username: string;
    email: string;
  };
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";
  import { navigate } from "svelte-routing";
  import { login } from "../utils/watchmanApi";
  import jwt_decode from "jwt-decode";
  import { user } from "../stores/stores";
  let username = "";
  let password = "";
  async function log() {
    try {
      const data = await login(username, password);
      const decoded: {
        user: User;
        iat: number;
        exp: number;
      } = jwt_decode(data.token);
      $user = {
        username: decoded.user.username,
        email: decoded.user.email,
        token: data.token,
      };
      localStorage.setItem("user", JSON.stringify($user));
      toast.push("Logged in!", {
        theme: {
          "--toastColor": "mintcream",
          "--toastBackground": "rgba(72,187,120,0.9)",
          "--toastBarBackground": "#2F855A",
        },
        duration: 3000,
        onpop: () => {
          navigate("/explorer");
        },
      });
    } catch (e) {
      toast.push("Error!", {
        theme: {
          "--toastColor": "mintcream",
          "--toastBackground": "rgba(255, 99, 71, 0.9)",
          "--toastBarBackground": "#e53e3e",
        },
        duration: 3000,
      });
    }
  }
</script>

<div class="flex flex-col items-center justify-center px-6 mx-auto">
  <div
    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
      >
        Login to your account
      </h1>
      <form class="space-y-4 md:space-y-6" action="#">
        <div>
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Username</label
          >
          <input
            type="username"
            name="username"
            id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="username"
            required
            bind:value={username}
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            type="password"
            name="password"
            autocomplete="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            bind:value={password}
          />
        </div>
        <button
          type="submit"
          class="w-full border border-gray-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          on:click|preventDefault={async () => {
            log();
          }}
        >
          Login
        </button>
      </form>
    </div>
  </div>
</div>

<SvelteToast />
