import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Linking, Text } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  Footer,
  ButtonTab,
  Space,
  ProviderAvatarWhats,
} from "./styles";

import logo from "../../assets/user.jpg";
import logowhats from "../../assets/whatsapp.png";

import api from "../../services/api";
import Profile from "../Profile";

import Button from "../../components/Button";

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
  city: string;
  user_type: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.get("providers").then((response) => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectProvider = useCallback(
    (providerId: string) => {
      navigation.navigate("CreateAppointment", { providerId });
    },
    [navigation]
  );

  const whatsapp = (text, phone) => {
    Linking.openURL(`whatsapp://send?text=${text}&phone=${phone}`);
  };

  const teste = useCallback(() => {
    signOut();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
          {console.log(user)}
        </HeaderTitle>

        <ProfileButton onPress={teste}>
          <Icon name="log-out" size={14} color="#ff9000" />
          {/* <UserAvatar source={logo} /> */}
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Veterinários</ProvidersListTitle>
        }
        renderItem={({ item: provider }) =>
          provider.user_type === "Veterinário" ? (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
            >
              <ProviderAvatar source={logo} />
              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>
                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                </ProviderMeta>
                <ProviderMeta>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <ProviderMetaText>8h às 18h</ProviderMetaText>
                </ProviderMeta>
                <ProviderMeta>
                  <Icon name="user" size={14} color="#ff9000" />
                  <ProviderMetaText>{provider.city}</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
          ) : null
        }
      />

      <Footer>
        <ButtonTab onPress={() => navigation.navigate("Dashboard")}>
          <Icon name="home" size={25} color="#000000" />
        </ButtonTab>
        <ButtonTab onPress={() => navigation.navigate("MyAppointments")}>
          <Icon name="calendar" size={25} color="#000000" />
        </ButtonTab>
        <ButtonTab onPress={() => navigation.navigate("Profile")}>
          <Icon name="user" size={25} color="#000000" />
        </ButtonTab>
      </Footer>
    </Container>
  );
};

export default Dashboard;
