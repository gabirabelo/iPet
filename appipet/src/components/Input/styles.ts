import styled, { css } from "styled-components/native";

import FeaterIcon from "react-native-vector-icons/Feather";

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #eee;
  border-radius: 10px;
  margin-bottom: 8px;

  border-width: 2px;
  border-color: #eee;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #333;
  font-size: 16px;
  font-family: "RobotoSlab-Regular";
`;

export const Icon = styled(FeaterIcon)`
  margin-right: 16px;
`;
