import React, { useState, useEffect } from 'react';
import { getBirdImage } from '../services/birdService';

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
        const url = await getBirdImage(selectedBird);
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
    <Card className="w-full bg-[#ffffff] dark:bg-[#1f2937]">
      <CardHeader>
        <CardTitle className="text-[#1f2937] dark:text-[#ffffff]">
          {selectedBird || '鳥を選択してください'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center bg-[#f3f4f6] dark:bg-[#374151] rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#3b82f6] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="w-full p-4 text-center text-[#ef4444] bg-[#fee2e2] dark:bg-[#991b1b] dark:text-[#fecaca] rounded-lg">
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
      </CardContent>
    </Card>
  );
};

export default BirdDisplay;