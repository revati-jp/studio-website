<script lang="ts">
	import type { Asset, ImageSource } from '../../types';
	import { getYouTubeEmbedUrl } from '../../utils';
	import ExternalLinkIcon from '../icons/ExternalLinkIcon.svelte';

	interface Props {
		asset: Asset;
	}

	let { asset }: Props = $props();

	function getImgUrlFromSrc(src: ImageSource) {
		return typeof src === 'string' ? src : src.src;
	}

	function getAssetUrl(asset: Asset): string {
		if (asset.type === 'image') {
			return getImgUrlFromSrc(asset.src);
		}
		if (asset.type === 'video' || asset.type === 'music') {
			return asset.src;
		}
		if (asset.type === 'website' || asset.type === 'external') {
			return asset.url;
		}
		return '';
	}
</script>

<div class="asset-item">
	{#if asset.type === 'image'}
		<div class="asset-image">
			<div class="asset-header">
				<span class="asset-type-chip image">Image</span>
			</div>
			<img src={getAssetUrl(asset)} alt={asset.caption} />
			{#if asset.caption}
				<p class="asset-caption">{asset.caption}</p>
			{/if}
		</div>
	{:else if asset.type === 'video'}
		<div class="asset-video">
			<div class="asset-header">
				<span class="asset-type-chip video">Video</span>
				<h4 class="asset-title">{asset.title}</h4>
			</div>
			<div class="video-container">
				<iframe
					src={getYouTubeEmbedUrl(asset.src)}
					title={asset.title}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>
		</div>
	{:else if asset.type === 'music'}
		<div class="asset-music">
			<div class="asset-header">
				<span class="asset-type-chip music">Music</span>
				<h4 class="asset-title">{asset.title}</h4>
			</div>
			<audio controls controlslist="nodownload">
				<source src={asset.src} />
			</audio>
		</div>
	{:else if asset.type === 'website'}
		<div class="asset-website">
			<div class="asset-header">
				<span class="asset-type-chip website">Website</span>
				<h4 class="asset-title">{asset.title}</h4>
			</div>
			{#if asset.thumbnail !== undefined}
				<img src={getImgUrlFromSrc(asset.thumbnail)} alt="" />
			{/if}
			<a href={asset.url} target="_blank" rel="noopener noreferrer" class="asset-link">
				サイトを見る
				<ExternalLinkIcon />
			</a>
		</div>
	{:else if asset.type === 'external'}
		<div class="asset-external">
			<div class="asset-header">
				<span class="asset-type-chip external">External</span>
			</div>
			<a href={asset.url} target="_blank" rel="noopener noreferrer" class="asset-link">
				{asset.title ?? '外部リンク'}
				<ExternalLinkIcon />
			</a>
		</div>
	{/if}
</div>

<style lang="scss">
	.asset-item {
		background: rgba(255, 255, 255, 0.02);
		border-radius: 12px;
		padding: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.asset-title {
		font-size: 1rem;
		font-weight: 900;
		color: #fff;
		margin: 0;
	}

	.asset-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.asset-type-chip {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: 1.2;

		&.image {
			background: rgba(#10b981, 0.2);
			color: #10b981;
			border: 1px solid rgba(#10b981, 0.3);
		}

		&.video {
			background: rgba(#f59e0b, 0.2);
			color: #f59e0b;
			border: 1px solid rgba(#f59e0b, 0.3);
		}

		&.music {
			background: rgba(#8b5cf6, 0.2);
			color: #8b5cf6;
			border: 1px solid rgba(#8b5cf6, 0.3);
		}

		&.website {
			background: rgba(#3b82f6, 0.2);
			color: #3b82f6;
			border: 1px solid rgba(#3b82f6, 0.3);
		}

		&.external {
			background: rgba(#6b7280, 0.2);
			color: #9ca3af;
			border: 1px solid rgba(#6b7280, 0.3);
		}
	}

	.asset-image,
	.asset-website {
		img {
			width: 100%;
			height: auto;
			border-radius: 8px;
			margin-bottom: 0.75rem;
		}
	}

	.asset-caption {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.5);
		margin: 0;
		line-height: 1.3;
		text-align: center;
	}

	.asset-music audio {
		width: 100%;
		border-radius: 8px;
	}

	.video-container {
		position: relative;
		width: 100%;
		height: 0;
		padding-bottom: 56.25%; // 16:9 aspect ratio
		overflow: hidden;
		border-radius: 8px;

		iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}

	.asset-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: rgba($color-accent, 0.9);
		text-decoration: none;
		font-weight: 400;
		padding: 0.5rem 1rem;
		border: 1px solid rgba($color-accent, 0.3);
		border-radius: 6px;
		transition: all 0.2s ease;

		&:hover {
			background: rgba($color-accent, 0.1);
			border-color: rgba($color-accent, 0.5);
		}
	}

	@media (max-width: 768px) {
		.asset-title {
			font-size: 0.9rem;
		}

		.asset-header {
			gap: 0.5rem;
			margin-bottom: 0.75rem;
		}

		.asset-type-chip {
			font-size: 0.65rem;
			padding: 0.2rem 0.6rem;
		}

		.asset-caption {
			font-size: 0.7rem;
			line-height: 1;
		}

		.asset-item {
			padding: 1rem;
		}
	}
</style>
