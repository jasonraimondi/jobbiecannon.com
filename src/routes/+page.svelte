<script lang="ts">
	import { CodeBlock, InputChip } from '@skeletonlabs/skeleton';
	import { search, searchURL } from '$lib';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import AllowedSites from './AllowedSites.svelte';
	import SetSearch from './SetSearch.svelte';
	import { clipboard } from '@skeletonlabs/skeleton';
	import ClipboardCopy from 'svelte-lucide/ClipboardCopy.svelte';
	import SetJobBoards from './SetJobBoards.svelte';

	const toastStore = getToastStore();

	let sitesSearch: string[] = ['keyvalues.com'];

	function isValidDomain(domain: string): boolean {
		const domainRegex =
			/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(?:\/[a-zA-Z0-9_\-\.~]+)*$/;
		const isValid = domainRegex.test(domain);
		if (isValid) {
			sitesSearch = [...sitesSearch, domain];
		} else {
			toastStore.trigger({
				message: `Must be a valid domain, do not include https://`,
				background: 'variant-filled-error'
			});
		}
		return isValid;
	}

	$: searchJSON = JSON.stringify($search, null, 2);
	$: searchURLJSON = JSON.stringify($searchURL, null, 2);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 w-full px-2">
		<h1 class="h1 pt-8"><span class="gradient-heading">Jobbie Cannon</span></h1>

		<div class="card p-4 flex gap-2">
			<div class="flex-1">
				<code class="" data-clipboard="searchQueryClipboard"
					>{$searchURL.google.searchParams.get('q')}</code
				>
			</div>
			<div>
				<button
					class="btn-icon variant-filled"
					use:clipboard={{ element: 'searchQueryClipboard' }}
					on:copyComplete={() => {
						toastStore.trigger({
							message: 'Copied to clipboard',
							background: 'variant-filled-success'
						});
					}}
				>
					<ClipboardCopy />
				</button>
			</div>
		</div>

		<ul class="flex gap-2">
			<li>
				<a
					href={$searchURL.google.href}
					target="_blank"
					rel="noopener nofollower"
					class="btn bg-gradient-to-br variant-gradient-primary-secondary text-white"
					>Search Google</a
				>
			</li>
			<li>
				<a
					href={$searchURL.bing.href}
					target="_blank"
					rel="noopener nofollower"
					class="btn bg-gradient-to-br variant-gradient-primary-secondary text-white text-white"
					>Search Bing</a
				>
			</li>
		</ul>

		<SetSearch />
		<SetJobBoards />

		<div class="card p-4">
			<h3 class="pb-2">Search Words</h3>
			<InputChip
				class="w-full"
				name="search-words"
				bind:value={$search.searchWords}
				placeholder="Enter keywords, e.g., small team, ecommerce, edtech"
			/>
		</div>

		<div class="card p-4">
			<h3 class="pb-2">Exact Words</h3>
			<InputChip
				class="w-full"
				name="exact-words"
				bind:value={$search.exactWords}
				placeholder="Must-have words, e.g., remote, Python, React, AWS"
			/>
		</div>

		<div class="card p-4">
			<h3 class="pb-2">Like Words</h3>
			<InputChip
				class="w-full"
				name="like-words"
				bind:value={$search.likeWords}
				placeholder="Similar words, e.g., senior, manager"
			/>
		</div>

		<div class="card p-4">
			<h3 class="pb-2">Blocked Words</h3>
			<InputChip
				class="w-full"
				name="blocked-words"
				bind:value={$search.blockedWords}
				placeholder="Exclude words, e.g., junior, intern, part-time"
			/>
		</div>

		<CodeBlock language="json" code={searchURLJSON}></CodeBlock>
		<CodeBlock language="json" code={searchJSON}></CodeBlock>
	</div>
</div>

<style>
	.gradient-heading {
		@apply bg-clip-text text-transparent box-decoration-clone;
		/* Direction */
		@apply bg-gradient-to-br;
		/* Color Stops */
		@apply from-primary-500 via-tertiary-500 to-secondary-500;
	}
</style>
