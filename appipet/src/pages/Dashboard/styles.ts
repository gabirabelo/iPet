import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Provider } from ".";

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

export const Footer = styled.View`
  background: #f5b630;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  position: absolute;
  bottom: 0;
`;

export const Space = styled.View`
  width: 100px;
`

export const ButtonTab = styled(RectButton)`
  background: transparent;
  width: 150px;
  margin: 2px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: "RobotoSlab-Regular";
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: "RobotoSlab-Medium";
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>
).attrs({
  contentContainerStyle: {
    paddingTop: 32,
    paddingBottom: 70,
    paddingHorizontal: 24,
  },
})``;

export const ProvidersListTitle = styled.Text`
  font-family: "RobotoSlab-Medium";
  color: #f4ede8;
  font-size: 24px;
  margin-bottom: 24px;
`;

export const ProviderContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  margin-bottom: 25px;
  background: #3e3b47;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderAvatarWhats = styled.Image`
  width: 100px;
  height: 100px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: "RobotoSlab-Medium";
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: "RobotoSlab-Regular";
`;
