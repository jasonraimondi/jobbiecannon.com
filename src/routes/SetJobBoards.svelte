<script>
	import AllowedSites from './AllowedSites.svelte';
	import { InputChip } from '@skeletonlabs/skeleton';
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
