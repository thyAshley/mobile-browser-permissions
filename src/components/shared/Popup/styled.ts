import styled from "styled-components";
import { Button } from "react-lifesg-design-system";

export const Container = styled.div`
  padding: 32px;
  display: inline-block;
`;

export const Text = styled.p`
  font-size: 16px;
`;

export const FooterText = styled(Text)`
  font-weight: bold;
`;

export const AppButton = styled(Button)`
  height: 60px;
  flex-grow: 1;
  margin: 10px;
`;

export const ButtonWrapper = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
