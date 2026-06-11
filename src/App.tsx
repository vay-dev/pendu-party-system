import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideNav } from './components/SlideNav';
import Overview from './pages/Overview';
import WhyRebuild from './pages/WhyRebuild';
import Plan from './pages/Plan';
import GroupDetail from './pages/GroupDetail';
import Stack from './pages/Stack';
import Parked from './pages/Parked';
import LiveProgress from './pages/LiveProgress';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="mx-auto max-w-4xl px-4 pt-6"
      >
        <Routes location={location}>
          <Route path="/" element={<Overview />} />
          <Route path="/why" element={<WhyRebuild />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/group/:id" element={<GroupDetail />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/parked" element={<Parked />} />
          <Route path="/progress" element={<LiveProgress />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <AnimatedRoutes />
        <SlideNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
