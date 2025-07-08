'use client';

type FallbackImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const defaultAvatarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
</svg>
`;

const defaultAvatarUrl = `data:image/svg+xml;base64,${Buffer.from(defaultAvatarSvg).toString('base64')}`;

export default function FallbackImage({
  src,
  alt,
  width,
  height,
  className,
}: FallbackImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'cover' }}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null; // Prevent infinite loop
        target.src = defaultAvatarUrl;
      }}
    />
  );
}