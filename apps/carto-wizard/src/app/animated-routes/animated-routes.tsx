import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import PlayCountries from '../play-countries/play-countries';
import PlayFlags from '../play-flags/play-flags';
import Select from '../select/select';
import Welcome from '../welcome/welcome';

export type PlayParams = {
  mode: 'countries' | 'flags';
};

/* eslint-disable-next-line */
export interface AnimatedRoutesProps {}

export function AnimatedRoutes(props: AnimatedRoutesProps) {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/select" element={<Select />} />
        <Route path="/play/countries" element={<PlayCountries />} />
        <Route path="/play/flags" element={<PlayFlags />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
