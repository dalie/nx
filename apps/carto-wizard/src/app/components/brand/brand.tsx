import styled from 'styled-components';

/* eslint-disable-next-line */
export interface BrandProps {}

export function Brand(props: BrandProps) {
  return (
    <StyledDiv>
      <h1>CartoWizard</h1>
    </StyledDiv>
  );
}

export default Brand;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  max-height: 100%;
  h1 {
    font-size: 1.5rem;
    margin: 0;
  }
`;
