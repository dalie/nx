import { render } from '@testing-library/react';
import { App } from './app';

jest.mock('./store/app.state', () => {
  return {
    countryState: jest.fn(),
  };
});
jest.mock('recoil', () => {
  return {
    useRecoilState: jest.fn(),
  };
});
describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });
});
