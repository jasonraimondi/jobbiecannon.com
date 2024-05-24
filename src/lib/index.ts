import { derived, writable } from 'svelte/store';
import { allowedSites, formatSearchURL, type SearchArgs } from '$lib/format_urls';
import { LOCAL_STORAGE } from '$lib/storage';
import { z } from 'zod';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export const DOMAIN_REGEX = z.string().url();

function setDefaults() {
	const params = new URLSearchParams(browser ? window.location.search : '');
	let unknownProvider = params.get('provider');

	let provider: 'google' | 'bing' = 'google';
	if (unknownProvider && ['google', 'bing'].includes(unknownProvider)) {
		provider = unknownProvider as 'google' | 'bing';
	}

	return {
		searchName: params.get('searchName') ?? 'search-name',
		provider,
		allowedSites: params.get('allowedSites')?.split(',') ?? allowedSites,
		searchWords: params.get('searchWords')?.split(',') ?? ['small team', 'ecommerce'],
		exactWords: params.get('exactWords')?.split(',') ?? ['product manager', 'remote'],
		likeWords: params.get('likeWords')?.split(',') ?? ['senior'],
		blockedWords: params.get('blockedWords')?.split(',') ?? ['associate', 'junior', 'internship']
	};
}

export const search = writable<SearchArgs>(LOCAL_STORAGE.full_search.get() ?? setDefaults());

search.subscribe((value) => {
	LOCAL_STORAGE.full_search.set(value);
	const params = new URLSearchParams(browser ? window.location.search : '');
	if (Array.isArray(value.allowedSites) && value.allowedSites.length) {
		params.set('allowedSites', value.allowedSites.join(','));
	} else {
		params.delete('allowedSites');
	}
	if (Array.isArray(value.searchWords) && value.searchWords.length) {
		params.set('searchWords', value.searchWords.join(','));
	} else {
		params.delete('searchWords');
	}

	if (Array.isArray(value.exactWords) && value.exactWords.length) {
		params.set('exactWords', value.exactWords.join(','));
	} else {
		params.delete('exactWords');
	}

	if (Array.isArray(value.likeWords) && value.likeWords.length) {
		params.set('likeWords', value.likeWords.join(','));
	} else {
		params.delete('likeWords');
	}

	if (Array.isArray(value.blockedWords) && value.blockedWords.length) {
		params.set('blockedWords', value.blockedWords.join(','));
	} else {
		params.delete('blockedWords');
	}

	if (browser) goto(`?${params.toString()}`).then();
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
