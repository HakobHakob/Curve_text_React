/* eslint-disable react-hooks/exhaustive-deps */
// calculate distance between  point to circle center point with Pythagorean equation
import React, { useCallback, useEffect, useMemo } from "react"
// import { useEffect } from "react"

import * as Styled from "./Styled"

export const CurvedText = ({ text, arcAngle }) => {
  const charactersArr = text.split("")

  const curveTxtData = () => {
    const topCircle = document.getElementById("topCircle")
    const topCircleRect = topCircle.getBoundingClientRect()

    const bottomCircle = document.getElementById("bottomCircle")
    const bottomCircleRect = bottomCircle.getBoundingClientRect()

    const textBlock = document.getElementById("textBlock")
    const textBlockRect = textBlock.getBoundingClientRect()

    const letterSpan = textBlock.getElementsByTagName("span")
    const lettersArr = [...letterSpan]

    const getTxtBlockCenter = {
      x: textBlockRect.left + textBlockRect.width / 2,
      y: textBlockRect.top + textBlockRect.height / 2,
    }
   

    const getTopCircleCenter = {
      x: topCircleRect.left + topCircleRect.width / 2,
      y: topCircleRect.top + topCircleRect.height / 2,
    }

    console.log("TXT:X",getTopCircleCenter.x)
    console.log("TXT:Y",getTopCircleCenter.y)

    const getBottomCircleCenter = {
      x: bottomCircleRect.left + bottomCircleRect.width / 2,
      y: bottomCircleRect.top + bottomCircleRect.height / 2,
    }

    return {
      getTxtBlockCenter: getTxtBlockCenter,
      charactersArr: lettersArr,
      getTopCircleCenter: getTopCircleCenter,
      getBottomCircleCenter: getBottomCircleCenter,
    }
  }

  const curveText = (index, diameter) => {
    if (arcAngle === 0) return

    const txtCenter = curveTxtData().getTxtBlockCenter
    const lettersArr = curveTxtData().charactersArr
    const topCircleCenter = curveTxtData().getTopCircleCenter
    const bottomCircleCenter = curveTxtData().getBottomCircleCenter

    const getLetterCenter = () => {
      const letter = lettersArr[index]
      const letterRect = letter.getBoundingClientRect()

      return {
        x: letterRect.x + letterRect.width / 2,
        y: letterRect.y + letterRect.height / 2,
      }
    }

    const letterCenter = getLetterCenter()

    const getDistanceX = () => {
      return txtCenter.x - letterCenter.x
    }

    const distanceX = getDistanceX()

    const getDistanceY = () => {
      const topCenterY = txtCenter.y - topCircleCenter.y
      const botoomCenterY = bottomCircleCenter.y - txtCenter.y

      if (arcAngle >= 0) return topCenterY
      if (arcAngle < 0) return botoomCenterY
    }

    const distanceY = getDistanceY()

    // calculate distance between  point to circle center point with Pythagorean equation
    const calculateHypotenuseDistance = () => {
      const a = Math.pow(distanceX, 2)
      const b = Math.pow(distanceY, 2)

      return Math.sqrt(a + b)
    }

    const hypotenuseLength = calculateHypotenuseDistance()

    const pointFromCircle = () => {
      const circleRadius = diameter.circleDiameter / 2

      return hypotenuseLength - circleRadius
    }

    const pointFromCircleDistance = pointFromCircle()

    const translateY = () => {
      return (pointFromCircleDistance * distanceY) / hypotenuseLength
    }
    const yVariation = translateY()

    const translateX = () => {
      return (pointFromCircleDistance * distanceX) / hypotenuseLength
    }
    const xVariation = translateX()

    if (arcAngle > 0) {
      return {
        x: `${xVariation}`,
        y: `${-yVariation}`,
      }
    }

    if (arcAngle < 0) {
      return {
        x: `${xVariation}`,
        y: `${yVariation}`,
      }
    }
  }

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

  // const arc = useCallback(() => {
  //   if (arcAngle === 0) return
  //   const lettersArr = curveTxtData().charactersArr
  //   const radius = (lettersArr.length * 180) / (Math.PI * arcAngle)

  //   return radius
  // }, [arcAngle])

  // const rad = arc()

  const rotate = (index) => {
    if (arcAngle === 0) return
    const charsDiv = document.querySelector("#charsDiv")
    if (charsDiv === null) return

    const CSSObj = window.getComputedStyle(charsDiv)
    const w = parseFloat(CSSObj.width)

    const lettersArr = curveTxtData().charactersArr
    const radius = (lettersArr.length * 180) / (Math.PI * arcAngle)

    const angleRad = w / (2 * radius)
    const angle = (360 * angleRad) / Math.PI / lettersArr.length
    const deg = index * angle - ((lettersArr.length - 1) * angle) / 2
    return -deg
  }

  // useEffect(() => {

  // }, [])

  // useEffect(()=>{
  //   arc()
  // },[arc, arcAngle])

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

      // console.log("57", `${W + widthProportion}`)
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
            transform:
              arcAngle === 0
                ? `translate(0,0) rotate(0)`
                : `translate(${curveText(index, diameter).x}px,${
                    curveText(index, diameter).y
                  }px) rotate(${0}deg)`,
          }}
        >
          {char}
        </Styled.CharSpan>
      )),
    [charactersArr, arcAngle, curveText, diameter]
  )

  return (
    <Styled.CurveTextCanvas>
      <Styled.WorkBox
        style={{
          border: "1px solid black",
          pointerEvents: "none",
          width: `200px`,
          height: `auto`,
        }}
      >
        <Styled.TopCircle
          style={{
            // display: arcAngle <= 0 ? `none` : `block`,
            width: diameter && `${diameter.circleDiameter}px`,
            height: diameter && `${diameter.circleDiameter}px`,
            // transform: `scale(${arcAngle})`,
          }}
          id="topCircle"
        ></Styled.TopCircle>
        <Styled.TextBlock
          id="textBlock"
          style={{
            minWidth: `initial`,
            minHeight: `initial`,
          }}
        >
          <Styled.CharsDiv
            id="charsDiv"
            style={{
              position: "relative",
              margin: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pointerEvents: "initial",
            }}
          >
            {arcText}
          </Styled.CharsDiv>
        </Styled.TextBlock>
        <Styled.BottomCircle
          style={{
            // display: arcAngle >= 0 ? `none` : `block`,
            width: diameter && `${diameter.circleDiameter}px`,
            height: diameter && `${diameter.circleDiameter}px`,
            // transform: `scale(${-arcAngle})`,
          }}
          id="bottomCircle"
        ></Styled.BottomCircle>
      </Styled.WorkBox>
    </Styled.CurveTextCanvas>
  )
}
