import React, { memo, useMemo } from "react"
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

    const getBottomCircleCenter = {
      x: bottomCircleRect.left + bottomCircleRect.width / 2,
      y: bottomCircleRect.top + bottomCircleRect.height / 2,
    }

    const getLettersCenter = lettersArr.map((letter) => {
      const letterRect = letter.getBoundingClientRect()

      return {
        x: letterRect.x + letterRect.width / 2,
        y: letterRect.y + letterRect.height / 2,
      }
    })

    return {
      getTxtBlockCenter: getTxtBlockCenter,
      getTopCircleCenter: getTopCircleCenter,
      getBottomCircleCenter: getBottomCircleCenter,
      getLettersCenter: getLettersCenter,
    }
  }

  const curveText = (index, R) => {
  
    if (arcAngle === 0) return

    const getTxtBlockCenter = curveTxtData().getTxtBlockCenter
    const getTopCircleCenter = curveTxtData().getTopCircleCenter
    const getBottomCircleCenter =
      curveTxtData().getBottomCircleCenter
    const getLettersCenter = curveTxtData().getLettersCenter

    const letterCenterFromTxtBlockCenter = (letterCenterCoords) => {
      const leftLettersXDistance =
        getTxtBlockCenter.x - letterCenterCoords.x
      const rightLettersXDistance =
        letterCenterCoords.x - getTxtBlockCenter.x

      if (getTxtBlockCenter.x >= letterCenterCoords.x)
        return leftLettersXDistance
      if (getTxtBlockCenter.x < letterCenterCoords.x)
        return rightLettersXDistance
    }

    const circleRadius = (letterCenterCoords) => {
      const bottomCircleRadius =
        getBottomCircleCenter.y - letterCenterCoords.y
      const topCircleRadius = letterCenterCoords.y - getTopCircleCenter.y

      if (getBottomCircleCenter.y >= letterCenterCoords.y)
        return bottomCircleRadius
      if (getBottomCircleCenter.y < letterCenterCoords.y)
        return topCircleRadius
    }

    const translatePositionsData = getLettersCenter.map(
      (letterCenterCoords) => {
        const distanceX = letterCenterFromTxtBlockCenter(letterCenterCoords)
        const distanceY = circleRadius(letterCenterCoords)

        //hypotenuse - nerqnadzig
        const hypotenuseDistance = calculateDistance(distanceX, distanceY)
        const pointDistanceFromCircle = pointFromCircle(
          hypotenuseDistance,
          distanceY
        )

        return {
          x: translateX(distanceX, pointDistanceFromCircle, hypotenuseDistance),
          y: translateY(distanceY, pointDistanceFromCircle, hypotenuseDistance),
          diameter: `${distanceY * 2}`,
        }
      }
    )

    const letterCoordsData = translatePositionsData.filter((_, i) => {
      return i === index
    })

    for (const letterData of letterCoordsData) {
      if (arcAngle > 0)
        return {
          x: `${letterData.x}`,
          y: `${letterData.y}`,
        }
      // `translate(${position.x}px , ${position.y}px) `
      if (arcAngle < 0)
        return {
          x: `${letterData.x}`,
          y: `${-letterData.y}`,
        }
      // `translate(${position.x}px , ${-position.y}px)`
    }
  }

  // calculate distance between  point to circle center point with Pythagorean equation
  const calculateDistance = (distanceX, distanceY) => {
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
  }

  const pointFromCircle = (pointFromCircleCenter, radius) => {
    return pointFromCircleCenter - radius
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

  const circleRad = () => {
    if (arcAngle === 0) return

    const textBlock = document.getElementById("textBlock")
    if (textBlock === null) return
    const textBlockCSSobj = window.getComputedStyle(textBlock)

    if (arcAngle > 0) {
      return {
        width: `${parseFloat(textBlockCSSobj.width) - arcAngle}`,
        height: `${parseFloat(textBlockCSSobj.width) - arcAngle}`,
      }
    }
    if (arcAngle < 0) {
      return {
        width: `${parseFloat(textBlockCSSobj.width) + arcAngle}`,
        height: `${parseFloat(textBlockCSSobj.height) + arcAngle}`,
      }
    }
  }

  const R = circleRad()

  

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
                : `translate(${curveText(index, R).x}px,${
                    curveText(index, R).y
                  }px) rotate(0)`,
          }}
        >
          {char}
        </Styled.CharSpan>
      )),
    [arcAngle, curveText, charactersArr]
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
            width: R !== undefined ? `${R.width}px` : `0`,
            height: R !== undefined ? `${R.width}px` : `0`,
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
            // transform: arcAngle < 0 ? `0` : `scale(${arcAngle * 10})`,
            width: R !== undefined ? `${R.width}px` : `0`,
            height: R !== undefined ? `${R.width}px` : `0`,
          }}
          id="bottomCircle"
        ></Styled.BottomCircle>
      </Styled.WorkBox>
    </Styled.Canvas>
  )
}


//_________________-++++++++++++++++++++++++++++++++++++++++++++++++++


// Circle Properties

  // const circleProperties = () => {
  //   if (arcAngle === 0) return

  //   const textBlock = document.getElementById("textBlock")
  //   if (textBlock === null) return
  //   const textBlockCSSobj = window.getComputedStyle(textBlock)

  //   const W = parseFloat(textBlockCSSobj.width)
  //   const H = parseFloat(textBlockCSSobj.height)

  //   if (arcAngle > 0) {
  //     const circleWidth = `${W - arcAngle}`
  //     const circleHeight = `${H + arcAngle / 2}`

  //     const widthProportion = circleWidth / circleHeight + arcAngle
  //     const heightProportion = circleWidth / circleHeight + arcAngle / 2

  //     return {
  //       w: `${W - widthProportion}`,
  //       h: `${H + heightProportion}`,
  //     }
  //   }
  //   if (arcAngle < 0) {
  //     const circleWidth = `${W + arcAngle}`
  //     const circleHeight = `${H - arcAngle / 2}`

  //     const widthProportion = circleWidth / circleHeight + arcAngle
  //     const heightProportion = circleWidth / circleHeight + arcAngle / 2

  //     // console.log("57", `${W + widthProportion}`)
  //     return {
  //       w: `${W + widthProportion}`,
  //       h: `${H - heightProportion}`,
  //     }
  //   }
  // }

  // const circleProps = circleProperties()
