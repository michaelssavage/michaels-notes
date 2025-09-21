import type { IPosts } from "@/types/Post";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ContentContextType = {
  content: IPosts | null;
  isLoading: boolean;
  error: Error | null;
};

const defaultContextValue: ContentContextType = {
  content: null,
  isLoading: true,
  error: null,
};

const ContentContext = createContext<ContentContextType>(defaultContextValue);

export const useContent = () => useContext(ContentContext);

type Cprops = {
  children: ReactNode;
};

export const ContentProvider = ({ children }: Cprops) => {
  const [content, setContent] = useState<IPosts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const contentData = import.meta.env.POSTS as IPosts;
        setContent(contentData);
      } catch (err) {
        console.error("Failed to load posts:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Unknown error loading content"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const value = useMemo(
    () => ({ content, isLoading, error }),
    [content, isLoading, error],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
