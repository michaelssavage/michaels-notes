import { Image, SimpleGrid, Text } from "@mantine/core";
import { XyzTransitionGroup } from "@animxyz/react";

interface MovieProps {
  name: string;
  director: string;
  year: string;
  imgSrc: string;
}

const data = [
  {
    name: "Amelie",
    director: "Jean-Pierre Jeunet",
    year: "2001",
    imgSrc:
      "https://a.ltrbxd.com/resized/sm/upload/ly/0v/ey/u7/pM20xF4WFyX7G3ie0YBXFp75aEC-0-230-0-345-crop.jpg",
  },
  {
    name: "The Quiet Girl",
    director: "Colm Bairéad",
    year: "2022",
    imgSrc:
      "https://a.ltrbxd.com/resized/film-poster/8/2/2/3/3/3/822333-the-quiet-girl-0-230-0-345-crop.jpg",
  },
  {
    name: "Aftersun",
    director: "Charlotte Wells",
    year: "2022",
    imgSrc:
      "https://a.ltrbxd.com/resized/film-poster/8/6/8/5/5/8/868558-aftersun-0-230-0-345-crop.jpg",
  },
  {
    name: "Come and See",
    director: "Elem Klimov",
    year: "1985",
    imgSrc:
      "https://a.ltrbxd.com/resized/film-poster/3/6/1/9/2/36192-come-and-see-0-230-0-345-crop.jpg",
  },
  {
    name: "The Batman",
    director: "Matt Reeves",
    year: "2022",
    imgSrc:
      "https://a.ltrbxd.com/resized/film-poster/3/4/8/9/1/4/348914-the-batman-0-230-0-345-crop.jpg",
  },
  {
    name: "Blade Runner 2049",
    director: "Denis Villeneuve",
    year: "2017",
    imgSrc:
      "https://a.ltrbxd.com/resized/film-poster/2/6/5/4/3/9/265439-blade-runner-2049-0-230-0-345-crop.jpg",
  },
  {
    name: "Eyes Wide Shut",
    director: "Stanley Kubrick",
    year: "1999",
    imgSrc:
      "https://a.ltrbxd.com/resized/sm/upload/td/om/t8/dh/c8X6UIbzbhBBuyuHRrzVzaCMbkZ-0-230-0-345-crop.jpg",
  },
  {
    name: "Fear and Loathing in Las Vegas",
    director: "Terry Gilliam",
    year: "1998",
    imgSrc:
      "https://a.ltrbxd.com/resized/film-poster/5/0/7/2/5/50725-fear-and-loathing-in-las-vegas-0-230-0-345-crop.jpg",
  },
  {
    name: "Portrait of a Lady on Fire",
    director: "Céline Sciamma",
    year: "2019",
    imgSrc:
      "https://a.ltrbxd.com/resized/film-poster/4/6/0/8/3/0/460830-portrait-of-a-lady-on-fire-0-230-0-345-crop.jpg",
  },
  {
    name: "WALL·E",
    director: "Andrew Stanton",
    year: "2008",
    imgSrc:
      "https://a.ltrbxd.com/resized/film-poster/4/5/9/9/4/45994-walle-0-230-0-345-crop.jpg",
  },
];

export const Letterboxd = () => {
  return (
    <section>
      <XyzTransitionGroup
        appearVisible
        xyz="fade up in-left in-rotate-left out-right out-rotate-right"
      >
        <SimpleGrid cols={5} style={{ margin: "1rem 0.25rem" }}>
          {data.map((movie: MovieProps) => (
            <div
              key={`${movie.name}-${movie.director}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                radius="md"
                src={movie.imgSrc}
                alt={`${movie.name} album art`}
                width={200}
              />
              <Text weight={800} style={{ marginTop: "1rem" }}>
                {movie.name} - {movie.year}
              </Text>
              <Text>Directed by {movie.director}</Text>
            </div>
          ))}
        </SimpleGrid>
      </XyzTransitionGroup>
    </section>
  );
};
