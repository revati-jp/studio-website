<script lang="ts">
	export interface SliderStyles {
		height?: string;
		thumbSize?: string;
		borderRadius?: string;
	}

	interface Props {
		value: number;
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		ariaLabel?: string;
		styles?: SliderStyles;
		oninput?: (event: Event) => void;
	}

	let {
		value = $bindable(),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		ariaLabel = 'slider',
		styles = {},
		oninput
	}: Props = $props();

	const percentage = $derived(((value - min) / (max - min)) * 100);
</script>

<input
	type="range"
	class="slider"
	class:disabled
	{min}
	{max}
	{step}
	bind:value
	{oninput}
	aria-label={ariaLabel}
	{disabled}
	style:--slider-height={styles.height ?? '4px'}
	style:--slider-thumb-size={styles.thumbSize ?? '12px'}
	style:--slider-border-radius={styles.borderRadius ?? '2px'}
	style:--slider-percentage={`${percentage}%`}
/>

<style lang="scss">
	.slider {
		// CSS variables with defaults
		--slider-track-color: rgba(246, 233, 233, 0.2);
		--slider-progress-color: #e16428;
		--slider-thumb-color: #e16428;
		--slider-disabled-track-color: rgba(246, 233, 233, 0.1);
		--slider-disabled-thumb-color: rgba(246, 233, 233, 0.3);

		width: 100%;
		height: var(--slider-height);
		border-radius: var(--slider-border-radius);
		outline: none;
		cursor: pointer;
		-webkit-appearance: none;
		appearance: none;

		background: linear-gradient(
			to right,
			var(--slider-progress-color) 0%,
			var(--slider-progress-color) var(--slider-percentage),
			var(--slider-track-color) var(--slider-percentage),
			var(--slider-track-color) 100%
		);

		// WebKit track
		&::-webkit-slider-track {
			height: var(--slider-height);
			background: transparent;
			border-radius: var(--slider-border-radius);
		}

		// WebKit runnable track
		&::-webkit-slider-runnable-track {
			height: var(--slider-height);
			background: transparent;
			border-radius: var(--slider-border-radius);
		}

		// Mozilla track
		&::-moz-range-track {
			height: var(--slider-height);
			background: var(--slider-track-color);
			border-radius: var(--slider-border-radius);
			border: none;
		}

		// Mozilla progress
		&::-moz-range-progress {
			height: var(--slider-height);
			background: var(--slider-progress-color);
			border-radius: var(--slider-border-radius);
		}

		&::-webkit-slider-thumb {
			appearance: none;
			width: var(--slider-thumb-size);
			height: var(--slider-thumb-size);
			background: var(--slider-thumb-color);
			border-radius: 50%;
			cursor: pointer;
			margin-top: calc((var(--slider-height) - var(--slider-thumb-size)) / 2);

			@media (hover: none) and (pointer: coarse) {
				border: 2px solid transparent;
				background-clip: content-box;
			}
		}

		&::-moz-range-thumb {
			width: var(--slider-thumb-size);
			height: var(--slider-thumb-size);
			background: var(--slider-thumb-color);
			border-radius: 50%;
			border: none;
			cursor: pointer;

			@media (hover: none) and (pointer: coarse) {
				border: 2px solid transparent;
				background-clip: content-box;
			}
		}

		&.disabled {
			cursor: not-allowed;
			background: var(--slider-disabled-track-color) !important;

			&::-webkit-slider-thumb,
			&::-moz-range-thumb {
				background: var(--slider-disabled-thumb-color);
			}
		}
	}
</style>
