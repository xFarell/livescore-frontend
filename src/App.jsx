import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Stats from './pages/Stats'
import Predict from './pages/Predict'
import Jadwal from './pages/Jadwal'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jadwal' element={<Jadwal />} />
        <Route path='/stats' element={<Stats />} />
        <Route path='/predict' element={<Predict />} />
      </Routes>
    </BrowserRouter>
  )
}