import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

// Minimal image wrapper that swaps to a fallback when the source fails to load.
export const ImageWithFallback = React.forwardRef<HTMLImageElement, Props>(
  ({ fallbackSrc = "/fallback.png", onError, ...rest }, ref) => {
    const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
      const target = e.currentTarget;
      if (target.src.endsWith(fallbackSrc)) return; // Prevent loop
      target.src = fallbackSrc;
      if (onError) onError(e);
    };

    return <img loading="lazy" decoding="async" ref={ref} {...rest} onError={handleError} />;
  }
);

ImageWithFallback.displayName = "ImageWithFallback";

export default ImageWithFallback;
