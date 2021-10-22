import styled from "styled-components/native";
import { Platform, Image } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 170 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #ff9000;
  font-family: "RobotoSlab-Medium";
  margin: 40px 0 24px;
`;

export const LogoImage = styled(Image)`
  width: 70px;
  height: 70px;
`;

export const Logo = styled.Text`
  font-size: 20px;
  color: #ff9000;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #333;
  font-size: 16px;
  font-family: "RobotoSlab-Regular";
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #ff9000;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #ff9000;
  font-size: 18px;
  font-family: "RobotoSlab-Regular";
  margin-left: 16px;
`;
