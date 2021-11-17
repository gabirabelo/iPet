import React, { useRef, useCallback, useState } from "react";
import {
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  Alert,
  Button as ButtonRN,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../services/api";

import Input from "../../components/Input";
import Button from "../../components/Button";
import logoImg from "../../assets/dog.png";
import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  LogoImage,
  Logo,
  BoxButton,
  BoxGeo,
  BoxGeoText,
} from "./styles";

import axios from "axios";

import GeoLocation from "@react-native-community/geolocation";
import { TouchableOpacity } from "react-native-gesture-handler";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  address_line: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const cepInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [address, setAddress] = useState<any>("");
  const [city, setCity] = useState<any>("");
  const [neighborhood, setNeighborhood] = useState<any>("");
  const [uf, setUF] = useState<any>("");

  const [geoLocationAddress, setGeoLocationAddress] = useState<any>("");

  const [latitude, setLatitude] = useState<any>("");
  const [longitude, setLongitude] = useState<any>("");

  // async function searchCEP(cep: any) {
  //   if (cep) {
  //     await axios
  //       .get(`https://viacep.com.br/ws/${cep}/json/`)
  //       .then((response) => {
  //         setAddress(response.data.logradouro);
  //         setCity(response.data.localidade);
  //         setNeighborhood(response.data.bairro);
  //         setUF(response.data.uf);
  //       })
  //       .catch(() => {
  //         console.log("Erro");
  //       });
  //   }
  // }

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("E-mail obrigatório"),
          password: Yup.string().min(6, "No mínimo 6 dígitos"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const record = {
          name: data.name,
          email: data.email,
          password: data.password,
          address_line:
            geoLocationAddress?.results[0].address_components[1].long_name,
          number:
            geoLocationAddress?.results[0].address_components[0].long_name,
          city: geoLocationAddress?.results[0].address_components[3].long_name,
          state: geoLocationAddress?.results[0].address_components[4].long_name,
          user_type: "Usuário",
        };

        await api.post("/users", record);

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

  async function getLocation() {
    GeoLocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.longitude);
        setLongitude(pos.coords.latitude);
      },
      (error) => Alert.alert("Erro", error.message),
      {
        enableHighAccuracy: false,
        timeout: 120000,
        maximumAge: 1000,
      }
    );

    console.log(latitude, longitude);

    const result = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${longitude},${latitude}&key=AIzaSyAsdfX37MRq4XUfA2qNt5vyVYzlp-llA8c`
    );

    const { data } = result;

    setGeoLocationAddress(data);
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            {/* <LogoImage source={logoImg} width={5} /> */}
            <Logo>IPET</Logo>
            <View>
              <Title>Cadastre-se</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  cepInputRef.current?.focus();
                }}
              />

              {/* <Input
                ref={cepInputRef}
                placeholder="CEP"
                returnKeyType="next"
                name="postal_code"
                icon="edit-2"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <BoxButton>
                <ButtonRN
                  title="Buscar endereço"
                  onPress={() =>
                    searchCEP(formRef.current?.getFieldValue("postal_code"))
                  }
                />
              </BoxButton>

              <Text>Ou</Text> */}

              <Input
                placeholder="WhatsApp"
                returnKeyType="next"
                name="phone_number"
                icon="phone"
              />

              <BoxButton>
                <ButtonRN
                  title="Buscar minha localização"
                  onPress={getLocation}
                />
              </BoxButton>

              {geoLocationAddress &&
              geoLocationAddress?.results[0]?.formatted_address ? (
                <BoxGeo>
                  <BoxGeoText>
                    {geoLocationAddress?.results[0]?.formatted_address}
                  </BoxGeoText>
                </BoxGeo>
              ) : null}

              {/* <Input
                placeholder="Complemento"
                returnKeyType="next"
                name="number"
                icon="home"
              />  */}

              <Button onPress={() => formRef.current?.submitForm()}>
                Criar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#ff9000" />
        <BackToSignInText>Voltar para login</BackToSignInText>
      </BackToSignIn> */}
    </>
  );
};
export default SignUp;
