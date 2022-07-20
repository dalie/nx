import styled from 'styled-components';
import Button from '../button/button';
import { DifficultyLevel, GameMode } from '../difficulty/difficulty';
import Modal from '../modal/modal';
import { calculateStats } from './calculate-stats';
import { useStats } from './use-stats';

/* eslint-disable-next-line */
export interface StatsProps {}

export function Stats(props: StatsProps) {
  const [stats] = useStats();

  const easyChoice = calculateStats(stats, GameMode.GUESS, DifficultyLevel.EASY);
  const normalChoice = calculateStats(stats, GameMode.GUESS, DifficultyLevel.NORMAL);
  const hardChoice = calculateStats(stats, GameMode.GUESS, DifficultyLevel.HARD);

  const easyFind = calculateStats(stats, GameMode.FIND, DifficultyLevel.EASY);
  const normalFind = calculateStats(stats, GameMode.FIND, DifficultyLevel.NORMAL);
  const hardFind = calculateStats(stats, GameMode.FIND, DifficultyLevel.HARD);

  const format = (number: number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  };

  return (
    <Modal>
      <h1>Stats</h1>
      <h2>Best scores</h2>
      <StatsContainer>
        <table>
          <thead>
            <tr>
              <th>Choices</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Easy</td>
              <td>{format(easyChoice)}%</td>
            </tr>
            <tr>
              <td>Normal</td>
              <td>{format(normalChoice)}%</td>
            </tr>
            <tr>
              <td>Hard</td>
              <td>{format(hardChoice)}%</td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Find</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Easy</td>
              <td>{format(easyFind)}%</td>
            </tr>
            <tr>
              <td>Normal</td>
              <td>{format(normalFind)}%</td>
            </tr>
            <tr>
              <td>Hard</td>
              <td>{format(hardFind)}%</td>
            </tr>
          </tbody>
        </table>
      </StatsContainer>
      <Button to="/">Home</Button>
    </Modal>
  );
}

export default Stats;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
