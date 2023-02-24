import React, { useCallback, useMemo } from "react"
import * as Styled from "./CircleCSS"

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
      const deg = index * angle - ((charactersArr.length - 2) * angle) / 2

      return deg
    },
    [arcAngle, charactersArr.length]
  )

  const width = () => {
    if (arcAngle === 0) return
    const charsDiv = document.querySelector("#charsDiv")
    const CSSObj = window.getComputedStyle(charsDiv)
    const w = parseFloat(CSSObj.width)

    return w
  }

  const wid = width()

  const circleProperties = () => {
    if (arcAngle === 0) return

    const textBlock = document.getElementById("textBlock")
    if (textBlock === null) return
    const textBlockCSSobj = window.getComputedStyle(textBlock)

    const W = parseFloat(textBlockCSSobj.width)
    const H = parseFloat(textBlockCSSobj.height)

    if (arcAngle > 0) {
      const circleWidth = `${W - arcAngle}`
      const circleHeight = `${H + arcAngle / 2}`

      const widthProportion = circleWidth / circleHeight + arcAngle
      const heightProportion = circleWidth / circleHeight + arcAngle / 2

      return {
        w: `${W - widthProportion}`,
        h: `${H + heightProportion}`,
      }
    }
    if (arcAngle < 0) {
      const circleWidth = `${W + arcAngle}`
      const circleHeight = `${H - arcAngle / 2}`

      const widthProportion = circleWidth / circleHeight + arcAngle
      const heightProportion = circleWidth / circleHeight + arcAngle / 2

      return {
        w: `${W + widthProportion}`,
        h: `${H - heightProportion}`,
      }
    }
  }

  const circleProps = circleProperties()

  const arcText = useMemo(
    () =>
      charactersArr.map((char, index) => (
        <Styled.CharSpan
          key={`span-key-${index}`}
          id={index}
          style={{
            display:(arcAngle < 0) ? `flex`:`block`,
            alignItems:(arcAngle < 0) ? `end`:``,
            position: "absolute",
            height:
              diameter && `${diameter.circleDiameter / charactersArr.length}px`,
            // bottom@ durs a galis
            bottom: (arcAngle < 0) ? `0` : ``,
            transformOrigin:  (arcAngle < 0) ? `top`:(arcAngle > 0)?`bottom `:``,
            transform:
              arcAngle === 0
                ? `translate(0,0) rotate(0)`
                : `translate(${wid / 2}px,${0}px) rotate(${rotate(index)}deg)`,
          }}
        >
          {char}
        </Styled.CharSpan>
      )),
    [charactersArr, diameter, arcAngle, wid, rotate]
  )

  return (
    <Styled.CurveTextCanvas>
      <Styled.TextBlock
        id="textBlock"
        style={{
          minWidth: arcAngle === 0 ? `initial` : `${wid}px`,
          // minHeight: arcAngle === 0? `initial`:`${hei}px`,
        }}
      >
        <Styled.CharsDiv
          id="charsDiv"
          width={charactersArr.length}
          style={{
            // width: circleProps && `${circleProps.w }px`,
            // height: circleProps && `${circleProps.h }px`,
            display: (arcAngle !== 0) ?  `flex` : `inline-block`,
            background: `pink`,
          }}
        >
          {arcText}
        </Styled.CharsDiv>
      </Styled.TextBlock>
    </Styled.CurveTextCanvas>
  )
}
