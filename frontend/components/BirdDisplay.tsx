import React, { useState, useEffect } from 'react';
import { birdService } from '../services/birdService';

const BirdDisplay: React.FC<{ selectedBird: string }> = ({ selectedBird }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadBirdImage = async () => {
      if (!selectedBird) {
        setImageUrl('src/assets/images/placeholder.png');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const url = await birdService.getBirdImage(selectedBird);
        setImageUrl(url);
      } catch (err) {
        setError('画像の読み込みに失敗しました');
        setImageUrl('src/assets/images/placeholder.png');
      } finally {
        setLoading(false);
      }
    };

    loadBirdImage();
  }, [selectedBird]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {selectedBird || '鳥を選択してください'}
      </h2>
      <div className="flex flex-col items-center space-y-4">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="w-full p-4 text-center text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="relative w-full aspect-video max-w-2xl">
            <img
              src={imageUrl}
              alt={`${selectedBird}の画像`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BirdDisplay;