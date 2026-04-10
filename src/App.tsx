import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import SplashPage from './components/SplashPage/SplashPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SplashPage />
    </ThemeProvider>
  );
}

export default App;
