<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { initializeStores, storeHighlightJs, Toast } from '@skeletonlabs/skeleton';
	import json from 'highlight.js/lib/languages/json';

	hljs.registerLanguage('json', json);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import GitHub from 'svelte-lucide/Github.svelte';
	import UserCircle from 'svelte-lucide/UserCircle.svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();
</script>

<Toast />
<slot />

<div class="floater hidden md:block">
	<a
		class="btn-icon bg-gradient-to-br variant-gradient-primary-tertiary"
		href="https://github.com/jasonraimondi/jobbiecannon.com"
		target="_blank"
	>
		<GitHub />
	</a>
</div>

<div class="flex flex-row-reverse pr-4 pb-4 pt-2 gap-2">
	<a
		class="md:hidden btn-icon bg-gradient-to-br variant-gradient-primary-tertiary"
		href="https://github.com/jasonraimondi/jobbiecannon.com"
		target="_blank"
	>
		<GitHub />
	</a>
	<a
		class=" btn-icon bg-gradient-to-br variant-gradient-primary-tertiary"
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
