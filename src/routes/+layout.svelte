<script lang="ts">
  import "../app.css";

  // Highlight JS
  import hljs from "highlight.js/lib/core";
  import "highlight.js/styles/github-dark.css";
  import json from "highlight.js/lib/languages/json";

  hljs.registerLanguage("json", json);
	import { Toaster } from 'svelte-french-toast';

  // Floating UI for Popups
  import GitHub from "svelte-lucide/Github.svelte";
  import UserCircle from "svelte-lucide/UserRound.svelte";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<Toaster />

{@render children?.()}

<div class="floater hidden md:block">
  <a
    class="btn-icon variant-gradient-primary-tertiary bg-gradient-to-br"
    href="https://github.com/jasonraimondi/jobbiecannon.com"
    target="_blank"
  >
    <GitHub />
  </a>
</div>

<div class="flex flex-row-reverse gap-2 pt-2 pr-4 pb-4">
  <a
    class="btn-icon variant-gradient-primary-tertiary bg-gradient-to-br md:hidden"
    href="https://github.com/jasonraimondi/jobbiecannon.com"
    target="_blank"
  >
    <GitHub />
  </a>
  <a
    class=" btn-icon variant-gradient-primary-tertiary bg-gradient-to-br"
    href="https://jasonraimondi.com"
    target="_blank"
  >
    <UserCircle />
  </a>
</div>

<style>
  .floater {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1000;
  }
</style>
