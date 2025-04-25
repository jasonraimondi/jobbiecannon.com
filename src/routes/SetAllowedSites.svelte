<script lang="ts">
  import PresetAllowedSites from "./PresetAllowedSites.svelte";
  import { additionalAllowedSites, DOMAIN_REGEX } from "$lib";
	import toast from 'svelte-french-toast';
	import InputChip from '$lib/ui/input/InputChip.svelte';

  function isValidDomain(domain: string): boolean {
    const { success } = DOMAIN_REGEX.safeParse(domain);
    if (success) {
      domain = domain.replace("https://", "").replace("http://", "");
      $additionalAllowedSites = [...$additionalAllowedSites, domain];
    } else {
      toast.error(`Must be a valid url. Please include the https:// portion.`);
    }
    return success;
  }
</script>

<div class="card p-4">
  <h3 class="pb-2">What job boards do you want to search?</h3>
  <div class="pb-4">
    <PresetAllowedSites />
  </div>
  <InputChip
    class="w-full"
    name="job-board-domains"
    bind:value={$additionalAllowedSites}
    placeholder="Any additional job boards. Ex: keyvalues.com"
    validation={isValidDomain}
  />
</div>
