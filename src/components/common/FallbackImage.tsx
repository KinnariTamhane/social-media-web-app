'use client';

type FallbackImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  variant?: 'avatar' | 'media';
};

const avatarFallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9ca3af">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
</svg>`;

const mediaFallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9ca3af">
  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
</svg>`;

function toDataUri(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const avatarFallbackUrl = toDataUri(avatarFallbackSvg);
const mediaFallbackUrl = toDataUri(mediaFallbackSvg);

export default function FallbackImage({
  src,
  alt,
  width,
  height,
  className,
  variant = 'avatar',
}: FallbackImageProps) {
  const fallbackUrl = variant === 'media' ? mediaFallbackUrl : avatarFallbackUrl;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'cover' }}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src === fallbackUrl) return;
        target.onerror = null;
        target.src = fallbackUrl;
      }}
    />
  );
}
