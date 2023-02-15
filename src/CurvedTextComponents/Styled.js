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



export const Canvas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightblue;
`

export const WorkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: yellow;
`

export const TextBlock = styled.div`
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  justify-content: center;
`

export const Span = styled.span`
  font-size: 1.2em;
  color: blue;
  outline: 1px dashed gray;
`

export const CharSpan = styled.span`
  display: flex;
  transform-origin: center;
  margin: 3px;
`
export const TopCircle = styled.div`
  border: 1px solid grey;
  border-radius: 50%;
  opacity: 0.5;
  transform-origin: bottom center;
`
export const BottomCircle = styled.div`
  border: 1px solid grey;
  border-radius: 50%;
  opacity: 0.5;
  transform-origin: top center;
`

