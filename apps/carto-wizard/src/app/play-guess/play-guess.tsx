import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Country, difficultySettingsState } from '../app.state';
import Button from '../button/button';
import { DifficultyLevel } from '../difficulty/difficulty';
import Modal from '../modal/modal';
import Toolbar from '../toolbar/toolbar';
import useCountries from '../use-countries/use-countries';
import AskCountry from './ask-country/ask-country';

/* eslint-disable-next-line */
export interface PlayGuessProps {}

export function PlayGuess(props: PlayGuessProps) {
  const maxBonus = 100;
  const settings = useRecoilValue(difficultySettingsState);

  const { gameMap } = useMap();

  const [attempts, setAttempts] = useState(0);
  const [bonusScore, setBonusScore] = useState(0);
  const countries = useCountries(settings.difficulty);
  const [guessedCountries, setGuessedCountries] = useState<Country[]>([]);

  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<Country | null>(null);
  const [finished, setFinished] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const choices = useMemo<Country[]>(() => {
    if (!countries?.length || !answer) {
      return [];
    }

    if (settings?.difficulty === DifficultyLevel.NORMAL || settings?.difficulty === DifficultyLevel.HARD) {
      if (answer.borders?.length) {
        const borderingCountries = countries.filter((c) => answer.borders.includes(c.code3));

        if (borderingCountries.length < 3) {
          borderingCountries.push(
            ...countries
              .filter((c) => c.id !== answer.id && !answer.borders.includes(c.code3))
              .sort(() => 0.5 - Math.random())
          );
        }

        return borderingCountries
          .filter((c) => c.id !== answer.id)
          .slice(0, 3)
          .sort(() => 0.5 - Math.random());
      }
    }

    const randomCountries = countries
      .filter((c) => c.id !== answer.id && c.borders?.length <= 0)
      .sort(() => 0.5 - Math.random());
    return randomCountries.slice(0, 3);
  }, [countries, answer, settings]);

  const nextAnswer = useCallback(() => {
    if (countries?.length && gameMap) {
      const filteredCountries = countries.filter((c) => !guessedCountries.map((g) => g.id).includes(c.id));
      const country = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];
      if (!country) {
        setGameOver(true);
        return;
      }

      setFinished(false);
      setBonusScore(maxBonus);
      setAnswer((oldAnswer) => {
        if (oldAnswer) {
          gameMap.setFeatureState(
            { id: oldAnswer.id, source: 'countries_source', sourceLayer: 'processed' },
            { hover: false }
          );
        }

        return country;
      });
    }
  }, [countries, gameMap, guessedCountries]);

  useEffect(() => {
    nextAnswer();
  }, [countries]);

  useEffect(() => {
    if (answer && gameMap) {
      gameMap.fitBounds([answer.bounds.sw, answer.bounds.ne], {
        duration: 2000,
        padding: {
          bottom: 300,
          left: 150,
          right: 150,
          top: 150,
        },
      });

      setTimeout(() => {
        gameMap.setFeatureState(
          { id: answer.id, source: 'countries_source', sourceLayer: 'processed' },
          { hover: true }
        );
      }, 1750);
    }

    return () => {
      if (gameMap && answer) {
        gameMap.setFeatureState(
          { id: answer.id, source: 'countries_source', sourceLayer: 'processed' },
          { hover: false }
        );
      }
    };
  }, [answer, gameMap]);

  const onCorrectAnswer = (newAttempts: number) => {
    setScore((oldValue) => {
      return oldValue + bonusScore;
    });
    setBonusScore(0);

    setGuessedCountries((oldValue) => {
      return [...oldValue, answer as Country];
    });

    setFinished(true);
    setAttempts(newAttempts);
  };

  const onBonusScore = (b: number) => {
    setBonusScore(b);
  };

  return (
    <>
      <Toolbar
        score={score}
        bonusScore={bonusScore}
        totalCountries={countries?.length ?? 0}
        guessedCountries={guessedCountries.length + 1}
      />
      {answer !== null && choices !== null && (
        <AskCountry
          hideName={settings?.difficulty === DifficultyLevel.HARD}
          maxBonus={maxBonus}
          onBonusScore={(b) => onBonusScore(b)}
          onCorrectAnswer={onCorrectAnswer}
          answer={answer}
          choices={choices}
        />
      )}

      {finished && (
        <Modal blur={0}>
          <p>Congratulations!</p>
          <p>The correct answer was {answer?.name}</p>
          <p>You found it {attempts > 1 ? `in ${attempts} attempts.` : `on your first try!`}</p>
          <Button onClick={() => nextAnswer()}>Next</Button>
        </Modal>
      )}

      {gameOver && (
        <Modal>
          <p>Congratulations!</p>
          <p>
            You scored <FinalScore>{score}</FinalScore> on a maximum of {countries.length * maxBonus}.
          </p>
          <Button to="/">Home</Button>
        </Modal>
      )}
    </>
  );
}

const FinalScore = styled.span`
  font-size: 4rem;
  font-weight: 700;
`;
