import React, { useState, useEffect } from 'react'
import BirdDisplay from '../components/BirdDisplay'
import { birdService } from '../services/birdService'

interface Bird {
  id: string;
  name: string;
  sciName: string;
  status: string;
  images: string[];
}

function App() {
  const [selectedBird, setSelectedBird] = useState('')
  const [birds, setBirds] = useState<Bird[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const birdList = await birdService.getBirds()
        setBirds(birdList)
      } catch (err) {
        setError('鳥のリストの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchBirds()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="bg-red-100 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  const selectedBirdData = birds.find(bird => bird.name === selectedBird)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">BIRDEX</h1>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <select 
            value={selectedBird}
            onChange={(e) => setSelectedBird(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">鳥を選択してください</option>
            {birds.map(bird => (
              <option key={bird.id} value={bird.name}>{bird.name}</option>
            ))}
          </select>

          {selectedBirdData && (
            <div className="mt-4 text-gray-700">
              <p><span className="font-semibold">Scientific Name:</span> {selectedBirdData.sciName}</p>
              <p><span className="font-semibold">Conservation Status:</span> {selectedBirdData.status}</p>
            </div>
          )}
        </div>

        <BirdDisplay selectedBird={selectedBird} />
      </div>
    </div>
  )
}

export default App 