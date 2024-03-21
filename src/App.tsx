import { MantineProvider, createTheme, useMantineColorScheme } from '@mantine/core'
import '@mantine/core/styles.css'
import { createContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { BobflixAPI, UserType } from './api/Bobflix'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'

export const SearchContext = createContext({} as { search: string, setSearch: (search: string) => void })
export const UserContext = createContext({} as { user: UserType | null, setUser: (user: UserType | null) => void })
export const JwtContext = createContext({} as { jwt: string, setJwt: (jwt: string) => void })

function App() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null as UserType | null)
  const [jwt, setJwt] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    localStorage.setItem('token', jwt)

    if (BobflixAPI.hasValidJwt()) {
      BobflixAPI.getLoggedInUser().then((res) => {
        if (res.success) {
          setUser(res.data)
        }
      })
    }
    else {
      setUser(null)
    }
  }, [jwt])

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
        <JwtContext.Provider value={{ jwt, setJwt }}>
          <UserContext.Provider value={{ user, setUser }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<h1>404 - Page not found</h1>} />
            </Routes>
          </UserContext.Provider>
        </JwtContext.Provider>
      </SearchContext.Provider>
      <Footer colorScheme={colorScheme} setColorScheme={setColorScheme} />
    </MantineProvider>
  )
}

export default App
