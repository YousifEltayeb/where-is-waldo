// Uncomment this line to use CSS modules
import { ThemeProvider } from './components/ThemeProvider';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Routes>
        <Route index element={<Home />}></Route>
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
