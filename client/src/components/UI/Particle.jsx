import React, {useCallback} from 'react';
// import Particles from 'react-tsparticles';
// import type {Container, Engine} from 'tsparticles-engine';
// import {loadFull} from 'tsparticles';
// import {loadFireworksPreset} from 'tsparticles-preset-fireworks';
// const Particle = () => {
//   const particlesInit = useCallback(async (engine: Engine) => {
//     console.log(engine);

//     // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
//     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
//     // starting from v2 you can add only the features you need reducing the bundle size
//     await loadFireworksPreset(engine);
//   }, []);

//   const particlesLoaded = useCallback(async (container: Container | undefined) => {
//     await console.log(container);
//   }, []);
//   const options = {
//     autoPlay: true,
//     background: {
//       color: {
//         value: '#a9a8a8',
//       },
//       image: '',
//       position: '',
//       repeat: '',
//       size: '',
//       opacity: 1,
//     },
//     // backgroundMask: {
//     //   composite: 'destination-out',
//     //   cover: {
//     //     color: {
//     //       value: '#fff',
//     //     },
//     //     opacity: 1,
//     //   },
//     //   enable: false,
//     // },
//     defaultThemes: {},
//     delay: 0,
//     fullScreen: {
//       enable: true,
//       zIndex: -1,
//     },
//     detectRetina: true,
//     duration: 0,
//     fpsLimit: 120,
//     manualParticles: [],
//     particles: {
//       bounce: {
//         horizontal: {
//           random: {
//             enable: false,
//             minimumValue: 0.1,
//           },
//           value: 1,
//         },
//         vertical: {
//           random: {
//             enable: false,
//             minimumValue: 0.1,
//           },
//           value: 1,
//         },
//       },

//       color: {
//         value: '#adadad',
//         animation: {
//           h: {
//             count: 0,
//             enable: false,
//             offset: 0,
//             speed: 1,
//             decay: 0,
//             sync: true,
//           },
//           s: {
//             count: 0,
//             enable: false,
//             offset: 0,
//             speed: 1,
//             decay: 0,
//             sync: true,
//           },
//           l: {
//             count: 0,
//             enable: false,
//             offset: 0,
//             speed: 1,
//             decay: 0,
//             sync: true,
//           },
//         },
//       },
//       groups: {},

