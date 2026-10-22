import { getMovies, updateMovies } from "@/api/d1/letterboxd.api";
import { Group } from "@/components/atoms/Group";
import { SquarePenIcon } from "@/components/icons/SquarePen";
import { Button as ActionButton } from "@/components/molecules/Button";
import { Picture } from "@/components/molecules/Picture";
import { useAppForm } from "@/context/FormProvider";
import {
  Embla,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
} from "@/styles/abstracts/embla.styled";
import { reverseBreak } from "@/styles/routes/home.styled";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Button,
  ButtonContainer,
  Card,
  editBtnStyle,
  Movie,
  MovieContainer,
  Text,
  TextColumn,
} from "./Letterboxd.styled";
import MoviesForm from "./MoviesForm";

export const Letterboxd = () => {
  const fetchMovies = useServerFn(getMovies);
  const saveMovies = useServerFn(updateMovies);
  const queryClient = useQueryClient();
  const { isAdmin } = useRouteContext({ from: "__root__" });
  const [isEditing, setIsEditing] = useState(false);

  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const { data, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchMovies,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  if (error) {
    console.error(error);
  }

  const [active, setActive] = useState(0);

  const form = useAppForm({
    defaultValues: {
      movies: (data ?? []).map(({ id: _, ...movie }) => movie),
    },
    onSubmit: async ({ value }) => {
      try {
        const movies = await saveMovies({ data: value });
        queryClient.setQueryData(["favorites"], movies);
        toast.success("Movies updated");
        setIsEditing(false);
      } catch {
        toast.error("Failed to update movies");
      }
    },
  });

  const handleEdit = () => {
    form.reset({
      movies: (data ?? []).map(({ id: _, ...movie }) => movie),
    });
    setIsEditing(true);
  };

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

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p>
        I love watching, sharing and keeping track of movies on Letterboxd (the
        best social media platform). Some of my favourites include Amélie, Y Tu
        Mamá También, Memoir of a Snail, and Sexy Beast.
      </p>
    );
  }

  return (
    <Group
      align="center"
      gap="1rem 2rem"
      css={reverseBreak}
      data-testid="group"
    >
      <TextColumn>
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
          ))}
        </Text>

        {isAdmin && (
          <>
            <ActionButton
              text="Edit"
              icon={<SquarePenIcon />}
              onClick={handleEdit}
              styles={editBtnStyle}
            />
            <MoviesForm
              form={form}
              isOpen={isEditing}
              onClose={() => setIsEditing(false)}
            />
          </>
        )}
      </TextColumn>

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
    </Group>
  );
};
