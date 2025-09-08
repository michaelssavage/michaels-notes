import styled from "@emotion/styled";

export const Sorter = styled.button`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	border: none;
	background: none;
	color: ${({ theme }) => theme.colors.card};
	text-decoration: underline;
`;

export const TableStyled = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 2rem;
	background: white;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.thead`
	background-color: ${({ theme }) => theme.colors.card};
`;

export const TableRow = styled.tr`
	&:nth-of-type(odd) {
		background-color: ${({ theme }) => theme.colors.card};
		color: ${({ theme }) => theme.colors.text};
	}

	&:nth-of-type(even) {
		background-color: ${({ theme }) => theme.colors.card};
		color: ${({ theme }) => theme.colors.text};
	}
`;

export const TableHead = styled.th`
	padding: 12px 16px;
	text-align: left;
	font-weight: 500;
	background-color: ${({ theme }) => theme.colors.section2};
	color: ${({ theme }) => theme.colors.card};
`;

export const TableCell = styled.td`
	padding: 12px 16px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.icon};
	vertical-align: top;

`;
