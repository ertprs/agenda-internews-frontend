/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react'

import api from '../../../services/API'

import Modal from '../../../components/modal'
import Button01 from '../../../components/buttons/button01'
import CheckBox from '../../../components/inputs/checkbox'
import Radio from '../../../components/inputs/radio'

import I from '../../../utils/Icons'

import * as S from './styles'

const OpenNewAttendence = ({
  newAttendenceVisible,
  cancelable,
  dataClient,
  finish
}) => {
  const [searchInput, setSearchInput] = useState(false)
  const [filtered, setFiltered] = useState([])
  const [clientSelected, setClientSelected] = useState('')
  const [selected, setSelected] = useState(false)
  const [reasonOpening, setReasonOpening] = useState([])
  // const [otherAttendences, setOtherAttendences] = useState([])
  const [idAbertura, setIdAbertura] = useState()
  const [clientNotRequested, setClientNotRequested] = useState(true)
  const [requestedName, setRequestedName] = useState('')
  const [requestedContact, setRequestedContact] = useState('')
  const userID = localStorage.getItem('user-id')
  const sectorID = localStorage.getItem('user-sector-id')
  const supportID = localStorage.getItem('support-id')

  useEffect(() => {
    handleData()
    handleCallApi()
  }, [])

  useEffect(() => {
    handleFilterData()
  }, [searchInput])

  // useEffect(() => {
  //   handleAttendencesOpening()
  // }, [selected])

  function handleCallApi() {
    api.get('/reasons/opening/index').then(res => setReasonOpening(res.data))
  }

  function handleData() {
    setFiltered(dataClient)
  }

  function handleFilterData() {
    const dataFiltered = dataClient.filter(item =>
      item.razao_social.toLowerCase().includes(searchInput)
    )

    setFiltered(dataFiltered)
  }

  // function handleAttendencesOpening() {
  //   api.get(`/attendence/index/client/${clientSelected.id}`).then(res => {
  //     setOtherAttendences(res.data)
  //     console.log(res.data)
  //   })
  // }

  function handleSelectClient(item) {
    setSelected(!selected)
    setClientSelected(item)
  }

  function handleInputRadio(e) {
    setIdAbertura(e.target.value)
  }

  function handleNewAttendence() {
    if (!selected) return alert('Selecione um cliente!')

    if (!idAbertura) return alert('Selecione um motivo!')

    if (clientNotRequested && requestedName.length <= 2) {
      return alert('Informe o nome do solicitante!')
    } else {
      api
        .post('/attendence/update/create', {
          nome_solicitante: clientNotRequested
            ? requestedName
            : 'sem solicitante',
          contato_solicitante:
            requestedContact.length <= 4 ? 'sem contato' : requestedContact,
          cliente_solicitou: clientNotRequested,
          reagendado: false,
          data_agendamento: null,
          hora_agendamento: '',
          id_status: supportID === 'null' ? 2 : 1,
          id_cliente: clientSelected.id,
          id_usuario: userID,
          id_abertura: idAbertura,
          id_fechamento: null,
          // eslint-disable-next-line no-unneeded-ternary
          id_suporte:
            supportID === 'null' ? clientSelected.id_suporte : supportID,
          id_setor: sectorID
        })
        .then(res => {
          alert(res.data.mensage)
          finish()
        })
        .catch(err => {
          alert(err)
          return console.log(err)
        })

      setSelected(false)
      setClientSelected(null)
      setRequestedName('')
      setRequestedContact('')
    }
  }

  return (
    <Modal visible={newAttendenceVisible}>
      <S.ModalWrapper>
        <S.ModalHeaderBig>
          <S.TitleCard>Novo atendimento</S.TitleCard>
          <I.RiCloseLine cursor="pointer" size={24} onClick={cancelable} />
        </S.ModalHeaderBig>
        <S.MainWrapper>
          {selected ? (
            <S.LeftWrapper>
              <S.ClientSelected>
                <S.TextClientSelected>
                  {clientSelected.razao_social}
                </S.TextClientSelected>
                <I.RiCloseLine
                  cursor="pointer"
                  onClick={() => setSelected(!selected)}
                />
              </S.ClientSelected>
              {/* <S.ScrollClients>
                <S.TextClientSelected>
                  Outros atendimentos abertos
                </S.TextClientSelected>
                {otherAttendences.length >= 1 &&
                  otherAttendences.map(item => (
                    <S.ClientWrapper key={item.id}>
                      <S.ClientText> Outros atendimentos </S.ClientText>
                      <S.ClientText> </S.ClientText>
                    </S.ClientWrapper>
                  ))}
              </S.ScrollClients> */}
            </S.LeftWrapper>
          ) : (
            <S.LeftWrapper>
              <S.InputNewAttendence
                placeholder="Cliente"
                onChange={e => setSearchInput(e.target.value)}
              />
              <S.ScrollClients>
                {filtered.map(item => (
                  <S.ClientWrapper
                    key={item.id}
                    onClick={() => handleSelectClient(item)}
                  >
                    <S.ClientText> {item.identificador_servidor} </S.ClientText>
                    <S.ClientText> {item.razao_social} </S.ClientText>
                  </S.ClientWrapper>
                ))}
              </S.ScrollClients>
            </S.LeftWrapper>
          )}
          <S.RightWrapper selected={selected}>
            <S.ItemsRightTop>
              <S.TextClientSelected>Solicitante</S.TextClientSelected>
              <S.RequestWrapper>
                <CheckBox
                  label="Sem solicitante"
                  onChange={() => setClientNotRequested(!clientNotRequested)}
                />
              </S.RequestWrapper>
              {clientNotRequested && (
                <S.RequestWrapper>
                  <S.InputRequesterName
                    placeholder="Nome*"
                    onChange={e => setRequestedName(e.target.value)}
                  />
                  <S.InputRequesterName
                    placeholder="Contato"
                    type="number"
                    onChange={e => setRequestedContact(e.target.value)}
                  />
                </S.RequestWrapper>
              )}

              <S.TextClientSelected>Selecione um motivo</S.TextClientSelected>
              <S.ScrollReasons>
                <form onChange={handleInputRadio}>
                  <S.MainGrid>
                    {reasonOpening.map(item => (
                      <Radio
                        key={item.id}
                        name="id_abertura"
                        label={item.descricao}
                        id={item.id}
                        value={item.id}
                      />
                    ))}
                  </S.MainGrid>
                </form>
              </S.ScrollReasons>
            </S.ItemsRightTop>

            <S.ModalFooter>
              <Button01
                label="Confirmar"
                bgColor="#79D279"
                onClick={() => handleNewAttendence()}
              />
              <Button01
                label="Cancelar"
                bgColor="#FF6666"
                onClick={cancelable}
              />
            </S.ModalFooter>
          </S.RightWrapper>
        </S.MainWrapper>
      </S.ModalWrapper>
    </Modal>
  )
}

export default OpenNewAttendence
