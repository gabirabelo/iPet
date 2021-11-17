import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiClock, FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { isToday, format, parseISO, isAfter } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import { useAuth } from '../../hooks/AuthContext'

import logo from '../../assets/julio-bernal-BfsCw2ngc6A-unsplash-1-1000x1000.jpg'

import imgLogo from '../../assets/charles-deluvio-oWTW-jNGl9I-unsplash-1-1000x1000.jpg'
import whatsapp from '../../assets/whatsapp.png'

import api from '../../services/api'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
  BoxModal,
  BoxContent,
  BoxContact,
} from './styles'

import Modal from '@mui/material/Modal'

import Divider from '@mui/material/Divider'

import { CSVLink } from 'react-csv'

interface Appointment {
  id: string
  date: string
  hourFormatted: string
  user: {
    name: string
    avatar_url: string
    address_line: string
    postal_code: string
    city: string
    complement?: string
    district: string
    cep: string
    number: string
    email: string
  }
}

interface MonthAvailabilityItem {
  day: number
  available: boolean
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  const [open, setOpen] = useState<any>(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([])
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day)
    }
  }, [])

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => ({
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }))

        setAppointments(appointmentsFormatted)
      })
  }, [selectedDate])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data)
      })
  }, [currentMonth, user.id])

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        return new Date(year, month, monthDay.day)
      })

    return dates
  }, [currentMonth, monthAvailability])

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    })
  }, [selectedDate])

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    })
  }, [selectedDate])

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12
    })
  }, [appointments])

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12
    })
  }, [appointments])

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date())
    )
  }, [appointments])

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const headers = [
    { label: 'Nome', key: 'firstname' },
    { label: 'Endereço', key: 'address' },
    { label: 'Email', key: 'email' },
    { label: 'Data', key: 'date' },
  ]

  const data = [
    { firstname: 'Ahmed', address: 'Tomi', email: 'ah@smthing.co.com' },
    { firstname: 'Ahmed', address: 'Tomi', email: 'ah@smthing.co.com' },
    { firstname: 'Ahmed', address: 'Tomi', email: 'ah@smthing.co.com' },
  ]

  const teste = appointments.map((item) => {
    const data = {
      firstname: item.user.name,
      address: item.user.address_line,
      email: item.user.email,
      date: item.date,
    }

    return data
  })

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            {/* <img src={user.avatar_url} alt={user.name} /> */}
            <img src={logo} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
            {appointments.length ? (
              <span>
                <CSVLink
                  data={teste}
                  headers={headers}
                  filename={format(selectedDate, 'dd/MMMM', {
                    locale: ptBR,
                  })}
                >
                  Exportar agendamentos do dia
                </CSVLink>
              </span>
            ) : null}
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                {/* <img
                                    src={nextAppointment.user.avatar_url}
                                    alt={nextAppointment.user.name}
                                /> */}
                <img src={imgLogo} alt={user.name} />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}
          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  {/* <img
                                        src={appointment.user.avatar_url}
                                        alt={appointment.user.name}
                                    /> */}
                  <img src={imgLogo} alt={user.name} />

                  <strong>{appointment.user.name}</strong>
                  <button>
                    <a
                      href="https://web.whatsapp.com/send?phone=5511996942554"
                      target="_blank"
                    >
                      WhatsApp
                    </a>
                  </button>
                  <button onClick={handleOpen}>Informações</button>
                  <button>Recusar</button>
                </div>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <BoxModal>
                    <h1>
                      Informações de <strong>{appointment.user.name}</strong>
                    </h1>

                    <Divider />

                    <BoxContent>
                      <div>
                        <strong>Nome:</strong>
                        {` ${appointment.user.name}`}
                      </div>
                      <div>
                        <strong>Endereço:</strong>
                        {` ${appointment.user.address_line}, ${appointment.user.number}`}
                      </div>

                      <div>
                        <strong>Bairro:</strong>
                        {` ${appointment.user.district}`}
                      </div>
                      <div>
                        <strong>Cidade:</strong>
                        {` ${appointment.user.city}`}
                      </div>

                      <BoxContact>
                        <div>
                          <p>
                            Contate {` ${appointment.user.name}`} por WhatsApp
                          </p>
                          <a
                            href="https://web.whatsapp.com/send?phone=5511996942554"
                            target="_blank"
                          >
                            <img src={whatsapp} />
                          </a>
                        </div>
                      </BoxContact>
                    </BoxContent>
                  </BoxModal>
                </Modal>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  {/* <img
                                        src={appointment.user.avatar_url}
                                        alt={appointment.user.name}
                                    /> */}
                  <img src={imgLogo} alt={user.name} />

                  <strong>{appointment.user.name}</strong>
                  <button>
                    <a
                      href="https://web.whatsapp.com/send?phone=5511996942554"
                      target="_blank"
                    >
                      WhatsApp
                    </a>
                  </button>
                  <button onClick={handleOpen}>Informações</button>
                  <button>Recusar</button>
                </div>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <BoxModal>
                    <h1>
                      Informações de <strong>{appointment.user.name}</strong>
                    </h1>

                    <Divider />

                    <BoxContent>
                      <div>
                        <strong>Nome:</strong>
                        {` ${appointment.user.name}`}
                      </div>
                      <div>
                        <strong>Endereço:</strong>
                        {` ${appointment.user.address_line}, ${appointment.user.number}`}
                      </div>

                      <div>
                        <strong>Bairro:</strong>
                        {` ${appointment.user.district}`}
                      </div>
                      <div>
                        <strong>Cidade:</strong>
                        {` ${appointment.user.city}`}
                      </div>

                      <BoxContact>
                        <div>
                          <p>
                            Contate {` ${appointment.user.name}`} por WhatsApp
                          </p>
                          <a
                            href="https://web.whatsapp.com/send?phone=5511996942554"
                            target="_blank"
                          >
                            <img src={whatsapp} />
                          </a>
                        </div>
                      </BoxContact>
                    </BoxContent>
                  </BoxModal>
                </Modal>
              </Appointment>
            ))}
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  )
}
export default Dashboard
