import { Button, Modal, Toolbar } from 'app/components';
import { DifficultyLevel } from 'app/features/settings';
import { AnswerStat, useStats } from 'app/features/stats';
import { useCountries } from 'app/hooks';
import { Country, difficultySettingsState } from 'app/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { AskCountry } from '../components';

export function GuessPage() {
  const maxBonus = 100;
  const settings = useRecoilValue(difficultySettingsState);

  const { gameMap } = useMap();

  const [attempts, setAttempts] = useState(0);
  const [bonusScore, setBonusScore] = useState(0);
  const [stats, addStat] = useStats();
  const allCountries = useCountries(settings.difficulty);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [guessedAnswers, setGuessedAnswers] = useState<AnswerStat[]>([]);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<Country | null>(null);
  const [finished, setFinished] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setCountryList(
      settings.countryCount
        ? [...allCountries].sort(() => 0.5 - Math.random()).slice(0, settings.countryCount)
        : allCountries
    );
  }, [allCountries, settings.countryCount]);

  const choices = useMemo<Country[]>(() => {
    if (!allCountries?.length || !answer) {
      return [];
    }

    if (settings?.difficulty === DifficultyLevel.NORMAL || settings?.difficulty === DifficultyLevel.HARD) {
      if (answer.borders?.length) {
        const borderingCountries = allCountries.filter((c) => answer.borders.includes(c.code3));

        if (borderingCountries.length < 3) {
          borderingCountries.push(
            ...allCountries
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

    const randomCountries = allCountries
      .filter((c) => c.id !== answer.id && c.borders?.length <= 0)
      .sort(() => 0.5 - Math.random());
    return randomCountries.slice(0, 3);
  }, [allCountries, answer, settings]);

  const nextAnswer = useCallback(() => {
    if (countryList?.length && gameMap) {
      const filteredCountries = countryList.filter((c) => !guessedAnswers.map((g) => g[0]).includes(c.id));
      const country = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];
      if (!country) {
        setGameOver(true);
        addStat({
          answers: guessedAnswers,
          difficulty: settings.difficulty,
          mode: settings.gameMode,
        });
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
  }, [countryList, gameMap, guessedAnswers, addStat, settings]);

  useEffect(() => {
    nextAnswer();
  }, [countryList]);

  const onCorrectAnswer = (newAttempts: number) => {
    setScore((oldValue) => {
      return oldValue + bonusScore;
    });
    setBonusScore(0);

    setGuessedAnswers((oldValue) => {
      return [...oldValue, [answer?.id as number | string, newAttempts]];
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
        totalCountries={countryList?.length ?? 0}
        guessedCountries={guessedAnswers.length + 1}
      />
      {answer !== null && choices !== null && (
        <AskCountry
          hideName={settings?.difficulty === DifficultyLevel.HARD}
          maxBonus={maxBonus}
          hardBonus={settings.difficulty === DifficultyLevel.HARD}
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
            <FinalScore>{(score / (countryList.length * maxBonus)) * 100}%</FinalScore>
          </p>
          <p>
            You scored {score} on a maximum of {countryList.length * maxBonus}.
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
