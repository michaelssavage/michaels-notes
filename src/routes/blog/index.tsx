import { Button } from "@/components/Button";
import { Post } from "@/components/Post";
import { CircleIcon, SearchIcon } from "@/components/icons";
import styles from "@/styles/blog.module.scss";
import type { IBlog, IPosts } from "@/types/Post";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/blog/")({
  component: Blog,
});

const { blog }: IPosts = import.meta.env.POSTS;

function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [external, setExternal] = useState(true);
  const [onSite, setOnSite] = useState(true);

  const filterPosts = (list: IBlog[]) => {
    const searchLowercase = searchQuery.toLowerCase();

    return list.filter((item) => {
      if (
        !item.title.toLowerCase().includes(searchLowercase) &&
        !item.description.toLowerCase().includes(searchLowercase)
      ) {
        return false;
      }

      if (item.draft) {
        return false;
      }

      if (external && onSite) {
        return true;
      }

      if (onSite) {
        return !item.external;
      }

      if (external) {
        return item.external;
      }

      return false;
    });
  };

  return (
    <div className={styles.page}>
      <main>
        <div className={styles.container}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchBox}>
              <label htmlFor="search-item">
                <input
                  id="search-item"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  type="search"
                />
              </label>

              <SearchIcon className={styles.searchIcon} />
            </div>
          </div>
          <div className={styles.colorKey}>
            <Button
              icon={<CircleIcon color="#fb4d3d" />}
              text="On site"
              variant="ghost"
              onClick={() => setOnSite(!onSite)}
              style={onSite ? "" : styles.unused}
            />

            <Button
              icon={<CircleIcon color="#3d89fb" />}
              text="Plant Bass'd"
              variant="ghost"
              onClick={() => setExternal(!external)}
              style={external ? "" : styles.unused}
            />
          </div>
          {filterPosts(blog).map((post) => {
            return <Post key={post.title} {...post} />;
          })}
        </div>
        {/* <LazyBall /> */}
      </main>
    </div>
  );
}
