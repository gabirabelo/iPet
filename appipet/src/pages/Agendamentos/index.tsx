import React, { useCallback } from "react";
import { View, Text, Alert } from "react-native";
import {
  ButtonTab,
  Footer,
  ProfileButton,
  ProviderAvatar,
  ProviderContainer,
  ProviderInfo,
  ProviderMeta,
  ProviderMetaText,
  ProviderName,
} from "../Dashboard/styles";
import { Container, Header, HeaderTitle } from "./styles";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";

import { useAuth } from "../../hooks/auth";

import logo from "../../assets/user.jpg";

const MyAppointments: React.FC = () => {
  const navigation = useNavigation();
  const { signOut, user } = useAuth();

  const teste = useCallback(() => {
    signOut();
  }, []);

  const handleSelectProvider = useCallback(() => {
    navigation.navigate("DetailsAppointment");
  }, [navigation]);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus agendamentos</HeaderTitle>
        <ProfileButton onPress={teste}>
          <Icon name="log-out" size={14} color="#ff9000" />
        </ProfileButton>
      </Header>
      <View>
        <ProviderContainer onPress={handleSelectProvider}>
          <ProviderAvatar source={logo} />
          <ProviderInfo>
            <ProviderName>Gabriela Rabelo</ProviderName>
            <ProviderMeta>
              <Icon name="calendar" size={14} color="#ff9000" />
              <ProviderMetaText>
                Marcado para 15/08/2021 ás 15h
              </ProviderMetaText>
            </ProviderMeta>
            <ProviderMeta>
              <Icon name="dollar-sign" size={14} color="#ff9000" />
              <ProviderMetaText>Valor: R$80,00</ProviderMetaText>
            </ProviderMeta>
            <ProviderMeta>
              <Icon name="activity" size={14} color="#ff9000" />
              <ProviderMetaText>Agendado</ProviderMetaText>
            </ProviderMeta>
          </ProviderInfo>
        </ProviderContainer>
      </View>
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

export default MyAppointments;
