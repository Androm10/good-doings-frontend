import { Paginated } from "@/core/types/paginated";
import {
  Ref,
  SetStateAction,
  Dispatch,
  useRef,
  useEffect,
  RefObject,
  useState,
} from "react";

type PaginatedCallback<T> = (page: number) => Promise<Paginated<T>>;

export const useScroll = <T>(
  listRef: RefObject<HTMLDivElement>,
  initialPage: number,
  callback: PaginatedCallback<T>,
  setEntities: Dispatch<SetStateAction<T[]>>
) => {
  const page = useRef<number>(initialPage);
  const totalPages = useRef<number | null>(null);
  const [isLoading, setLoading] = useState(false);

  const scrollHandler = () => {
    if (!listRef.current) return;

    if (
      listRef.current.scrollHeight ===
      listRef.current.offsetHeight + listRef.current.scrollTop
    ) {
      getNextPage();
    }
  };

  const getNextPage = async () => {
    if (totalPages.current !== null && totalPages.current < page.current) {
      return;
    }
    setLoading(true);
    const data = await callback(page.current);

    setEntities((prev) => [...prev, ...data.result]);
    page.current += 1;
    totalPages.current = data.pages;
    setLoading(false);
  };

  const reloadPages = async () => {
    setLoading(true);
    const data = await callback(1);

    setEntities([...data.result]);
    totalPages.current = data.pages;
    page.current = 2;
    setLoading(false);
  };

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.addEventListener("scroll", scrollHandler);
    return () => {
      if (!listRef.current) return;
      listRef.current.removeEventListener("scroll", scrollHandler);
    };
  }, [listRef, listRef.current, scrollHandler]);

  return { reloadPages, getNextPage, isLoading };
};
