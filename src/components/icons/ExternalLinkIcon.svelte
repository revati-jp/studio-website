<script lang="ts">
	interface Props {
		width?: string | number;
		height?: string | number;
		class?: string;
	}

	let { width = 16, height = 16, class: className }: Props = $props();
</script>

<!--
	External link icon (arrow-up-right)
	Based on Lucide Icons
	https://lucide.dev/icons/arrow-up-right
	Copyright (c) 2013-2022 Lucide Contributors
	under the ISC License: https://github.com/lucide-icons/lucide/blob/main/LICENSE
-->
<svg
	{width}
	{height}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
>
	<path
		d="M7 17L17 7M17 7H7M17 7V17"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
