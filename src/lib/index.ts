import { derived, writable } from 'svelte/store';
import { allowedSites, formatSearchURL, type SearchArgs } from '$lib/format_urls';
import { LOCAL_STORAGE } from '$lib/storage';
import { z } from 'zod';

export const DOMAIN_REGEX = z.string().url();

export const search = writable<SearchArgs>(
	LOCAL_STORAGE.full_search.get() ?? {
		searchName: 'search-name',
		provider: 'google',
		allowedSites,
		searchWords: ['small team', 'ecommerce'],
		exactWords: ['product manager', 'remote'],
		likeWords: ['senior'],
		blockedWords: ['associate', 'junior', 'internship']
	}
);

search.subscribe((value) => {
	LOCAL_STORAGE.full_search.set(value);
});

export const additionalAllowedSites = writable<string[]>(
	LOCAL_STORAGE.additional_sites.get() ?? ['keyvalues.com']
);

additionalAllowedSites.subscribe((value) => {
	LOCAL_STORAGE.additional_sites.set(value);
});

export const searchURL = derived(
	[search, additionalAllowedSites],
	([$search, $additionalSites]) => {
		const allowedSites = [...$search.allowedSites, ...$additionalSites];
		return {
			bing: formatSearchURL({ ...$search, allowedSites, provider: 'bing' }),
			google: formatSearchURL({ ...$search, allowedSites })
		};
	}
);