//       number: {
//         density: {
//           enable: false,
//           width: 1920,
//           height: 1080,
//         },
//         limit: 0,
//         value: 0,
//       },
//       opacity: {
//         random: {
//           enable: false,
//           minimumValue: 0.1,
//         },
//         value: 1,
//       },
//       reduceDuplicates: false,
//       shadow: {
//         blur: 0,
//         color: {
//           value: '#000',
//         },
//         enable: false,
//         offset: {
//           x: 0,
//           y: 0,
//         },
//       },
//       shape: {
//         options: {},
//         type: 'line',
//       },
//       size: {
//         random: {
//           enable: false,
//           minimumValue: 1,
//         },
//         value: {
//           min: 0.1,
//           max: 50,
//         },
//         animation: {
//           count: 0,
//           enable: true,
//           speed: 90,
//           decay: 0,
//           sync: true,
//         },
//       },
//       stroke: {
//         width: 1,
//         color: {
//           value: '#848484',
//           animation: {
//             h: {
//               count: 0,
//               enable: false,
//               offset: 0,
//               speed: 1,
//               decay: 0,
//               sync: true,
//             },
//             s: {
//               count: 0,
//               enable: false,
//               offset: 0,
//               speed: 1,
//               decay: 0,
//               sync: true,
//             },
//             l: {
//               count: 0,
//               enable: false,
//               offset: 0,
//               speed: 1,
//               decay: 0,
//               sync: true,
//             },
//           },
//         },
//       },
//       zIndex: {
//         random: {
//           enable: false,
//           minimumValue: 0,
//         },
//         value: 0,
//         opacityRate: 1,
//         sizeRate: 1,
//         velocityRate: 1,
//       },
//       life: {
//         count: 1,
//         delay: {
//           random: {
//             enable: false,
//             minimumValue: 0,
//           },
//           value: 0,
//           sync: false,
//         },
//         duration: {
//           random: {
//             enable: false,
//             minimumValue: 0.0001,
//           },
//           value: 0,
//           sync: false,
//         },
//       },
//       rotate: {
//         random: {
//           enable: false,
//           minimumValue: 0,
//         },
//         value: 0,
//         animation: {
//           enable: false,
//           speed: 0,
//           decay: 0,
//           sync: false,
//         },
//         direction: 'clockwise',
//         path: true,
//       },
//       destroy: {
//         bounds: {},
//         mode: 'split',
//         split: {
//           count: 1,
//           factor: {
//             random: {
//               enable: false,
//               minimumValue: 0,
//             },
//             value: 0.333333,
//           },
//           rate: {
//             random: {
//               enable: false,
//               minimumValue: 0,
//             },
//             value: 100,
//           },
//           sizeOffset: true,
//           particles: {
//             stroke: {
//               width: 0,
//             },
//             color: {
//               value: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'],
//             },
//             number: {
//               value: 0,
//             },
//             collisions: {
//               enable: false,
//             },
//             opacity: {
//               value: {
//                 min: 0.1,
//                 max: 1,
//               },
//               animation: {
//                 enable: true,
//                 speed: 0.7,
//                 sync: false,
//                 startValue: 'max',
//                 destroy: 'min',
//               },
//             },
//             shape: {
//               type: 'circle',
//             },
//             size: {
//               value: {
//                 min: 1,
//                 max: 2,
//               },
//               animation: {
//                 enable: true,
//                 speed: 5,
//                 count: 1,
//                 sync: false,
//                 startValue: 'min',
//                 destroy: 'none',
//               },
//             },
//             life: {
//               count: 1,
//               duration: {
//                 value: {
//                   min: 1,
//                   max: 2,
//                 },
//               },
//             },
//             move: {
//               decay: 0.05,
//               enable: true,
//               gravity: {
//                 enable: true,
//                 inverse: false,
//                 acceleration: 5,
//               },
//               speed: {
//                 min: 5,
//                 max: 10,
//               },
//               direction: 'none',
//               outModes: 'destroy',
//             },
//           },
//         },
//       },
//       roll: {
//         darken: {
//           enable: false,
//           value: 0,
//         },
//         enable: false,
//         enlighten: {
//           enable: false,
//           value: 0,
//         },
//         mode: 'vertical',
//         speed: 25,
//       },
//       tilt: {
//         random: {
//           enable: false,
//           minimumValue: 0,
//         },
//         value: 0,
//         animation: {
//           enable: false,
//           speed: 0,
//           decay: 0,
//           sync: false,
//         },
//         direction: 'clockwise',
//         enable: false,
//       },
//       twinkle: {
//         lines: {
//           enable: false,
//           frequency: 0.05,
//           opacity: 1,
//         },
//         particles: {
//           enable: false,
//           frequency: 0.05,
//           opacity: 1,
//         },
//       },
//       wobble: {
//         distance: 5,
//         enable: false,
//         speed: {
//           angle: 50,
//           move: 10,
//         },
//       },
//       orbit: {
//         animation: {
//           count: 0,
//           enable: false,
//           speed: 1,
//           decay: 0,
//           sync: false,
//         },
//         enable: false,
//         opacity: 1,
//         rotation: {
//           random: {
//             enable: false,
//             minimumValue: 0,
//           },
//           value: 45,
//         },
//         width: 1,
//       },
//       links: {
//         blink: false,
//         color: {
//           value: '#fff',
//         },
//         consent: false,
//         distance: 100,
//         enable: false,
//         frequency: 1,
//         opacity: 1,
//         shadow: {
//           blur: 5,
//           color: {
//             value: '#000',
//           },
//           enable: false,
//         },
//         triangles: {
//           enable: false,
//           frequency: 1,
//         },
//         width: 1,
//         warp: false,
//       },
//       repulse: {
//         random: {
//           enable: false,
//           minimumValue: 0,
//         },
//         value: 0,
//         enabled: false,
//         distance: 1,
//         duration: 1,
//         factor: 1,
//         speed: 1,
//       },
//     },
//     pauseOnBlur: true,
//     pauseOnOutsideViewport: true,

