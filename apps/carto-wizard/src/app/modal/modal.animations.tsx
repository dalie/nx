import { keyframes } from 'styled-components';

export const backdropIn = keyframes`
  0%{
    backdrop-filter: blur(0);
  }

  100%{
    backdrop-filter: blur(10px);
  }
`;

export const backdropOut = keyframes`
  0%{
    backdrop-filter: blur(10px);
  }

  100%{
    backdrop-filter: blur(0);
  }
`;

export const modalIn = keyframes`
  0% {
    transform:translateX(-1500px) skewX(30deg) scaleX(1.3);
  }
  70% {
    transform:translateX(30px) skewX(0deg) scaleX(.9);
  }
  100% {
    transform:translateX(0px) skewX(0deg) scaleX(1);
  }
`;

export const modalOut = keyframes`
  0% {
    transform:translateX(0px) skewX(0deg) scaleX(1);
  }
  30% {
    transform:translateX(-30px) skewX(-5deg) scaleX(.9);
  }
  100% {
    transform:translateX(1500px) skewX(30deg) scaleX(1.3);
  }
`;
