import { Button, Modal, Toolbar } from 'app/components';
import { AnswerStat, useStats } from 'app/features/stats';
import { useCountries } from 'app/hooks';
import { Country, difficultySettingsState } from 'app/store';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AskFlag } from '../components';

export function FindPage() {
  const settings = useRecoilValue(difficultySettingsState);

  const countries = useCountries(settings.difficulty);
  const [stats, addStat] = useStats();
  const [guessedAnswers, setGuessedAnswers] = useState<AnswerStat[]>([]);

  const [answer, setAnswer] = useState<Country | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [finished, setFinished] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const nextAnswer = useCallback(() => {
    if (countries?.length) {
      const filteredCountries = countries.filter((c) => !guessedAnswers.map((g) => g[0]).includes(c.id));
      const country = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];

      if (!country || (settings.countryCount && guessedAnswers.length > settings.countryCount)) {
        setGameOver(true);
        addStat({
          answers: guessedAnswers,
          difficulty: settings.difficulty,
          mode: settings.gameMode,
        });
      }
      setFinished(false);
      setGiveUp(false);
      setAnswer(country);
    }
  }, [countries, settings, guessedAnswers, addStat]);

  if (!answer && !gameOver) {
    nextAnswer();
  }

  const onCorrectAnswer = (newAttempts: number) => {
    setGuessedAnswers((oldValue) => {
      return [...oldValue, [answer?.id as number | string, newAttempts]];
    });
    setFinished(true);
    setAttempts(newAttempts);
  };

  const onGiveUp = () => {
    setGiveUp(true);
    setFinished(true);
  };
  return (
    <>
      <Toolbar guessedCountries={guessedAnswers.length + 1} totalCountries={countries.length} />
      {answer && !finished && <AskFlag onGiveUp={onGiveUp} onCorrectAnswer={onCorrectAnswer} answer={answer} />}

      {finished && (
        <Modal>
          {giveUp && (
            <>
              <p>Better luck next time!</p>
              <p>You could not find the location of {answer?.name}</p>
            </>
          )}
          {!giveUp && (
            <>
              <p>Congratulatons!</p>
              <p>
                You found the location of {answer?.name}{' '}
                {attempts > 1 ? `in ${attempts} attempts.` : `on your first try!`}
              </p>
            </>
          )}
          <Button onClick={() => nextAnswer()}>Next</Button>
        </Modal>
      )}

      {gameOver && (
        <Modal>
          <p>Congratulations!</p>
          <p>You found all the countries.</p>
          <Button to="/">Home</Button>
        </Modal>
      )}
    </>
  );
}

export default FindPage;