//     smooth: false,

//     zLayers: 100,
//     emitters: {
//       autoPlay: true,
//       fill: true,
//       life: {
//         wait: false,
//         count: 0,
//         delay: 0.1,
//         duration: 0.1,
//       },
//       rate: {
//         quantity: 1,
//         delay: 0.15,
//       },
//       shape: 'square',
//       startCount: 0,
//       size: {
//         mode: 'percent',
//         height: 0,
//         width: 100,
//       },
//       direction: 'top',
//       particles: {},
//       position: {
//         x: 50,
//         y: 100,
//       },
//     },
//   };
//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       loaded={particlesLoaded}
//       options={{
//         preset: 'fireworks',
//       }}
//       // {
//       //   fullScreen: {
//       //     enable: true,
//       //     zIndex: -1,
//       //   },
//       //   background: {
//       //     color: {
//       //       value: '#ffffff',
//       //     },
//       //   },
//       //   fpsLimit: 120,
//       //   interactivity: {
//       //     events: {
//       //       onClick: {
//       //         enable: true,
//       //         mode: 'push',
//       //       },
//       //       onHover: {
//       //         enable: true,
//       //         mode: 'repulse',
//       //       },
//       //       resize: true,
//       //     },
//       //     modes: {
//       //       push: {
//       //         quantity: 4,
//       //       },
//       //       repulse: {
//       //         distance: 200,
//       //         duration: 0.4,
//       //       },
//       //     },
//       //   },
//       //   particles: {
//       //     stroke: {
//       //       width: 0,
//       //     },
//       //     color: {
//       //       value: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'],
//       //     },
//       //     number: {
//       //       value: 0,
//       //     },
//       //     collisions: {
//       //       enable: false,
//       //     },
//       //     opacity: {
//       //       value: {
//       //         min: 0.1,
//       //         max: 1,
//       //       },
//       //       animation: {
//       //         enable: true,
//       //         speed: 0.7,
//       //         sync: false,
//       //         startValue: 'max',
//       //         destroy: 'min',
//       //       },
//       //     },
//       //     shape: {
//       //       type: 'circle',
//       //     },
//       //     size: {
//       //       value: {
//       //         min: 1,
//       //         max: 2,
//       //       },
//       //       animation: {
//       //         enable: true,
//       //         speed: 5,
//       //         count: 1,
//       //         sync: false,
//       //         startValue: 'min',
//       //         destroy: 'none',
//       //       },
//       //     },
//       //     life: {
//       //       count: 1,
//       //       duration: {
//       //         value: {
//       //           min: 1,
//       //           max: 2,
//       //         },
//       //       },
//       //     },
//       //     move: {
//       //       decay: 0.05,
//       //       enable: true,
//       //       gravity: {
//       //         enable: true,
//       //         inverse: false,
//       //         acceleration: 5,
//       //       },
//       //       speed: {
//       //         min: 5,
//       //         max: 10,
//       //       },
//       //       direction: 'none',
//       //       outModes: 'destroy',
//       //     },
//       //   },
//       //   detectRetina: true,
//       // }}
//     />
//     // <Particles id="tsparticles" options={options} init={particlesInit} loaded={particlesLoaded} />
//   );
// };

// export default Particle;

import Particles from 'react-particles';
import {loadFireworksPreset} from 'tsparticles-preset-fireworks';

function fireworks(props) {
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

export default fireworks;
