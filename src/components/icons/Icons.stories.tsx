import * as AllIcons from "./index";

export default {
	title: "Atoms/Icons",
	parameters: { backgroundColor: "transparent" },
};

export const Icons = () => (
	<div
		style={{
			maxWidth: "800px",
			margin: "0 auto 3rem",
			display: "flex",
			flexDirection: "column",
			gap: "2rem",
		}}
	>
		<h1>All Icons in use</h1>
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: 24,
			}}
		>
			{Object.entries(AllIcons).map(([name, Icon]) => (
				<div
					key={name}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: 80,
					}}
				>
					<Icon onClick={() => {}} color="#000000" />
					<span style={{ marginTop: 8, fontSize: 12 }}>{name}</span>
				</div>
			))}
		</div>
	</div>
);
