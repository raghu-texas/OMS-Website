import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

// Minimal image wrapper that swaps to a fallback when the source fails to load.
export const ImageWithFallback: React.FC<Props> = ({ fallbackSrc = "/fallback.png", onError, ...rest }) => {
  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.currentTarget;
    if (target.src.endsWith(fallbackSrc)) return; // Prevent loop
    target.src = fallbackSrc;
    if (onError) onError(e);
  };

  return <img loading="lazy" decoding="async" {...rest} onError={handleError} />;
};

export default ImageWithFallback;
