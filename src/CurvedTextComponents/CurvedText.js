import React from "react"
import * as Styled from "./Styled"

export const CurvedText = ({ text, arcAngle }) => {
  const radius = 200

  const w = `${radius}`
  // const h = `${radius}`

  // N - axexi ankyunayin chapn a
  // R - shrjanagci sharavix
  // axexi erkarutyun L = (Pi * R * N) / 180

  const charactersArr = text.split("")

  const rotate = (index) => {
    const angleRad = w / (2 * arcAngle)

    const angle = (360 * angleRad) / Math.PI / charactersArr.length

    // const deltaDegree = L / charactersArr.length
    let deg = index * angle - (charactersArr.length * angle) / 2

    // deg += deltaDegree

    return `rotate(${2 * deg}deg)`
  }

  const translate = () => {
    return `translate(${w / 2}px ,0)`
  }

  return (
    <Styled.TextBox width={charactersArr.length * 50} height={arcAngle}>
      {charactersArr.map((char, index) => (
        <Styled.Span
          key={`span-key-${index}`}
          style={{
            height: `${arcAngle}px`,
            transform: `${translate()}  ${rotate(index)}`,
            transformOrigin: `bottom `,
          }}
        >
          {char}
        </Styled.Span>
      ))}
    </Styled.TextBox>
  )
}
