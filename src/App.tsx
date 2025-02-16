import React, { lazy, Suspense } from 'react'
import './App.css'
import "./assets/styles/theme.scss";
import { ThemeProvider } from './themeContext';
const Page = lazy(() => import('./page'))

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Suspense fallback={'loading'}>
        <Page />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
