import React, { useCallback } from "react";
import { View, Text, Alert, Button, Linking } from "react-native";
import { ButtonTab, Footer, ProfileButton } from "../Dashboard/styles";
import {
  Box,
  BoxButton,
  BoxText,
  Container,
  Header,
  HeaderTitle,
  ProviderAvatar,
  ProviderAvatarWhats,
  TextCustom,
} from "./styles";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";

import { useAuth } from "../../hooks/auth";

import logo from "../../assets/user.jpg";

import logowhats from "../../assets/whatsapp.png";

const DetailsAppointment: React.FC = () => {
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
        <HeaderTitle>Detalhes do Veterinário</HeaderTitle>
        <ProfileButton onPress={teste}>
          <Icon name="log-out" size={14} color="#ff9000" />
        </ProfileButton>
      </Header>
      <Box>
        <ProviderAvatar source={logo} />

        <BoxText>
          <TextCustom>Nome: Gabriela Rabelo</TextCustom>
          <TextCustom>Email: gabirrabelo@gmail.com</TextCustom>
          <TextCustom>Celular: 11979656268</TextCustom>
          <TextCustom>Valor: R$ 80,00</TextCustom>
        </BoxText>

        <BoxButton>
          <Button
            title="Pagar consulta via pix"
            onPress={() => Alert.alert("Codigo Copia e Cola: ")}
            color="green"
          />
          <Button
            title="Cancelar consulta"
            onPress={() => Alert.alert("Cancelado")}
            color="red"
          />
        </BoxButton>

        <Text
          onPress={() =>
            Linking.canOpenURL("whatsapp://send?text=oi").then((supported) => {
              if (supported) {
                return Linking.openURL(
                  "whatsapp://send?phone=5511958523593&text=Oi"
                );
              } else {
                return Linking.openURL(
                  "https://api.whatsapp.com/send?phone=5511958523593&text=Oi"
                );
              }
            })
          }
        ></Text>
        <ProviderAvatarWhats source={logowhats} />
      </Box>
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

export default DetailsAppointment;
