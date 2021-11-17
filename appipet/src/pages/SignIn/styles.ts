import styled from "styled-components/native";
import { Platform, Image } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Top = styled.View`
  height: 120px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const ContainerImg = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 100 : 40}px;

  `;


export const Title = styled.Text`
  font-size: 80px;
  color: #ffb901;
  font-family: "RobotoSlab-Medium";
  margin: 0px 0 5px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  font-size: 15px;
  color: #101010;
  margin-bottom: 10px;
  font-family: "RobotoSlab-Medium";
`;

export const LogoImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-right: 10px
  margin-top: 5px
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
