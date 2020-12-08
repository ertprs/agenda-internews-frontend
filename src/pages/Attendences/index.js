/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react'
import Lottie from 'react-lottie'

import api from '../../services/API'

import { useClientContext } from '../../context/ClientContext'

import Layout from '../../components/layout'
import Search from '../../components/search'
import Button02 from '../../components/buttons/button02'
import SelectOptions from '../../components/select-options'

import LoadingAnimation from '../../assets/loader.json'

import OpenNewAttendence from './OpenNewAttendence'
import RepassAttendence from './RepassAttendence'
import DetailsAttendence from './DetailsAttendence'
import ScheduleAttendence from './ScheduleAttendence'
import CloseAttendence from './CloseAttendence'

import I from '../../utils/Icons'

import { DataInfoOptions, StatusAttendence } from './data'

import * as S from './styles'

const Attendences = () => {
  const [attendenceData, setAttendenceData] = useState([])
  const [totalAttendences, setTotalAttendeces] = useState('')
  const [filtered, setFiltered] = useState([])
  const [searchInput, setSearchInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalDetailsVisible, setModalDetailsVisible] = useState(false)
  const [modalCloseVisible, setModalCloseVisible] = useState(false)
  const [modalScheduledVisible, setModalScheduledVisible] = useState(false)
  const [modalRepassVisible, setModalRepassVisible] = useState(false)
  const [attendenceDataTemp, setAttendenceDataTemp] = useState({})
  const [newAttendenceVisible, setNewAttendenceVisible] = useState(false)
  const { dataClientContext, setDataClientContext } = useClientContext()

  const dateNow = new Date().toISOString()
  const fullDate = new Date(dateNow).toLocaleDateString()

  const userID = localStorage.getItem('user-id')

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation
  }

  useEffect(() => {
    handleCallApi()
  }, [])

  useEffect(() => {
    handleCallApi()
  }, [newAttendenceVisible, modalRepassVisible, modalCloseVisible])

  useEffect(() => {
    handleFilterData()
  }, [searchInput])

  async function handleCallApi() {
    setLoading(false)

    api
      .get('/attendence/index/support', {
        headers: { id_usuario: userID }
      })
      .then(res => {
        setAttendenceData(res.data.attendences)
        setFiltered(res.data.attendences)
        setTotalAttendeces(res.data.count)
      })

    api.get('/clients/index').then(res => {
      setDataClientContext(res.data.clients)
    })

    setLoading(true)
  }

  function handleAttendences() {
    api
      .get('/attendence/index/support', {
        headers: { id_usuario: userID }
      })
      .then(res => {
        setAttendenceData(res.data.attendences)
        setFiltered(res.data.attendences)
        setTotalAttendeces(res.data.count)
      })
  }

  function handleClosedAttendences() {
    api
      .get('/attendence/index/support-closed', {
        headers: { id_usuario: userID }
      })
      .then(res => {
        setAttendenceData(res.data.attendences)
        setFiltered(res.data.attendences)
        setTotalAttendeces(res.data.count)
      })
  }

  function handleFilterData() {
    const dataFiltered = attendenceData.filter(item =>
      item.cliente.razao_social.toLowerCase().includes(searchInput)
    )

    setFiltered(dataFiltered)
  }

  function handleToggleStatusAttendences(type) {
    const dataFiltered = attendenceData.filter(item => item.status.id === type)

    setFiltered(dataFiltered)
  }

  function handlePreviewAttendence(item) {
    setAttendenceDataTemp(item)
    setModalDetailsVisible(!modalDetailsVisible)
  }

  function toggleModalCloseAndDetailsAttendence() {
    setModalCloseVisible(!modalCloseVisible)
    setModalDetailsVisible(!modalDetailsVisible)
  }

  function toggleModalSchuledAndDetailsAttendence() {
    setModalScheduledVisible(!modalScheduledVisible)
    setModalDetailsVisible(!modalDetailsVisible)
  }

  function toggleModalRepassAndDetailsAttedence() {
    setModalRepassVisible(!modalRepassVisible)
    setModalDetailsVisible(!modalDetailsVisible)
  }

  function toggleModalOnRepassedAttendence() {
    setModalRepassVisible(!modalRepassVisible)
  }

  function openAttendence() {
    api
      .put('/attendence/open')
      .then(res => alert(res.statusText))
      .catch(err => alert(err))

    handleCallApi()

    setModalDetailsVisible(!modalDetailsVisible)
  }

  function convertDate(date) {
    const converted = new Date(date)

    const days = converted.toLocaleDateString()
    const hours = converted.toLocaleTimeString()

    const today = new Date()

    const AUX_01 = new Date(today.getTime())
    AUX_01.setDate(today.getDate() - 1)
    const yesterday = AUX_01.toLocaleDateString()

    if (days === fullDate) {
      return `Hoje as ${hours}`
    } else if (days === yesterday) {
      return `Ontem as ${hours}`
    } else {
      return `${days} as ${hours}`
    }
  }

  return (
    <Layout page="Atendimentos">
      <S.Container>
        <S.SubHeader>
          <S.ItemsLeftSubHeader>
            <Button02
              label="Abrir atendimento"
              icon={I.RiAddCircleLine}
              onClick={() => setNewAttendenceVisible(!newAttendenceVisible)}
            />
            <h5>Total de atendimentos: {totalAttendences} </h5>
          </S.ItemsLeftSubHeader>

          <S.ItemsRigthSubHeader>
            <Search onChange={e => setSearchInput(e.target.value)} />
          </S.ItemsRigthSubHeader>
        </S.SubHeader>
        <S.OptionsWraper>
          <S.Button onClick={() => handleAttendences()}>
            <S.Text>Todos</S.Text>
          </S.Button>
          {StatusAttendence.map(item => (
            <SelectOptions
              key={item.id}
              title={item.label}
              handle={() => handleToggleStatusAttendences(item.id)}
            />
          ))}
          <S.Button onClick={() => handleClosedAttendences()}>
            <S.Text>Finalizados</S.Text>
          </S.Button>
        </S.OptionsWraper>
      </S.Container>

      {loading ? (
        attendenceData.length <= 0 ? (
          <S.MainWrapper>
            <h3>Sem registros</h3>
          </S.MainWrapper>
        ) : (
          <S.MainWrapper>
            <S.DataWrapper>
              <S.ProvidersInfo>
                {DataInfoOptions.map(item => (
                  <S.ProvidersInfoText key={item.id}>
                    {item.title}
                  </S.ProvidersInfoText>
                ))}
              </S.ProvidersInfo>
              <S.ScrollArea speed={0.6}>
                {filtered.map(item => (
                  <S.ProvidersListWrapper
                    key={item.id}
                    onClick={() => handlePreviewAttendence(item)}
                  >
                    <S.ProvidersInfoText>
                      {convertDate(item.createdAt)}
                    </S.ProvidersInfoText>
                    <S.ProvidersInfoText>
                      {item.cliente.razao_social}
                    </S.ProvidersInfoText>
                    <S.ProvidersInfoText>
                      {item.nome_solicitante}
                    </S.ProvidersInfoText>
                    <S.ProvidersInfoText>
                      {item.contato_solicitante}
                    </S.ProvidersInfoText>
                    <S.ProvidersInfoText>
                      {item.abertura.descricao}
                    </S.ProvidersInfoText>
                    <S.ProvidersInfoText>
                      {item.status.descricao}
                    </S.ProvidersInfoText>
                  </S.ProvidersListWrapper>
                ))}
              </S.ScrollArea>
            </S.DataWrapper>
          </S.MainWrapper>
        )
      ) : (
        <S.AnimationWrapper>
          <Lottie options={defaultOptions} width="15%" height="15%" />
        </S.AnimationWrapper>
      )}

      <DetailsAttendence
        attendenceDataTemp={attendenceDataTemp}
        modalDetailsVisible={modalDetailsVisible}
        closeModal={() => setModalDetailsVisible(!modalDetailsVisible)}
        openAttendence={() => openAttendence()}
        closeAttendence={() => toggleModalCloseAndDetailsAttendence()}
        scheduleAttendence={() => toggleModalSchuledAndDetailsAttendence()}
        repassAttendence={() => toggleModalRepassAndDetailsAttedence()}
      />

      <CloseAttendence
        modalCloseVisible={modalCloseVisible}
        clientID={attendenceDataTemp.id}
        clientName={
          attendenceDataTemp.cliente && attendenceDataTemp.cliente.razao_social
        }
        closeModal={() => toggleModalCloseAndDetailsAttendence()}
        finish={() => setModalCloseVisible(!modalCloseVisible)}
      />

      <ScheduleAttendence
        modalScheduledVisible={modalScheduledVisible}
        clientName={
          attendenceDataTemp.cliente && attendenceDataTemp.cliente.razao_social
        }
        closeModal={() => toggleModalSchuledAndDetailsAttendence()}
      />

      <RepassAttendence
        modalRepassVisible={modalRepassVisible}
        clientName={
          attendenceDataTemp.cliente && attendenceDataTemp.cliente.razao_social
        }
        attendenceID={attendenceDataTemp.id}
        closeModal={() => toggleModalRepassAndDetailsAttedence()}
        repassed={() => toggleModalOnRepassedAttendence()}
      />

      <OpenNewAttendence
        newAttendenceVisible={newAttendenceVisible}
        cancelable={() => setNewAttendenceVisible(!newAttendenceVisible)}
        dataClient={dataClientContext}
        finish={() => setNewAttendenceVisible(!newAttendenceVisible)}
      />
    </Layout>
  )
}

export default Attendences
