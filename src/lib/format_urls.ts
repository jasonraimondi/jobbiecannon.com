function formatAllowedSites(domains: string[]): string {
	const allowed = domains.reduce<string>((prev: string, next: string) => {
		next = `site:${next}`;
		if (prev === '') return next;
		return `${next} OR ${prev}`;
	}, '');
	return `(${allowed})`;
}

function formatExactSearchWords(words: string[]) {
	return words.map((word) => `"${word}"`).join(' ');
}

function formatLikeSearchWords(words: string[]) {
	return words.map((word) => `~${word}`).join(' ');
}

function formatBlockedWords(words: string[]) {
	return words.map((word) => `-"${word}"`).join(' ');
}

export const allowedSites = [
	'greenhouse.io',
	'lever.co',
	'jobs.ashbyhq.com',
	'app.dover.io',
	'angel.co',
	'useparallel.com',
	'wellfound.com',
	'builtin.com',
	'apply.workable.com',
	'indeed.com/jobs'
];

export type SearchArgs = {
	searchName: string;
	provider: 'google' | 'bing';
	allowedSites: string[];
	searchWords: string[];
	exactWords: string[];
	likeWords: string[];
	blockedWords?: string[];
};

export function formatSearchURL(search: SearchArgs): URL {
	const formattedSites = formatAllowedSites(
		search.allowedSites?.length ? search.allowedSites : allowedSites
	);
	const formattedSearch = (search.searchWords ?? []).join(' ');
	const formattedExact = formatExactSearchWords(search.exactWords ?? []);
	const formattedLike = formatLikeSearchWords(search.likeWords ?? []);
	const formattedBlocked = formatBlockedWords(search.blockedWords ?? []);

	let q = '';
	if (formattedSearch !== '') {
		q += ` ${formattedSearch}`;
	}
	if (formattedExact !== '') {
		q += ` ${formattedExact}`;
	}
	if (formattedLike !== '') {
		q += ` ${formattedLike} `;
	}
	if (formattedBlocked !== '') {
		q += ` ${formattedBlocked} `;
	}

	if (formattedSites !== '') {
		q += `${formattedSites}`;
	}

	let baseURL: string;

	switch (search.provider) {
		case 'bing':
			baseURL = 'https://bing.com/search';
			break;
		case 'google':
		default:
			baseURL = 'https://google.com/search';
			break;
	}

	const url = new URL(baseURL);
	url.searchParams.set('q', q);
	url.searchParams.set('tbs', 'qdr:d');
	return url;
}
