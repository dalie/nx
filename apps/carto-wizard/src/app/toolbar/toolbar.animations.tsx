import { keyframes } from 'styled-components';

export const toolbarIn = keyframes`
  0%{
    transform: translateY(-4rem);
  }

  100%{
    transform: translateY(0);
  }
`;

export const toolbarOut = keyframes`
  0%{
    transform:translateY(0);
  }

  100%{
    transform: translateY(-4rem);
  }
`;
