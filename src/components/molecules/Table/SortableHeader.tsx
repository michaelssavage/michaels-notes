import type { OnChangeFn, SortingState } from "@tanstack/react-table";
import { ArrowDown, ArrowUpIcon } from "@/components/icons";
import { Sorter } from "@/components/molecules/Table/Table.styled";

export function sortableHeader(
  key: string,
  title: string,
  sorting: SortingState,
  onSortingChange: OnChangeFn<SortingState>,
) {
  const isSorted = (key: string) => sorting?.[0]?.id === key;
  const sortingDesc = () => (sorting?.[0] ? sorting[0].desc : false);

  return (
    <Sorter
      className={isSorted(key) ? "font-extrabold" : ""}
      onClick={() => {
        return onSortingChange([
          {
            id: key,
            desc: isSorted(key) ? !sortingDesc() : false,
          },
        ]);
      }}
    >
      {title}
      {isSorted(key) && !sortingDesc() && <ArrowDown />}
      {isSorted(key) && sortingDesc() && <ArrowUpIcon />}
    </Sorter>
  );
}
