import { MetaData } from "@/components/atoms";
import { Group } from "@/components/atoms/Group";
import { CopyIcon, GithubIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { Checkbox } from "@/components/molecules/Form/Checkbox";
import { Picture } from "@/components/molecules/Picture";
import { Page, Panel } from "@/styles/routes/blog.styled";
import {
	AboutSection,
	DragBanner,
	Label,
	StyledTextarea,
	TextareaWrapper,
	Title,
	copyButtonStyles,
	viewMoreButtonStyles,
} from "@/styles/routes/rekordbox-prettifier.styled";
import { exampleRekordboxText } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import rekordbox from "src/assets/images/blog/export-playlist.jpg";

export const Route = createFileRoute("/blog/pretty-text")({
	component: RekordboxPrettifier,
});

const description =
	"Getting the track setlist from a .txt file from Rekordbox after recording a mix";

function RekordboxPrettifier() {
	const [inputText, setInputText] = useState("");
	const [withBPM, setWithBPM] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	const formatText = useCallback((text: string, withBPM: boolean) => {
		const lines = text.split("\n");
		let formattedLines: string[] = [];

		if (lines.length > 0) {
			const headers = lines[0].split("\t");
			const artistIndex = headers.indexOf("Artist");
			const trackIndex = headers.indexOf("Track Title");
			const bpmIndex = headers.indexOf("BPM");

			if (artistIndex !== -1 && trackIndex !== -1) {
				formattedLines = lines.slice(1).map((line, index) => {
					const songInfo = line.split("\t");
					const artist = songInfo[artistIndex]?.trim() || "";
					const track = songInfo[trackIndex]?.trim() || "";
					const bpm =
						withBPM && bpmIndex !== -1 ? songInfo[bpmIndex]?.trim() : "";

					return `${index + 1}. ${artist} - ${track}${bpm ? ` (${bpm})` : ""}`;
				});
			} else {
				// If the expected headers are not found, return the original text
				return text;
			}
		}

		return formattedLines.join("\n");
	}, []);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(formatText(inputText, withBPM));
		toast("Text copied to your clipboard");
	}, [inputText, withBPM, formatText]);

	const handlePaste = useCallback(() => {
		setInputText(exampleRekordboxText);
	}, []);

	const clearText = useCallback(() => {
		setInputText("");
	}, []);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		const file = e.dataTransfer.files[0];
		if (file && file.type === "text/plain") {
			const reader = new FileReader();
			reader.onload = (event) => {
				setInputText(event.target?.result as string);
			};
			reader.readAsText(file);
		} else {
			toast.error("Please drop a valid .txt file");
		}
	};

	return (
		<Page
			onDragOver={handleDragOver}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			{isDragging && (
				<DragBanner>
					<h1>Drop your .txt file here to format the Rekordbox setlist!</h1>
				</DragBanner>
			)}
			<MetaData title="Rekordbox Prettifier" description={description} />
			<Panel>
				<Title>Rekordbox Text Formatter</Title>
				<Group justify="flex-end">
					<Anchor
						link="https://github.com/michaelssavage/Rekordbox-Mix-Setlist"
						icon={<GithubIcon />}
						text="View on Github"
						style={viewMoreButtonStyles}
						isExternal
					/>
				</Group>

				<Group wrap="wrap">
					<TextareaWrapper>
						<Label htmlFor="input">Input Text</Label>
						<StyledTextarea
							id="input"
							placeholder="Paste your text here..."
							value={inputText}
							onChange={(e) => setInputText(e.target.value)}
						/>
						<Group>
							<Button
								text="Paste example text"
								onClick={handlePaste}
								variant="primary"
							/>

							<Button
								text="Clear text"
								onClick={clearText}
								variant="secondary"
							/>
						</Group>
					</TextareaWrapper>
					<TextareaWrapper>
						<Button
							onClick={handleCopy}
							icon={<CopyIcon size={20} />}
							styles={copyButtonStyles}
						/>

						<Label htmlFor="output">Formatted Text</Label>

						<StyledTextarea
							id="output"
							readOnly
							value={formatText(inputText, withBPM)}
						/>
						<Group justify="flex-end">
							<Checkbox
								id="bpm-mode"
								onChange={() => setWithBPM(!withBPM)}
								value={withBPM}
								text="with BPM"
							/>
						</Group>
					</TextareaWrapper>
				</Group>

				<AboutSection>
					<h2>About</h2>

					<Picture src={rekordbox} alt="Rekordbox setting to export playlist" />
					<p>
						Prettify an exported setlist from Rekordbox after you're done
						recording. Useful for adding better descriptions to SoundCloud,
						MixCloud etc.
					</p>
					<p>
						Click the <b>Paste example text</b> button to see what the contents
						of an exported .txt file look like. <b>Clear text</b> to start
						entering your own .txt file.
					</p>
					<p>
						For convenience you can drag-and-drop a text file onto the page to
						fill the textarea. You can also copy the formatted text by clicking 
						the icon in the top right corner of the textarea.
					</p>
				</AboutSection>
			</Panel>
		</Page>
	);
}
