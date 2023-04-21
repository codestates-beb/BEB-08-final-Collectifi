import Particles from 'react-particles';
import {loadFireworksPreset} from 'tsparticles-preset-fireworks';
import React, {useCallback} from 'react';

function Fireworks(props) {
  // this customizes the component tsParticles installation
  const customInit = async engine => {
    // this adds the preset to tsParticles, you can safely use the
    await loadFireworksPreset(engine);
  };

  const options = {
    preset: 'fireworks',
  };

  return <Particles options={options} init={customInit} />;
}

export default Fireworks;
