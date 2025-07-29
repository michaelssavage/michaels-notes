import { useTheme } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowBackIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { MenuContainer, PageLink, Sidebar } from "./Menu.styled";

interface Picked {
	slug: string;
	id: number;
	title: string;
}

interface Props<T> {
	open: boolean;
	setOpen: (open: boolean) => void;
	items: Array<T & Picked>;
	target: string;
}

export const Menu = <T extends {}>({
	target,
	items,
	open,
	setOpen,
}: Props<T>) => {
	const { colors } = useTheme();

	const handleClick = () => {
		setOpen(!open);
	};

	const openMenu = () => {
		if (!open) setOpen(true);
	};

	return (
		<MenuContainer open={open} onClick={openMenu}>
			<ArrowBackIcon onClick={handleClick} />

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
					>
						<PageLink to={`/${target}`} color={colors.link}>
							back to {target}
						</PageLink>

						<Sidebar>
							{items.map(({ title, id, slug }) => {
								return (
									<li key={id}>
										<Anchor
											text={title}
											link={`/${target}/${slug}`}
											variant="link"
										/>
									</li>
								);
							})}
						</Sidebar>
					</motion.div>
				)}
			</AnimatePresence>
		</MenuContainer>
	);
};
