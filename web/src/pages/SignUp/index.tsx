import React, { useCallback, useRef, useState } from 'react'
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import { useToast } from '../../hooks/ToastContext'

import getValidationErrors from '../../utils/getValidationErrors'

import {
  Container,
  Content,
  Background,
  AnimationContainer,
  BoxInitial,
  Title,
  BoxAddress,
} from './styles'

// Assets
import logo from '../../assets/dog.svg'

import axios from 'axios'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const [address, setAddress] = useState<any>('')
  const [city, setCity] = useState<any>('')
  const [neighborhood, setNeighborhood] = useState<any>('')
  const [uf, setUF] = useState<any>('')

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          address_line: Yup.string().required('Endeço obrigatório'),
          number: Yup.string().required('Numero obrigátorio'),
          postal_code: Yup.string().required('CEP obrigátorio'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/users', data)
        history.push('/')

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        })
      }
    },
    [addToast, history]
  )

  async function searchCEP(cep: any) {
    if (cep) {
      await axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          setAddress(response.data.logradouro)
          setCity(response.data.localidade)
          setNeighborhood(response.data.bairro)
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'CEP não encontrado',
            description: 'Digite um CEP valido',
          })
        })
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        <BoxInitial>
          {/* <img src={logo} /> */}
          <h1>iPet</h1>
        </BoxInitial>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Title>Cadastre-se</Title>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input name="phone_number" placeholder="Telefone" />
            <Input name="pix" placeholder="Chave do Pix" />
            <Input name="price" placeholder="Valor da consulta" />

            <BoxAddress>
              <Input name="postal_code" placeholder="CEP" />
              <div>
                <Button
                  onClick={() =>
                    searchCEP(formRef.current?.getFieldValue('postal_code'))
                  }
                >
                  Buscar endereço
                </Button>
              </div>
            </BoxAddress>
            <Input
              name="address_line"
              placeholder="Endereço"
              value={address}
              disabled
            />
            <Input name="city" placeholder="Cidade" value={city} disabled />
            <Input
              name="district"
              placeholder="Bairro"
              value={neighborhood}
              disabled
            />
            <Input name="number" placeholder="Numero" />
            <Input name="complement" placeholder="Complemento" />
            <Input
              name="user_type"
              placeholder="Tipo"
              value="Veterinário"
              disabled
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
