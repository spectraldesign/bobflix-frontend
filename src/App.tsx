import { MantineProvider, createTheme, useMantineColorScheme } from '@mantine/core'
import '@mantine/core/styles.css'
import { createContext, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Profile from './pages/Profile'

export const SearchContext = createContext({} as { search: string, setSearch: (search: string) => void })

function App() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [search, setSearch] = useState('')
  const theme = createTheme({
    colors: {
      dark: [
        '#d5d7e0',
        '#acaebf',
        '#8c8fa3',
        '#666980',
        '#4d4f66',
        '#34354a',
        '#2b2c3d',
        '#1d1e30',
        '#0c0d21',
        '#01010a',
      ]
    },

  });
  return (
    <MantineProvider defaultColorScheme={colorScheme} theme={theme}>
      <Toaster />
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Routes>
      </SearchContext.Provider>
      <Footer colorScheme={colorScheme} setColorScheme={setColorScheme} />
    </MantineProvider>
  )
}

export default App
