import React, { useState } from "react"
import { Circle } from "./Circle"

import * as Styled from "./CurveTxtCSS"

export const Heading = () => {
  const [text, setText] = useState("")
  const [arcAngle, setArcAngle] = useState(0)
  // const [radius, setRadius] = useState(0)

  return (
    <div className="wrapper">
      <Styled.PropertiesDiv>
        <Styled.TextInputDiv>
          <h4>Write text</h4>
          <input
            type="text"
            value={text}
            onChange={(event) => {
              setText(event.target.value)
            }}
          />
        </Styled.TextInputDiv>

        <Styled.TextInputDiv>
          <h4>Text arc</h4>
          <input
            type="number"
            value={arcAngle}
            step="1"
            min="-100"
            max="100"
            onChange={(event) => setArcAngle(event.target.value)}
          />
        </Styled.TextInputDiv>

        
      </Styled.PropertiesDiv>

      <Circle text={text} arcAngle={parseInt(arcAngle)} />
    </div>
  )
}
