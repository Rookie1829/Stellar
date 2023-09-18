import React, { useState, useEffect } from 'react';
import spaceXImage from './images/back.jpg'; 

const Hero = () => {
  const [astronauts, setAstronauts] = useState(null);

  useEffect(() => {

    fetch('http://api.open-notify.org/astros.json')
      .then(response => response.json())
      .then(data => setAstronauts(data.number))
      .catch(error => console.log("Error fetching astronaut data:", error));
  }, []);

  return (
    <div 
      className="bg-center bg-cover h-screen flex items-center justify-start p-4 sm:p-0 relative"
      style={{ backgroundImage: `url(${spaceXImage})` }} 
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="z-60 flex flex-col items-start justify-start space-y-4 pl-4"> 
          <h1 className="text-4xl sm:text-7xl font-bold text-white mb-4 text-left">Stellar</h1>
          <p className="text-2lg sm:text-3xl text-white text-left mb-4">All in one site for space!</p>


          {astronauts && (
            <p className="text-2xl sm:text-3xl text-white mb-4 text-left">
              Astronauts in space right now: {astronauts}
            </p>
          )}

      </div>
    </div>
  );
}

export default Hero;
