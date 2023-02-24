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
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`

export const CharsDiv = styled.div`
  font-size: 1.2em;
  color: blue;
  outline: 1px dashed gray;
  position: absolute;
`

export const CharSpan = styled.span`
  display: flex;
  transform-origin: center;
  position: relative;
  transform-origin: bottom center;
  margin: 2px;
`
export const TopCircle = styled.div`
  display: grid;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
  position:relative;
  display:grid;
  place-items:center;
  opacity: 0.5;
  transform-origin: bottom center;
`
export const BottomCircle = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
  opacity: 0.5;
  transform-origin: top center;
`
