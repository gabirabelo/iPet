import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import { FiUser, FiMail, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../hooks/AuthContext'
import { useToast } from '../../hooks/ToastContext'

import logo from '../../assets/julio-bernal-BfsCw2ngc6A-unsplash-1-1000x1000.jpg'

import getValidationErrors from '../../utils/getValidationErrors'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Content, AvatarInput, BoxModal, BoxDay } from './styles'

import Modal from '@mui/material/Modal'

// import ReactCheckboxButton from 'react-checkbox-button'

interface ProfileFormData {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
  number: string
  address_line: string
  district: string
  postal_code: string
  city: string
  state: string
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const history = useHistory()
  const { user, updateUser } = useAuth()
  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string().required('Campo obrigatório'),
          password: Yup.string().when('old_password', {
            is: (value: any) => !value.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (value: any) => !value.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
          postal_code: Yup.string(),
          address_line: Yup.string(),
          district: Yup.string(),
          number: Yup.string(),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
          postal_code,
          address_line,
          district,
          number,
          city,
          state,
        } = data

        const formData = {
          name,
          email,
          postal_code,
          address_line,
          district,
          number,
          city,
          state,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        }

        const response = await api.put('/profile', formData)

        updateUser(response.data)

        history.push('/dashboard')

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'As informações do seu perfil foram atualizadas com sucesso!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente',
        })
      }
    },
    [addToast, history]
  )
  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData()
        data.append('avatar', e.target.files[0])
        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data)
          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          })
        })
      }
    },
    [addToast, updateUser]
  )

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
            postal_code: user?.postal_code,
            address_line: user?.address_line,
            number: user?.number,
            district: user?.district,
            state: user?.state,
            city: user?.city,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} />
            <img src={logo} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Input
            name="postal_code"
            placeholder="CEP"
            containerStyle={{ marginTop: 24 }}
          />
          <Input name="address_line" placeholder="Endereço" />
          <Input name="number" placeholder="Número" />
          <Input name="state" placeholder="Estado" />
          <Input name="city" placeholder="Cidade" />
          <Input name="district" placeholder="Bairro" />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile
