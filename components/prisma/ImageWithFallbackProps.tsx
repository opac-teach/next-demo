'use client';

import { useState } from 'react';

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

export function ImageWithFallback({ src, alt, width, height, className }: ImageWithFallbackProps) {
    const [imageError, setImageError] = useState(false);

    if (imageError || !src) {
        return (
            <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
                <span>{alt.charAt(0).toUpperCase()}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onError={() => setImageError(true)}
        />
    );
}
