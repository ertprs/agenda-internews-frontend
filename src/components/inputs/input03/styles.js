import styled from 'styled-components'

export const Container = styled.div`
  width: 98%;
  position: relative;
  padding-top: 13px;
`
export const Input = styled.input`
  border: 0;
  outline: none;
  width: 100%;
  height: 40px;
  font-size: 12px;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -webkit-appearance: none;
  border-radius: 0;
  padding-left: 5px;
  background-color: ${props => (props.error ? '#ffe6e6' : '#EEEEEE')};
  border: 1px solid ${props => (props.error ? '#ffcccc' : '#FFFFFF')};
  text-transform: uppercase;

  :focus + label,
  :not(:placeholder-shown) + label {
    font-size: 10px;
    margin-top: 0;
  }
`
export const Label = styled.label`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px 0 0 5px;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  font-weight: 400;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  color: ${props => (props.error ? '#ff6666' : '#333')};
`
