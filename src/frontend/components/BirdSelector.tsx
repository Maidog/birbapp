import React, { useState, useEffect } from 'react';
import { getBirds } from '../services/birdService';

const BirdSelector: React.FC<{
  onBirdSelect: (birdName: string) => void;
}> = ({ onBirdSelect }) => {
  const [birds, setBirds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const birdList = await getBirds();
        setBirds(birdList);
      } catch (err) {
        setError('鳥のリストの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    fetchBirds();
  }, []);

  const filteredBirds = birds.filter(bird =>
    bird.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card style={{ backgroundColor: '#ffffff', color: '#000000' }}>
      <CardHeader>
        <CardTitle style={{ color: '#000000' }}>鳥の種類を選択</CardTitle>
        <CardDescription style={{ color: '#666666' }}>
          検索して鳥を選んでください
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">検索</Label>
            <Input
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="鳥の名前を入力..."
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
            />
          </div>
          
          {loading ? (
            <div style={{ color: '#666666' }}>読み込み中...</div>
          ) : error ? (
            <div style={{ color: '#ff0000' }}>{error}</div>
          ) : (
            <div className="grid gap-2">
              {filteredBirds.map((bird) => (
                <Button
                  key={bird}
                  onClick={() => onBirdSelect(bird)}
                  variant="outline"
                  className="w-full text-left"
                  style={{ 
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: '1px solid #cccccc'
                  }}
                >
                  {bird}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BirdSelector;