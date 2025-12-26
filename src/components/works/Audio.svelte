<script lang="ts">
	import PlaybackControls from '../music/PlaybackControls.svelte';
	import SeekBar from '../music/SeekBar.svelte';
	import Slider from '../music/Slider.svelte';
	import type { Track } from '../../types/music';

	interface Props {
		src: string;
		title: string;
	}

	let { src, title }: Props = $props();

	// Audio Player Logic
	let audio: HTMLAudioElement | undefined = $state();
	let isPlaying = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	let volume = $state(0.3);
	let isMuted = $state(false);
	let previousVolume = $state(1);

	let track: Track | null = $derived({
		title,
		artist: '',
		src
	});

	function togglePlay() {
		if (!audio) return;
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	}

	function handleSeek(time: number) {
		if (audio) {
			audio.currentTime = time;
		}
	}

	function toggleMute() {
		if (isMuted) {
			volume = previousVolume;
			isMuted = false;
		} else {
			previousVolume = volume;
			volume = 0;
			isMuted = true;
		}
	}

	function handleVolumeChange(event: Event) {
		const target = event.target as HTMLInputElement;
		volume = parseFloat(target.value);
		if (volume > 0) {
			isMuted = false;
		} else {
			isMuted = true;
		}
	}
</script>

<div class="custom-player">
	<audio
		bind:this={audio}
		{src}
		bind:volume
		ontimeupdate={() => (currentTime = audio?.currentTime ?? 0)}
		onloadedmetadata={() => (duration = audio?.duration ?? 0)}
		onended={() => (isPlaying = false)}
		onplay={() => (isPlaying = true)}
		onpause={() => (isPlaying = false)}
	></audio>

	<div class="controls-wrapper">
		<div class="playback-controls-container">
			<PlaybackControls
				currentTrack={track}
				{isPlaying}
				isMobile={false}
				isMobileExpanded={false}
				onTogglePlay={togglePlay}
			/>
		</div>
		<div class="seekbar-wrapper">
			<SeekBar
				{currentTime}
				{duration}
				currentTrack={track}
				onSeek={handleSeek}
				styles={{
					height: '8px',
					thumbSize: '18px',
					borderRadius: '4px'
				}}
			/>
		</div>
		<div class="volume-control">
			<button
				class="mute-btn"
				onclick={toggleMute}
				aria-label={isMuted ? 'ミュート解除' : 'ミュート'}
			>
				{#if isMuted || volume === 0}
					<!--
						Bootstrap Icons - Volume mute fill
						https://icons.getbootstrap.com/icons/volume-mute-fill
						Copyright (c) 2019 The Bootstrap Authors
						under the MIT License: https://github.com/twbs/icons/blob/main/LICENSE
					-->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						class="bi bi-volume-mute-fill"
						viewBox="0 0 16 16"
					>
						<path
							d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"
						/>
					</svg>
				{:else if volume < 0.5}
					<!--
						Bootstrap Icons - Volume down fill
						https://icons.getbootstrap.com/icons/volume-down-fill
						Copyright (c) 2019 The Bootstrap Authors
						under the MIT License: https://github.com/twbs/icons/blob/main/LICENSE
					-->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						class="bi bi-volume-down-fill"
						viewBox="0 0 16 16"
					>
						<path
							d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zm3.025 4a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8"
						/>
					</svg>
				{:else}
					<!--
						Bootstrap Icons - Volume up fill
						https://icons.getbootstrap.com/icons/volume-up-fill
						Copyright (c) 2019 The Bootstrap Authors
						under the MIT License: https://github.com/twbs/icons/blob/main/LICENSE
					-->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						class="bi bi-volume-up-fill"
						viewBox="0 0 16 16"
					>
						<path
							d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"
						/>
						<path
							d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"
						/>
						<path
							d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"
						/>
					</svg>
				{/if}
			</button>
			<div class="volume-slider-container">
				<Slider
					bind:value={volume}
					min={0}
					max={1}
					step={0.01}
					oninput={handleVolumeChange}
					ariaLabel="音量"
				/>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.custom-player {
		background: rgba($color-secondary, 0.4);
		border: 1px solid rgba($color-accent, 0.08);
		border-radius: 8px;
		padding: 1rem;

		@media (max-width: 480px) {
			padding: 1.8rem 0.8rem 1rem 0.8rem;
		}

		.controls-wrapper {
			display: flex;
			align-items: center;
			gap: 1rem;

			@media (max-width: 480px) {
				flex-direction: column;
				gap: 1.2rem;
			}
		}

		.playback-controls-container {
			// PlaybackControlsのスタイル調整
			:global(.controls) {
				margin-bottom: 0 !important; // desktopクラスのmarginを打ち消し
				gap: 0 !important; // ボタン間の隙間を調整
			}

			@media (max-width: 480px) {
				order: 2;
				width: 100%;
				display: flex;
				justify-content: center;
			}
		}

		.seekbar-wrapper {
			flex: 1;

			@media (max-width: 480px) {
				width: 100%;
				order: 1;
			}
		}

		.volume-control {
			display: flex;
			align-items: center;
			gap: 8px;
			width: 120px;

			@media (max-width: 600px) {
				display: none;
			}

			.mute-btn {
				background: transparent;
				border: none;
				color: rgba($color-background, 0.7);
				cursor: pointer;
				padding: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: color 0.2s ease;

				&:hover {
					color: $color-background;
				}
			}

			.volume-slider-container {
				flex: 1;
				display: flex;
				align-items: center;
				height: 20px;
			}
		}
	}
</style>
