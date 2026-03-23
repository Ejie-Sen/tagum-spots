import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import MoodSelector from './components/MoodSelector'
import Modal from './components/Modal'
import CardsGrid from './components/CardsGrid'
import './index.css'

function App() {
  const [shops, setShops] = useState([])
  const [currentMood, setCurrentMood] = useState('work')
  const [selectedShop, setSelectedShop] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/shops')
        if (!response.ok) throw new Error('Network response failed')
        const data = await response.json()
        setShops(data)
      } catch (error) {
        console.error("Database connection failed:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchShops()
  }, [])

  const filteredShops = shops.filter(shop => shop.mood === currentMood)

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading Database...</div>

  return (
    <>
      <Hero />
      <MoodSelector currentMood={currentMood} setCurrentMood={setCurrentMood} />
      
      {/* TEMPORARY RESULTS BLOCK (We will build the Cards component next) */}
      <CardsGrid 
        shops={filteredShops} 
        currentMood={currentMood} 
        openModal={setSelectedShop} 
      />

      return (
    <>
      <Hero />
      <MoodSelector currentMood={currentMood} setCurrentMood={setCurrentMood} />
      <CardsGrid 
        shops={filteredShops} 
        currentMood={currentMood} 
        openModal={setSelectedShop} 
      />
      
      {/* THE NEW MODAL COMPONENT */}
      <Modal 
        shop={selectedShop} 
        closeModal={() => setSelectedShop(null)} 
      />
    </>
  )
    </>
  )
}

export default App