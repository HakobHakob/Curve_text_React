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
  background-color: lightblue;
  overflow:hidden;
  pointer-events: none;
`

export const TextBlock = styled.div`
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
`

export const CharsDiv = styled.div`
  width: ${(({width})=> width * 10)}px;
  height: ${(({width})=> width * 10)}px;
  position: relative;
//   border-radius: 100%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
`

export const CharSpan = styled.span`
  width: 0;
`
//CharsDiv
//display:grid;
//   place-items:center normal;
//==================================

//CHarSpan
//transform-origin: bottom center;
//display: flex;
//align-items:end;
