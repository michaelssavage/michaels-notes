import { fetchFavouriteMovies } from "@/api/fetch-favorite-movies";
import { Anchor } from "@/components/Anchor";
import { Group } from "@/components/atoms/Group";
import type { IMovie } from "@/types/Movie";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { breakpoint } from "../utils";
import {
  Button,
  ButtonContainer,
  Card,
  CardStack,
  StackContainer,
} from "./Letterboxd.styled";

export const Letterboxd = () => {
  const { data } = useQuery<Array<IMovie>>({
    queryKey: ["favorites"],
    queryFn: fetchFavouriteMovies,
    refetchOnWindowFocus: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  if (!data || data.length === 0) {
    return (
      <p>
        I love watching, sharing and keeping track of movies on Letterboxd (the
        best social media platform). Some of my favourites include Amélie, Y Tu
        Mamá También, Aftersun, and Sexy Beast.
      </p>
    );
  }

  return (
    <Group align="center" gap="2rem" style={breakpoint}>
      <StackContainer>
        <CardStack>
          {data.map((movie, index) => (
            <Card
              key={movie.title}
              to={movie.movieurl}
              isActive={index === activeIndex}
              index={index}
              activeIndex={activeIndex}
            >
              <img src={movie.imageurl} alt={movie.title} />
            </Card>
          ))}
        </CardStack>
      </StackContainer>

      <div>
        <p>
          I love watching, sharing and keeping track of movies on Letterboxd
          (the best social media platform). Some of my favourites include{" "}
          {data.map((movie, index) => (
            <>
              <Anchor
                key={movie.title}
                link={movie.movieurl}
                text={movie.title}
                variant={index === activeIndex ? "link" : "text"}
              />
              {index < data.length - 1 && ", "}
            </>
          ))}
          .
        </p>
        <ButtonContainer>
          {data.map((movie, index) => (
            <Button
              key={movie.title}
              isActive={index === activeIndex}
              onClick={() => handleButtonClick(index)}
            >
              {index + 1}
            </Button>
          ))}
        </ButtonContainer>
      </div>
    </Group>
  );
};
