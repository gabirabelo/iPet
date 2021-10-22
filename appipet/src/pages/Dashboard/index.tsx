import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
} from "./styles";

import logo from "../../assets/dog.png";
import api from "../../services/api";
import logo1 from "../../assets/dog1.jpg";
import { Text } from "react-native";

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
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

  const teste = useCallback(() => {
    signOut();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
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
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => handleSelectProvider(provider.id)}>
            <ProviderAvatar source={logo1} />

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
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
