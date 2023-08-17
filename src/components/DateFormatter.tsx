import { format, parseISO } from "date-fns";

interface DateFormatterProps {
  dateString: string;
}

export const DateFormatter = ({ dateString }: DateFormatterProps) => {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, "PP")}</time>;
};
