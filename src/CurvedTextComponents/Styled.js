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

export const TextBox = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: yellow;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  bottom: 0;
`

export const Span = styled.span`
  font-size: 1.2em;
  color: blue;
  width: 0;
  outline: 1px dashed gray;
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

export const SpanOne = styled.span`
  display: flex;
  transform-origin: center ;
  margin:5px;
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

//  outline: 1px dashed gray;
//  border-radius: 100%;
// display: flex;
// justify-content: center;
// align-items: center;

// position: absolute;

// width: ${(props) =>  props.width}px;
// height: ${(props) => props.height}px;

// display: grid;
// place-items: center;
