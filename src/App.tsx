
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import Header from './components/Header'

function App() {

  return (
    <MantineProvider defaultColorScheme="dark"
      theme={{
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
          ],
        },
      }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </MantineProvider>
  )
}

export default App
