<script lang="ts">
	import Check from 'svelte-lucide/Check.svelte';
	import { allowedSites } from '$lib/format_urls.js';
	import { search } from '$lib';

	function toggleAllowedSites(site: string) {
		const hasSite = $search.allowedSites.includes(site);

		if (hasSite) {
			$search.allowedSites = $search.allowedSites.filter((f) => f !== site);
		} else {
			$search.allowedSites = [...$search.allowedSites, site];
		}
	}
</script>

<ul class="flex flex-wrap gap-2">
	{#each allowedSites as f}
		{@const isAllowed = $search.allowedSites.includes(f)}
		<li>
			<button
				class="chip {isAllowed ? 'variant-glass-tertiary' : 'variant-filled'}"
				on:click={() => {
					toggleAllowedSites(f);
				}}
				on:keypress
			>
				{#if isAllowed}
					<div class="">
						<Check size="15" />
					</div>
				{/if}
				<span>{f}</span>
			</button>
		</li>
	{/each}
</ul>
