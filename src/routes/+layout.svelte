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

<div class="md:hidden flex flex-row-reverse pr-4 pb-4 pt-2">
	<a
		class="btn-icon bg-gradient-to-br variant-gradient-primary-tertiary"
		href="https://github.com/jasonraimondi/jobbiecannon.com"
		target="_blank"
	>
		<GitHub />
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
