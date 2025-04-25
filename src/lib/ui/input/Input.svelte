<script lang="ts">
  import type { SlInput } from "@shoelace-style/shoelace";
  import "@shoelace-style/shoelace/dist/components/input/input";

  type Props = {
    name: SlInput["name"];
    value?: string | null | boolean;
    this?: any;
  } & Partial<
    Pick<
      SlInput,
      | "autocapitalize"
      | "autocomplete"
      | "autocorrect"
      | "label"
      | "maxlength"
      | "minlength"
      | "passwordToggle"
      | "pattern"
      | "placeholder"
			| "prefix"
      | "required"
      | "type"
    >
  >;

  let { name, value = $bindable(), ...props }: Props = $props();

  function onInput(evt: Event) {
    value = (evt.target as SlInput).value;
  }
</script>

<sl-input onsl-input={onInput} id={name} {name} {value} {...props}
>
	{#if props.prefix}
  <span slot="prefix">
		{@render props.prefix?.()}

    <sl-tag removable>Tag 1</sl-tag>
    <sl-tag removable>Tag 2</sl-tag>
  </span>
	{/if}
</sl-input>
