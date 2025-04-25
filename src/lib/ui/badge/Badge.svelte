<script lang="ts">
  import type { Snippet } from "svelte";
  import type { SlBadge } from "@shoelace-style/shoelace";

  import "@shoelace-style/shoelace/dist/components/badge/badge";

  type Props = { children: Snippet } & Partial<Pick<SlBadge, "variant" | "pill" | "pulse">>;

  let { children, ...props }: Props = $props();
</script>

<sl-badge {...props}>{@render children()}</sl-badge>
