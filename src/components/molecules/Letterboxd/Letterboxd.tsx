import { Group } from "@/components/atoms/Group";
import { Anchor } from "@/components/molecules/Anchor";
import { Picture } from "@/components/molecules/Picture";
import { getMovies } from "@/server/letterboxd.api";
import {
  Embla,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
} from "@/styles/Carousel.styled";
import { breakpoint } from "@/styles/routes/home.styled";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonContainer,
  Card,
  Movie,
  MovieContainer,
  Text,
} from "./Letterboxd.styled";

export const Letterboxd = () => {
  const fetchMovies = useServerFn(getMovies);

  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const { data } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchMovies(),
    refetchOnWindowFocus: false,
  });

  const [active, setActive] = useState(0);

  const handleButtonClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      setActive(selectedIndex);
    };

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!emblaApi || !data) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi.scrollNext();
      }
    };

    const container = buttonContainerRef.current;
    if (container) {
      container.addEventListener("keydown", handleKeyDown);
      return () => container.removeEventListener("keydown", handleKeyDown);
    }
  }, [emblaApi, data]);

  if (!data || data.length === 0 || !Array.isArray(data)) {
    return (
      <p>
        I love watching, sharing and keeping track of movies on Letterboxd (the
        best social media platform). Some of my favourites include Amélie, Y Tu
        Mamá También, Memoir of a Snail, and Sexy Beast.
      </p>
    );
  }

  return (
    <Group align="center" gap="2rem" css={breakpoint} data-testid="group">
      <MovieContainer>
        <Embla>
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              {data.map((movie, index) => (
                <EmblaSlide key={`${movie.title}-${index}`}>
                  <Card to={movie.link_url} data-testid="movie-card">
                    <Picture src={movie.image_url} alt={movie.title} />
                  </Card>
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>

        <ButtonContainer ref={buttonContainerRef} tabIndex={-1}>
          {data.map((movie, index) => (
            <Button
              key={movie.title}
              isActive={index === active}
              onClick={() => handleButtonClick(index)}
              data-active={index === active}
            >
              {index + 1}
            </Button>
          ))}
        </ButtonContainer>
      </MovieContainer>

      <Text>
        I love watching, tracking, and sharing my thoughts about films on
        Letterboxd. Some of my favourites include{" "}
        {data.map((movie, index) => (
          <span key={movie.title}>
            <Movie
              $isActive={index === active}
              onKeyDown={() => handleButtonClick(index)}
              onClick={() => handleButtonClick(index)}
            >
              {movie.title}
            </Movie>
            <span>{index < data.length - 1 ? ", " : "."}</span>
          </span>
        ))}{" "}
        and more on{" "}
        <Anchor
          link="https://letterboxd.com/ottobio/"
          text="my profile"
          variant="link"
          style={css`
            color: #2d241f;
            text-decoration: none;
            &:hover {
              color: #2d241f;
              text-decoration: underline;
            }
          `}
        />
        .
      </Text>
    </Group>
  );
};
