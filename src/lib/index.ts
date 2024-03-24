import { derived, writable } from 'svelte/store';
import { allowedSites, formatSearchURL, type SearchArgs } from '$lib/format_urls';

export const search = writable<SearchArgs>({
	searchName: 'search-name',
	provider: 'google',
	allowedSites,
	searchWords: ['small team', 'ecommerce'],
	exactWords: ['product manager', 'remote'],
	likeWords: ['senior'],
	blockedWords: ['associate', 'junior', 'internship']
});

export const searchURL = derived(search, ($search) => {
	return {
		bing: formatSearchURL({ ...$search, provider: 'bing' }),
		google: formatSearchURL($search)
	};
});
