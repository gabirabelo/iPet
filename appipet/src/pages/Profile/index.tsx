import React, { useRef, useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Feather";

import { useAuth } from "../../hooks/auth";

import logo from "../../assets/user.jpg";
import api from "../../services/api";
import { Alert, Text, View } from "react-native";
import {
  ButtonTab,
  Container,
  Footer,
  Header,
  HeaderTitle,
  ProfileButton,
  UserName,
} from "../Dashboard/styles";
import Input from "../../components/Input";

import * as Yup from "yup";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import getValidationErrors from "../../utils/getValidationErrors";
import { BoxContainer } from "./styles";

import Button from "../../components/Button";

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
  city: string;
  user_type: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signOut, user } = useAuth();
  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: any) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);

        Alert.alert(
          "Cadastro realizado com sucesso!",
          "Você já pode fazer login na aplicação."
        );

        navigation.goBack();
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          "Erro no cadastro",
          "Ocorreu um erro ao fazer cadastro, tente novamente."
        );
      }
    },
    [navigation]
  );

  const teste = useCallback(() => {
    signOut();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meu Perfil</HeaderTitle>
        <ProfileButton onPress={teste}>
          <Icon name="log-out" size={14} color="#ff9000" />
        </ProfileButton>
      </Header>

      <Form ref={formRef} onSubmit={handleSignUp}>
        <BoxContainer>
          <Input
            autoCapitalize="words"
            name="name"
            icon="user"
            placeholder="Nome"
            returnKeyType="next"
            defaultValue={user.name}
            editable={false}
          />
          <Input
            autoCapitalize="words"
            name="email"
            icon="user"
            placeholder="Nome"
            returnKeyType="next"
            defaultValue={user.email}
            editable={false}
          />

          <HeaderTitle>Endereço</HeaderTitle>
          <BoxContainer>
            <Input
              autoCapitalize="words"
              name="email"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              defaultValue={user.address_line}
              editable={false}
            />
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              defaultValue={user.number}
              editable={false}
            />
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              defaultValue={user.city}
              editable={false}
            />
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              defaultValue={user.state}
              editable={false}
            />
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Complemento"
              returnKeyType="next"
              defaultValue={user.complement}
              editable={false}
            />
            <Button>Realizar mudanças</Button>
          </BoxContainer>
        </BoxContainer>
      </Form>

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

export default Profile;
