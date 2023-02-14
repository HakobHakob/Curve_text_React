import React, { useState } from "react"
// import { ArcText } from "../test/ArcText"
// import { CurvedText } from "./CurvedText"
import { CurvedTextOne } from "./CurvedTextOne"

import * as Styled from "./Styled"

export const Heading = () => {
  const [text, setText] = useState("")
  const [arcAngle, setArcAngle] = useState(0)
  // const [radius, setRadius] = useState(0)

  return (
    <>
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
            type="range"
            value={arcAngle}
            step="1"
            min="-10"
            max="10"
            onChange={(event) => setArcAngle(event.target.value)}
          />
          {arcAngle  }
        </Styled.TextInputDiv>

        {/* <Styled.TextInputDiv>
          <h4>Text Radius</h4>
          <input
            type="range"
            value={radius}
            step="10"
            min="100"
            max="5000"
            onChange={(event) => setRadius(event.target.value)}
          />
          {radius}
        </Styled.TextInputDiv> */}
      </Styled.PropertiesDiv>
      {/* <CurvedText text="My text" arcAngle={parseInt(arcAngle)} /> */}

      <CurvedTextOne
        text="My text "
        arcAngle={parseInt(arcAngle)}
      ></CurvedTextOne>
      {/* <ArcText text = "My text is!" arcAngle={parseInt(arcAngle)}/> */}
    </>
  )
}
