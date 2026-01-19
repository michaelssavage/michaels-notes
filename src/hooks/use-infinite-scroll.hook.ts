import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfiniteScrollOptions<T> {
  items: T[];
  initialCount?: number;
  itemsPerPage?: number;
  threshold?: number;
}

interface UseInfiniteScrollReturn<T> {
  displayedItems: T[];
  displayedCount: number;
  hasMore: boolean;
  loadMore: () => void;
  loaderRef: React.RefObject<HTMLDivElement | null>;
  reset: () => void;
}

export function useInfiniteScroll<T>({
  items,
  initialCount = 12,
  itemsPerPage = 12,
  threshold = 0.1,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [displayedCount, setDisplayedCount] = useState(initialCount);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setDisplayedCount((prev) => Math.min(prev + itemsPerPage, items.length));
  }, [items.length, itemsPerPage]);

  const reset = useCallback(() => {
    setDisplayedCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    reset();
  }, [items, reset]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && displayedCount < items.length) {
          loadMore();
        }
      },
      { threshold },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [displayedCount, items.length, loadMore, threshold]);

  const displayedItems = items.slice(0, displayedCount);
  const hasMore = displayedCount < items.length;

  return {
    displayedItems,
    displayedCount,
    hasMore,
    loadMore,
    loaderRef,
    reset,
  };
}
