import { MetaData } from "@/components/atoms";
import { Group } from "@/components/atoms/Group";
import { CopyIcon, GithubIcon } from "@/components/icons";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { Picture } from "@/components/molecules/Picture";
import { Page, Panel } from "@/styles/routes/blog.styled";
import {
	Label,
	StyledTextarea,
	TextareaContainer,
	TextareaWrapper,
	Title,
	ToggleContainer,
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

	const handleCopy = () => {
		navigator.clipboard.writeText(formatText(inputText, withBPM));
		toast("Text copied to your clipboard");
	};

	const handlePaste = () => {
		setInputText(exampleRekordboxText);
	};

	const clearText = () => {
		setInputText("");
	};

	return (
		<Page>
			<MetaData title="Rekordbox Prettifier" description={description} />
			<Panel>
				<Title>Rekordbox Text Formatter</Title>

				<TextareaContainer>
					<TextareaWrapper>
						<Label htmlFor="input">Input Text</Label>
						<StyledTextarea
							id="input"
							placeholder="Paste your text here..."
							value={inputText}
							onChange={(e) => setInputText(e.target.value)}
						/>
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
					</TextareaWrapper>
				</TextareaContainer>
				<Group align="center">
					<Button
						text="Clear text"
						onClick={clearText}
						variant="pill"
						selected
					/>
					<Button
						text="Paste example text"
						onClick={handlePaste}
						variant="pill"
					/>
					<ToggleContainer
						checked={withBPM}
						onClick={() => setWithBPM(!withBPM)}
					>
						<Label htmlFor="bpm-mode">with BPM</Label>
					</ToggleContainer>
				</Group>

				<Group align="center" justify="space-between">
					<p>
						Prettify an exported setlist from Rekordbox after you're done
						recording. Useful for adding better descriptions to SoundCloud,
						MixCloud etc.
					</p>
					<Anchor
						link="https://github.com/michaelssavage/Rekordbox-Mix-Setlist"
						icon={<GithubIcon />}
						text="View on Github"
						style={viewMoreButtonStyles}
					/>
				</Group>

				<Picture src={rekordbox} alt="Rekordbox setting to export playlist" />
			</Panel>
		</Page>
	);
}
