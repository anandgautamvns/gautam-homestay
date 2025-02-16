import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { MenuThemeEntity } from "./page/enum";

interface ThemeContextProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('error')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    localStorage.setItem('theme', `${isDarkMode ? MenuThemeEntity.DARK : MenuThemeEntity.LIGHT}`)
  }, [isDarkMode])

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}