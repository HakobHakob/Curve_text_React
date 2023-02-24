import React from 'react';


export const Hero = ({ text, arc, radius }) =>{
    const characters = text.split('');
  
    const degree = 360 / characters.length;
  
    return (
      <h1>
        {characters.map((char, i) => (
          <span
            key={`heading-span-${i}`}
            style={{
              height: `${radius}px`,
              transform: `rotate(${degree * i - arc / 2}deg)`,
              transformOrigin: `0 ${radius}px 0`,
            }}>
            {char}
          </span>
        ))}
      </h1>
    );
}