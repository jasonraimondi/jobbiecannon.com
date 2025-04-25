<script lang="ts">
	import { search, searchURL } from '$lib';
	import PresetSearches from './PresetSearches.svelte';
	import ClipboardCopy from 'svelte-lucide/ClipboardCopy.svelte';
	import SetAllowedSites from './SetAllowedSites.svelte';
	import toast from 'svelte-french-toast';
	import InputChip from '$lib/ui/input/InputChip.svelte';

	let searchJSON = $derived(JSON.stringify($search, null, 2));
	let searchURLJSON = $derived(JSON.stringify($searchURL, null, 2));

	function copyToClipboard(text: string) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				toast.success('Copied to clipboard');
			})
			.catch(() => {
				toast.error('Failed to copy');
			});
	}
</script>

<div class="container mx-auto flex h-full items-center justify-center">
	<div class="w-full space-y-5 px-2 md:pl-12 lg:pl-0">
		<h1 class="h1 pt-8 md:pt-16">
			<span class="box-decoration-clone bg-clip-text text-transparent">Jobbie Cannon</span>
		</h1>

		<div class="card flex gap-2 p-4">
			<div class="flex-1">
				<div>
					<h4 class="pb-2">Search Query:</h4>
					<code class="" data-clipboard="searchQueryClipboard">
						{$searchURL.google.searchParams.get("q")}
					</code>
				</div>
			</div>
			<div>
				<button
					class="btn-icon variant-filled"
					onclick={() => copyToClipboard($searchURL.google.searchParams.get("q") ?? "")}
				>
					<ClipboardCopy />
				</button>
			</div>
		</div>

		<div class="flex flex-col gap-2 md:flex-row">
			<div>
				<div class="btn-group variant-gradient-primary-secondary bg-gradient-to-br text-white">
					<a href={$searchURL.google.href} target="_blank" rel="noopener nofollower"
					>Search Google</a
					>
					<a href={$searchURL.bing.href} target="_blank" rel="noopener nofollower">Search Bing</a>
				</div>
			</div>
			<PresetSearches />
		</div>

		<SetAllowedSites />

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
	</div>
</div>
