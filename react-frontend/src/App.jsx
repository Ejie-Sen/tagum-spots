import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import MoodSelector from './components/MoodSelector'
import Modal from './components/Modal'
import CardsGrid from './components/CardsGrid'
import Admin from './components/Admin'
import Footer from './components/Footer'
import './index.css'

function App() {
  // 1. THE INFILTRATION PROTOCOL: Check the URL for the secret key
  const urlParams = new URLSearchParams(window.location.search);
  const isPhantomAccess = urlParams.get('override') === 'admin';

  const [shops, setShops] = useState([])
  const [currentMood, setCurrentMood] = useState('work')
  const [selectedShop, setSelectedShop] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // 2. Set the default view based on the URL
  const [view, setView] = useState(isPhantomAccess ? 'admin' : 'app') 

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

  // 3. The Routing Firewall
  if (view === 'admin') {
    return <Admin setView={setView} />
  }

  return (
    <>
      <Hero />
      <MoodSelector currentMood={currentMood} setCurrentMood={setCurrentMood} />
      <CardsGrid 
        shops={filteredShops} 
        currentMood={currentMood} 
        openModal={setSelectedShop} 
      />
      <Modal 
        shop={selectedShop} 
        closeModal={() => setSelectedShop(null)} 
      />
      <Footer />
    </>
  )
}

export default App