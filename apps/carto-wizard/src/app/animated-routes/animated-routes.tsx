import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PlayFind } from '../play-find/play-find';
import { PlayGuess } from '../play-guess';
import Select from '../select/select';
import Welcome from '../welcome/welcome';

/* eslint-disable-next-line */
export interface AnimatedRoutesProps {}

export function AnimatedRoutes(props: AnimatedRoutesProps) {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/select" element={<Select />} />
        <Route path="/play/guess" element={<PlayGuess />} />
        <Route path="/play/find" element={<PlayFind />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
