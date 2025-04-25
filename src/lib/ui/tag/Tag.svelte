<script lang="ts">
  import type { Snippet } from "svelte";
  import type { SlTag } from "@shoelace-style/shoelace";

  import "@shoelace-style/shoelace/dist/components/tag/tag";

  type Props = { children: Snippet } & Partial<Pick<SlTag, "removable">>;

  let { children, ...props }: Props = $props();
</script>

<sl-tag {...props}>{@render children()}</sl-tag>
