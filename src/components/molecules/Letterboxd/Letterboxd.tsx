import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchFavouriteMovies } from "@/api/favorite-movies.api";
import { Group } from "@/components/atoms/Group";
import { Picture } from "@/components/molecules/Picture";
import { breakpoint } from "@/styles/routes/home.styled";
import type { IMovie } from "@/types/Movie";
import {
	Button,
	ButtonContainer,
	Card,
	CardStack,
	HoverOverlay,
	HoverText,
	Movie,
	StackContainer,
} from "./Letterboxd.styled";

export const Letterboxd = () => {
	const { data } = useQuery<Array<IMovie>>({
		queryKey: ["favorites"],
		queryFn: fetchFavouriteMovies,
		refetchOnWindowFocus: false,
	});

	const [active, setActive] = useState(0);

	const handleButtonClick = (index: number) => {
		setActive(index);
	};

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
			<StackContainer>
				<CardStack>
					{data.map((movie, index) => (
						<Card
							key={`${movie.title}-${index}`}
							to={movie.link_url}
							diff={index - active}
							$isActive={index === active}
							data-testid="movie-card"
						>
							<Picture src={movie.image_url} alt={movie.title} />

							<HoverOverlay>
								<HoverText>open</HoverText>
							</HoverOverlay>
						</Card>
					))}
				</CardStack>
			</StackContainer>

			<div>
				I love watching, sharing and keeping track of movies on Letterboxd (the
				best social media platform). Some of my favourites include{" "}
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
				<ButtonContainer>
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
			</div>
		</Group>
	);
};
