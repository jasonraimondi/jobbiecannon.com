<script>
	import Input from '$lib/ui/input/Input.svelte';
	import Tag from '$lib/ui/tag/Tag.svelte';
</script>

<Input>
	{#snippet prefix()}
		<Tag removable>Hi ya</Tag>
	{/snippet}
</Input>
