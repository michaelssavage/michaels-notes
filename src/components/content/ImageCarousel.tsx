import create from "@/assets/images/project/goods-store-create.png";
import home from "@/assets/images/project/goods-store-home.png";
import view from "@/assets/images/project/goods-store-view.png";
import { Picture } from "@/components/molecules/Picture";
import { Scroll } from "@/components/molecules/Scroll";

const images = [
	{
		pic: home,
		alt: "Home page",
	},

	{
		pic: view,
		alt: "View page",
	},

	{
		pic: create,
		alt: "Create Modal",
	},
];

export const ImageCarousel = () => {
	return (
		<Scroll>
			{images.map(({ pic, alt }) => (
				<Picture src={pic} key={pic} alt={alt} />
			))}
		</Scroll>
	);
};
