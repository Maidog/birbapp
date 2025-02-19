import React, { useState } from 'react'
import BirdDisplay from '../components/BirdDisplay'

const SAMPLE_BIRDS = [
  'スズメ',
  'カラス',
  'ハト',
  'メジロ',
  'シジュウカラ'
]

function App() {
  const [selectedBird, setSelectedBird] = useState('')

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">鳥類ビューア</h1>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <select 
            value={selectedBird}
            onChange={(e) => setSelectedBird(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">鳥を選択してください</option>
            {SAMPLE_BIRDS.map(bird => (
              <option key={bird} value={bird}>{bird}</option>
            ))}
          </select>
        </div>

        <BirdDisplay selectedBird={selectedBird} />
      </div>
    </div>
  )
}

export default App 