import { useState, useEffect, MutableRefObject } from 'react';

export const useElementVisibility = (
  ref: MutableRefObject<HTMLElement | undefined>
) => {
  const [visibility, setVisibility] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibility(Math.ceil(entry.intersectionRatio * 100) / 100);
      },
      {
        threshold: Array(100)
          .fill(undefined)
          .map((_, index) => index / 100)
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return visibility;
};
