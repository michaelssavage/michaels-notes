import { RightIcon } from "@/components/icons";
import { Navigator, PageLink } from "./PagePath.styled";

interface Props {
  page: string;
  color?: string;
}

export const PagePath = ({ page, color }: Props) => {
  return (
    <Navigator>
      <PageLink to="/" color={color}>
        home
      </PageLink>
      <RightIcon />
      <PageLink to={`/${page}`} color={color}>
        {page}
      </PageLink>
      <RightIcon />
    </Navigator>
  );
};
