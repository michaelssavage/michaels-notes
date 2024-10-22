import styled from "@emotion/styled";

export const ClockContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Arial", sans-serif;
  background-color: #1a1a1a;
  color: ${({ theme }) => theme.colors.btnBg};
  padding: 20px;
  border-radius: 10px;
  max-width: 100%;
`;

export const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

export const Digits = styled.div`
  font-size: 4rem;
  font-weight: bold;
`;

export const Label = styled.div`
  font-size: 14px;
  text-transform: uppercase;
`;

export const Separator = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin: 0 5px;
`;
