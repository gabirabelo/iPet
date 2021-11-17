import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: "RobotoSlab-Regular";
  line-height: 28px;
`;

export const Box = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const ProviderAvatar = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 36px;
`;

export const ProviderAvatarWhats = styled.Image`
  width: 45px;
  height: 45px;

`;

export const TextCustom = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: "RobotoSlab-Regular";
  line-height: 35px;
`;

export const BoxText = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
  background: #28262e;
  padding: 10px;
  border-radius: 10px;
`;

export const BoxButton = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
  background: #28262e;
  padding: 10px;
  border-radius: 10px;
`;