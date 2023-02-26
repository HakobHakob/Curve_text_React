import React, { useCallback, useMemo } from "react"
import * as Styled from "./CurveTxtCSS"

export const Circle = ({ text, arcAngle }) => {
  const charactersArr = text.split("")

  const circleDiameter = () => {
    if (arcAngle === 0) return

    const textBlock = document.getElementById("textBlock")
    const textBlockCSSobj = window.getComputedStyle(textBlock)
    const arcLength = `${parseFloat(textBlockCSSobj.width)}`

    const radius = (arcLength * 180) / (Math.PI * Math.abs(arcAngle))
    const diameter = radius * 2

    return {
      circleDiameter: diameter,
    }
  }
  const diameter = circleDiameter()

  const rotate = useCallback(
    (index) => {
      if (arcAngle === 0) return
      const charsDiv = document.querySelector("#charsDiv")
      const CSSObj = window.getComputedStyle(charsDiv)
      const w = parseFloat(CSSObj.width)

      const radius = (charactersArr.length * 180) / (Math.PI * arcAngle)

      const angleRad = w / (2 * radius)
      const angle = (360 * angleRad) / Math.PI / charactersArr.length
      const deg = index * angle - ((charactersArr.length - 1) * angle) / 2

      return deg
    },
    [arcAngle, charactersArr.length]
  )

  const txtWidth = () => {
    if (arcAngle === 0) return
    const charsDiv = document.querySelector("#charsDiv")
    const CSSObj = window.getComputedStyle(charsDiv)

    return parseFloat(CSSObj.width)
  }

  const w = txtWidth()

  const txtCenter = () => {
    if (arcAngle === 0) return
    const txtBlock = document.getElementById("textBlock")
    const { top, left, width, height } = txtBlock.getBoundingClientRect()

    const X = left + width / 2
    const Y = top + height / 2

    const getTxtBlockCenter = {
      x: X,
      y: Y,
    }

    return getTxtBlockCenter
  }

  const c = txtCenter()

  const arcText = useMemo(
    () =>
      charactersArr.map((char, index) => (
        <Styled.CharSpan
          key={`span-key-${index}`}
          id={index}
          style={{
            display: arcAngle !== 0 ? `flex` : `block`,
            alignItems: arcAngle < 0 ? `flex-end` : arcAngle > 0 ? `flex-start ` : ``,
            position: arcAngle === 0 ? `static` : `absolute`,
           
            height:
              diameter && `${diameter.circleDiameter / charactersArr.length}px`,
            bottom: arcAngle < 0 ? `0` : ``,
            top: arcAngle > 0 ? `0` : ``,
            transformOrigin: arcAngle < 0 ? `top` : arcAngle > 0 ? `bottom ` : ``,
            // transformOrigin: c &&`${c.x}px ${c.y}px`,
            transform:
              arcAngle === 0
                ? `translate(0,0) rotate(0)`
                : `translate(${0}px,${0}px) rotate(${rotate(index)}deg)`,
                // : `${c} rotate(${rotate(index)}deg)`,
          }}
        >
          {char}
        </Styled.CharSpan>
      )),
    [charactersArr, arcAngle, diameter, rotate]
  )

  return (
    <Styled.CurveTextCanvas>
      <Styled.TextBlock id="textBlock">
        <Styled.CharsDiv
          id="charsDiv"
          angle={arcAngle}
          width={charactersArr.length}
          style={{
            // width: circleProps && `${circleProps.w }px`,
            // height: circleProps && `${circleProps.h }px`,
            background: `pink`,
            
          }}
        >
          {arcText}
        </Styled.CharsDiv>
      </Styled.TextBlock>
    </Styled.CurveTextCanvas>
  )
}
