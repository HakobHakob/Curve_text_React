import styled from "styled-components"

export const PropertiesDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid grey;
  border-radius: 10px;
  text-align: center;
  padding: 30px;
  margin: 30px;
`

export const TextInputDiv = styled.div`
  border: 1px solid grey;
  padding: 10px;
`

export const CurveTextCanvas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  overflow: hidden;
  pointer-events: none;
  padding:50px;
  position:static;
`

export const TextBlock = styled.div`
  position:absolute;
  
`

export const CharsDiv = styled.div`
 width: ${({ width }) => width *10}px;
  border-radius: 100%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  
`

export const CharSpan = styled.span`
  width: 0;
  padding:5px;
`
