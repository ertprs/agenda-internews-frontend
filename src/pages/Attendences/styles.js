import styled from 'styled-components'
import Scroll from 'react-scrollbar'

export const Container = styled.div``
export const SubHeader = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    height: 5vh;
  }
`
export const ItemsLeftSubHeader = styled.div`
  width: 50%;
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    display: none;
  }
`
export const ItemsRigthSubHeader = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 800px) {
    width: 100%;
    display: none;
  }
`
export const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
export const DataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const ScrollArea = styled(Scroll)`
  width: 100%;
  height: 70vh;
  margin-top: 10px;
`
export const ProvidersListWrapper = styled.button`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr 1fr 1fr;
  align-items: center;
  background-color: #fff;
  padding: 5px;
  margin-bottom: 1px;
  text-align: start;

  @media (max-width: 800px) {
    height: 100px;
    grid-template-columns: 1fr;
    border-right: 3px solid
      ${props => (props.statusBorder === 1 ? '#79D279' : '#FFB84D')};
  }
`
export const ProvidersInfo = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr 1fr 1fr;
  align-items: center;

  @media (max-width: 800px) {
    display: none;
  }
`
export const ProvidersInfoText = styled.h6`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;

  @media (max-width: 800px) {
    display: none;
  }
`
export const ProvidersInfoTextMobile = styled(ProvidersInfoText)`
  @media (max-width: 800px) {
    display: block;
    font-size: 14px;
    font-weight: 500;
  }
`
export const ProvidersInfoTextMobileDetails = styled(ProvidersInfoTextMobile)`
  margin-left: 5px;
  font-size: 12px;
  font-weight: 400;
`
export const TextDetailsModal = styled.h4`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 15px;
`
export const ModalContent = styled.div`
  width: 40%;
  height: 50%;
  padding: 0 10px;
  background-color: #fff;
`
export const ModalHeader = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ModalMain = styled.div`
  width: 100%;
  height: 60%;
  padding: 0 10px;
`
export const ModalMainGrid = styled(ModalMain)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px 5px;
`
export const ModalMainGridDuo = styled(ModalMain)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px 5px;
`
export const ModalFooter = styled.div`
  width: 100%;
  height: 20%;
  display: grid;
  align-items: flex-end;
  padding-bottom: 15px;
  grid-template-columns: repeat(4, 1fr);
`
export const ModalFooterDual = styled(ModalFooter)`
  grid-template-columns: repeat(2, 1fr);
`
export const StatusContent = styled.div`
  width: 80px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.status === 'aberto' ? '#79D279' : '#FFB84D'};
`
export const TextStatus = styled.h6`
  font-size: 10px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 500;
`
export const InputSchedule = styled.input`
  width: 45%;
  border: 0;
  outline: none;
  font-size: 14px;
  background-color: #eeeeee;
  padding-left: 5px;
  margin: 10px;
`
export const ModalContentBig = styled(ModalContent)`
  width: 60%;
  height: 70%;
`
export const ModalHeaderBig = styled(ModalHeader)`
  height: 10%;
`
export const ModalMainBig = styled(ModalMain)`
  height: 90%;
  display: flex;
  margin-left: 0;
`
export const ModalFooterBig = styled(ModalFooterDual)`
  height: 10%;
`
export const ModalBigContent = styled.div`
  width: 100%;
`
export const InputNewAttendence = styled(InputSchedule)`
  width: 90%;
  margin: 0;
  font-size: 12px;
`
export const ScrollClients = styled(Scroll)`
  width: 90%;
  height: 90%;
  margin-top: 10px;
`
export const ClientWrapper = styled.button`
  width: 100%;
  height: 30px;
  display: grid;
  grid-template-columns: 0.5fr 3fr;
  align-items: center;
  margin-top: 5px;
  padding: 0 5px;
  background-color: #f1f1f1;
  text-align: start;
`
export const ClientText = styled.h6`
  font-size: 12px;
  font-weight: 400;
  color: #333;
`
export const ClientSelected = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  border-radius: 5px;
  color: #fff;
  text-transform: uppercase;
  background-color: #040e18;
`
export const TextClientSelected = styled.h6`
  font-size: 12px;
  font-weight: 500;
`
export const ItemsRightTop = styled.div`
  height: 90%;
`
export const InputRequesterName = styled(InputSchedule)``
export const AnimationWrapper = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const OptionsWraper = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #d9d9d9;

  @media (max-width: 800px) {
    display: none;
  }
`
export const Button = styled.button`
  background-color: transparent;
  margin: 0 5px;

  color: #797979;

  :hover {
    color: #040e18;
  }
`
export const Text = styled.h6`
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  font-style: italic;
`
export const TextTotalAttendences = styled.h5`
  display: none;

  @media (max-width: 800px) {
    display: block;
    font-size: 16px;
    color: #797979;
    font-style: italic;
    font-weight: 400;
  }
`
