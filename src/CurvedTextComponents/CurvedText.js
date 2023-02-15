import React, { useMemo } from "react"
import * as Styled from "./Styled"

export const CurvedText = ({ text, arcAngle }) => {
  const charactersArr = text.split("")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const arcTextFn = (index) => {
    const topCircle = document.getElementById("topCircle")
    const topCircleRect = topCircle.getBoundingClientRect()

    const bottomCircle = document.getElementById("bottomCircle")
    const bottomCircleRect = bottomCircle.getBoundingClientRect()

    const textBlock = document.getElementById("textBlock")
    const textBlockRect = textBlock.getBoundingClientRect()

    const letterSpan = textBlock.getElementsByTagName("span")
    const lettersArr = [...letterSpan]

    const firstLetter = lettersArr.find((_, index) => index === 0)
    const lastLetter = lettersArr.find(
      (_, index) => index === lettersArr.length - 1
    )

    const firstLetterRect = firstLetter.getBoundingClientRect()
    const lastLetterRect = lastLetter.getBoundingClientRect()

    const textLength = lastLetterRect.x - firstLetterRect.x
    const radius = textLength / 2

    const textBlockCenterCoords = {
      x: textBlockRect.left + textBlockRect.width / 2,
      y: textBlockRect.top + textBlockRect.height / 2,
    }

    console.log("radius", textBlockCenterCoords)

    const bottomCircleCenterCoords = {
      x: bottomCircleRect.left + bottomCircleRect.width / 2,
      y: bottomCircleRect.top + bottomCircleRect.height / 2,
    }

    const topCircleCenterCoords = {
      x: topCircleRect.left + topCircleRect.width / 2,
      y: topCircleRect.top + topCircleRect.height / 2,
    }

    const lettersCenterCoords = lettersArr.map((letter) => {
      const letterRect = letter.getBoundingClientRect()

      return {
        x: letterRect.x + letterRect.width / 2,
        y: letterRect.y + letterRect.height / 2,
      }
    })

    const letterCenterFromTxtCenter = (letterCenterCoords) => {
      const leftLettersXDistance =
        textBlockCenterCoords.x - letterCenterCoords.x

      const rightLettersXDistance =
        letterCenterCoords.x - textBlockCenterCoords.x

      if (textBlockCenterCoords.x >= letterCenterCoords.x) {
        return leftLettersXDistance
      } else {
        return rightLettersXDistance
      }
    }

    const radiusCenterFromTxtCenter = () => {
      const bottomRadiusStart =
        bottomCircleCenterCoords.y - textBlockCenterCoords.y
      const topRadiusStart = textBlockCenterCoords.y - topCircleCenterCoords.y

      if (arcAngle >= 0) {
        return bottomRadiusStart
      } else {
        return topRadiusStart
      }
    }

    const translateCoords = lettersCenterCoords.map((letterCenterCoords) => {
      const distanceX = letterCenterFromTxtCenter(letterCenterCoords)
      const distanceY = radiusCenterFromTxtCenter()

      //hypotenuse - nerqnadzig
      const hypotenuseDistance = calculateDistance(distanceX, distanceY)
      const pointDistanceFromCircle = pointFromCircle(
        hypotenuseDistance,
        radius
      )

      return {
        x: translateX(pointDistanceFromCircle, distanceX, hypotenuseDistance),
        y: translateY(distanceY, pointDistanceFromCircle, hypotenuseDistance),
      }
    })

    const charCoordsData = translateCoords.filter((_, i) => {
      return i === index
    })

    for (const position of charCoordsData) {
      if (arcAngle >= 0) {
        return `translate(${position.x}px , ${position.y}px) `
      } else {
        return `translate(${position.x}px , ${-position.y}px)`
      }
    }
  }

  // calculate distance between  point to circle center point with Pythagorean equation
  const calculateDistance = (distanceX, distanceY) => {
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
  }

  const pointFromCircle = (distance, radius) => {
    return distance - radius
  }

  const translateY = (
    distanceY,
    pointDistanceFromCircle,
    hypotenuseDistance
  ) => {
    return (distanceY * pointDistanceFromCircle) / hypotenuseDistance
  }

  const translateX = (
    distanceX,
    pointDistanceFromCircle,
    hypotenuseDistance
  ) => {
    return (distanceX * pointDistanceFromCircle) / hypotenuseDistance
  }

  // const radius = 200

  // const w = `${radius}`
  // const h = `${radius}`

  // N - axexi ankyunayin chapn a
  // R - shrjanagci sharavix
  // axexi erkarutyun L = (Pi * R * N) / 180

  //======================================================

  // const rotate = (index) => {
  //   const angleRad = w / (2 * arcAngle)

  //   const angle = (360 * angleRad) / Math.PI / charactersArr.length

  //   // const deltaDegree = L / charactersArr.length
  //   let deg = index * angle - (charactersArr.length * angle) / 2

  //   // deg += deltaDegree

  //   return `rotate(${2 * deg}deg)`
  // }

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
                : `${arcTextFn(index)}`,
          }}
        >
          {char}
        </Styled.CharSpan>
      )),
    [arcAngle, arcTextFn, charactersArr]
  )

  return (
    <Styled.Canvas>
      <Styled.WorkBox
        style={{
          border: "1px solid black",
          position: "relative",
          pointerEvents: "none",
          width: `200px`,
          height: `200px`,
        }}
      >
        <Styled.TopCircle
          style={{
            display: arcAngle > 0 ? `none` : `block`,
            transform: arcAngle > 0 ? `0` : `scale(${-arcAngle * 10})`,
            // width:arcAngle >= 0 ? `0` : `${-arcAngle}px`,
            // height:arcAngle >= 0 ? `0` : `${-arcAngle}px`,
          }}
          id="topCircle"
        ></Styled.TopCircle>

        <Styled.TextBlock id="textBlock">
          <Styled.Span
            style={{
              position: "relative",
              margin: 0,
              display: "flex",
              pointerEvents: "initial",
            }}
          >
            {arcText}
          </Styled.Span>
        </Styled.TextBlock>

        <Styled.BottomCircle
          style={{
            display: arcAngle < 0 ? `none` : `block`,
            transform: arcAngle < 0 ? `0` : `scale(${arcAngle * 10})`,
            // width:arcAngle <= 0 ? `0` : `${arcAngle}px`,
            // height:arcAngle <= 0 ? `0` : `${arcAngle}px`,
          }}
          id="bottomCircle"
        ></Styled.BottomCircle>
      </Styled.WorkBox>
    </Styled.Canvas>
  )
}
