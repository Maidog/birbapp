interface Bird {
  id: string;
  name: string;
  sciName: string;
  status: string;
  images: string[];
}

interface BirdResponse {
  entities: Bird[];
}

const API_BASE_URL = 'https://nuthatch.lastelm.software';
const API_KEY = import.meta.env.VITE_BIRD_API_KEY;

if (!API_KEY) {
  console.error('VITE_BIRD_API_KEY is not set in your environment variables');
}

const headers = {
  'api-key': API_KEY
};

export const birdService = {
  async getBirds(): Promise<Bird[]> {
    try {
      console.log('Fetching birds from:', `${API_BASE_URL}/v2/birds?hasImg=true`);
      const response = await fetch(`${API_BASE_URL}/v2/birds?hasImg=true`, { headers });
      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: BirdResponse = await response.json();
      console.log('Received birds data:', data);
      return data.entities;
    } catch (error) {
      console.error('Failed to fetch birds:', error);
      throw new Error('鳥のリストの取得に失敗しました');
    }
  },

  async getBirdImage(birdName: string): Promise<string> {
    try {
      console.log('Fetching bird details for:', birdName);
      const response = await fetch(`${API_BASE_URL}/v2/birds?name=${encodeURIComponent(birdName)}`, { headers });
      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: BirdResponse = await response.json();
      console.log('Received bird data:', data);
      if (data.entities && data.entities.length > 0) {
        const bird = data.entities[0];
        return bird.images && bird.images.length > 0 ? bird.images[0] : 'noBird.png';
      }
      return 'noBird.png';
    } catch (error) {
      console.error('Failed to fetch bird image:', error);
      throw new Error('鳥の画像の取得に失敗しました');
    }
  },

  async getBirdDetails(birdName: string): Promise<Bird | null> {
    try {
      console.log('Fetching bird details for:', birdName);
      const response = await fetch(`${API_BASE_URL}/v2/birds?name=${encodeURIComponent(birdName)}`, { headers });
      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: BirdResponse = await response.json();
      console.log('Received bird details:', data);
      return data.entities && data.entities.length > 0 ? data.entities[0] : null;
    } catch (error) {
      console.error('Failed to fetch bird details:', error);
      throw new Error('鳥の詳細情報の取得に失敗しました');
    }
  }
};

export default birdService;