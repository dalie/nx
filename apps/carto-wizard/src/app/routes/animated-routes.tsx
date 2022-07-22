import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

import { SettingsPage } from 'app/features/settings';
import { GuessPage } from 'app/features/guess';
import { FindPage } from 'app/features/find';
import { StatsPage } from 'app/features/stats';

/* eslint-disable-next-line */
export interface AnimatedRoutesProps {}

export function AnimatedRoutes(props: AnimatedRoutesProps) {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SettingsPage />} />
        <Route path="/play/guess" element={<GuessPage />} />
        <Route path="/play/find" element={<FindPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
