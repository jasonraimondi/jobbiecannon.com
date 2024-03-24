<script lang="ts">
	import { search } from '$lib';
	import { allowedSites } from '$lib/format_urls';

	function setSearch(jobTitle: string) {
		switch (jobTitle) {
			case 'product-manager':
				search.set({
					searchName: jobTitle,
					allowedSites: allowedSites,
					provider: 'google',
					searchWords: [],
					exactWords: ['product-manager'],
					likeWords: [],
					blockedWords: ['junior', 'intern', 'part-time']
				});
				break;
			case 'software-engineer':
				search.set({
					searchName: jobTitle,
					allowedSites: allowedSites,
					provider: 'google',
					searchWords: ['shopify', 'fullstack'],
					exactWords: ['remote', 'software engineer', 'typescript'],
					likeWords: ['senior'],
					blockedWords: ['junior', 'intern', 'part-time']
				});
				break;
			case 'ui-ux-designer':
				search.set({
					searchName: jobTitle,
					allowedSites: allowedSites,
					provider: 'google',
					searchWords: ['figma', 'fullstack'],
					exactWords: ['remote', 'designer'],
					likeWords: [],
					blockedWords: ['junior', 'intern', 'part-time']
				});
				break;
			default:
				break;
		}
	}
</script>

<button class="btn variant-filled p-2 py-1.5 text-xs" on:click={() => setSearch('product-manager')}>
	Product Manager
</button>

<button class="btn variant-filled p-2 py-1.5 text-xs" on:click={() => setSearch('ui-ux-designer')}>
	UI/UX Designer
</button>

<button
	class="btn variant-filled p-2 py-1.5 text-xs"
	on:click={() => setSearch('software-engineer')}
>
	Software Engineer
</button>
