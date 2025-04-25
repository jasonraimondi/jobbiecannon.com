<script lang="ts">
  import { search } from "$lib";
  import { allowedSites } from "$lib/format_urls";


</script>

<div>
  <div class="btn-group variant-filled text-xs">
    <button class="text-xs" onclick={() => setSearch("product-manager")}>Product Manager</button>
    <button class="text-xs" onclick={() => setSearch("ui-ux-designer")}>Designer</button>
    <button class="text-xs" onclick={() => setSearch("software-engineer")}>Software Engineer</button
    >
  </div>
</div>
