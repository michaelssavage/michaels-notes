import { sortByDate } from "@/assets/utils";
import { Button } from "@/components/Button";
import { Post } from "@/components/Post";
import { SearchBox } from "@/components/SearchBox";
import { CircleIcon } from "@/components/icons";
import { Col, Group, Row } from "@/styles/abstracts/layout.styled";
import { Filter, Page, Panel } from "@/styles/routes/blog.styled";
import type { IBlog, IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/blog/")({
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
      <Panel>
        <Row>
          <Col size="md" gap="1rem">
            {filterPosts(blog).length > 0 ? (
              filterPosts(blog).map((post, index) => {
                return <Post key={post.id} {...post} isFirst={index === 0} />;
              })
            ) : (
              <p>No posts found</p>
            )}
          </Col>
          <Col size="md">
            <Filter>
              <SearchBox
                id="search-item"
                label="Search posts:"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Spotify..."
              />
              <div css={Group()}>
                <p>Filters posts:</p>
                <Button
                  icon={<CircleIcon color="#fb4d3d" />}
                  text="On site"
                  variant="ghost"
                  onClick={() => setOnSite(!onSite)}
                  active={onSite}
                />

                <Button
                  icon={<CircleIcon color="#3d89fb" />}
                  text="Plant Bass'd"
                  variant="ghost"
                  onClick={() => setIsExternal(!isExternal)}
                  active={isExternal}
                />
              </div>
            </Filter>
          </Col>
        </Row>
      </Panel>
    </Page>
  );
}
