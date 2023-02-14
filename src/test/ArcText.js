import React, { useMemo } from "react"

// import * as Styled from "./Styled"

export const ArcText = ({ text, arcAngle }) => {
  const width = 400
  // const height = 400
  const upsideDown = false // bottom text
  // let characterWidth = 5
  let initRadius = 200

  const characters = text.split("")

  // const [arc, degree] = useMemo(() => {
  //   const arc = characters.length * characterWidth
  //   const degree = arc / characters.length

  //   return [arc, degree]
  // }, [characters.length, characterWidth])

  const radius = initRadius ? initRadius : width / 2

  const arcText = useMemo(
    () =>
      characters.map((letter, index) => (
        <span
          key={index}
          className="character"
          style={{
            position: "absolute",
            height: `${radius}px`,
            // transform: ` translate(${0}px, ${0}px) rotate(${
            //   degree * index - arc / 2
            // }deg)`,
            // transformOrigin: `${0}px ${radius}px`,
          }}
        >
          {!upsideDown ? (
            letter
          ) : (
            <span
              style={{
                display: "inline-block",
                transform: "rotateX(180deg)",
              }}
            >
              {letter}
            </span>
          )}
        </span>
      )),
    [radius, characters, upsideDown]
  )

  return (
    <div
      style={{
        border: "1px solid black",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        width: radius * 2,
        height: radius * 2,
        transform: !upsideDown ? "unset" : "rotateX(180deg)",
      }}
    >
      <div
      // style={{
      //   position: "absolute",
      //   top: 0,
      // }}
      >
        <span
          style={{
            position: "relative",
            margin: 0,
            display: "block",
            pointerEvents: "initial",
          }}
        >
          {arcText}
        </span>
      </div>
    </div>
  )
}
