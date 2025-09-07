import { ThemeProvider } from '../components/ui/ThemeProvider';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Game from './components/Game';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Leaderboard from './components/Leaderboard';

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/:gameName" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
