<script lang="ts">
	import AllowedSites from './AllowedSites.svelte';
	import { InputChip } from '@skeletonlabs/skeleton';

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

	let sitesSearch: string[] = ['keyvalues.com'];
</script>

<div class="card p-4">
	<h3 class="pb-2">What job boards do you want to search?</h3>
	<div class="pb-4">
		<AllowedSites />
	</div>
	<InputChip
		class="w-full"
		name="job-board-domains"
		bind:value={sitesSearch}
		placeholder="Any additional job boards. Ex: keyvalues.com"
		validation={isValidDomain}
	/>
</div>
