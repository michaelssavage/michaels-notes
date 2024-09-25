import { sortByDate } from "@/assets/utils";
import { Button } from "@/components/Button";
import { Post } from "@/components/Post";
import { CircleIcon, SearchIcon } from "@/components/icons";
import {
  ColorKey,
  Container,
  Page,
  SearchBox,
  SearchWrapper,
} from "@/styles/routes/blog.styled";
import type { IBlog, IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/blog")({
  component: Blog,
});

const { blog }: IPosts = import.meta.env.POSTS;

function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExternal, setIsExternal] = useState(true);
  const [onSite, setOnSite] = useState(true);

  const filterPosts = (list: IBlog[]) => {
    const searchLowercase = searchQuery.toLowerCase();

    return list
      .filter((item) => {
        if (
          !item.title.toLowerCase().includes(searchLowercase) &&
          !item.description.toLowerCase().includes(searchLowercase)
        ) {
          return false;
        }

        if (item.draft) {
          return false;
        }

        if (isExternal && onSite) {
          return true;
        }

        if (onSite) {
          return !item.isExternal;
        }

        if (isExternal) {
          return item.isExternal;
        }

        return false;
      })
      .sort(sortByDate);
  };

  return (
    <Page>
      <Container>
        <SearchWrapper>
          <SearchBox>
            <label htmlFor="search-item">
              <input
                id="search-item"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                type="search"
              />
            </label>

            <SearchIcon />
          </SearchBox>
        </SearchWrapper>
        <ColorKey>
          <Button
            icon={<CircleIcon color="#fb4d3d" />}
            text="= On site"
            variant="ghost"
            onClick={() => setOnSite(!onSite)}
            active={onSite}
          />

          <Button
            icon={<CircleIcon color="#3d89fb" />}
            text="= Plant Bass'd"
            variant="ghost"
            onClick={() => setIsExternal(!isExternal)}
            active={isExternal}
          />
        </ColorKey>

        {filterPosts(blog).map((post, index) => {
          return <Post key={post.id} {...post} isFirst={index === 0} />;
        })}
      </Container>
    </Page>
  );
}
