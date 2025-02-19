interface Bird {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const API_BASE_URL = 'https://nuthatch.lastelm.software';
const API_KEY = import.meta.env.VITE_BIRD_API_KEY;

if (!API_KEY) {
  console.error('VITE_BIRD_API_KEY is not set in your environment variables');
}

const headers = {
  'API-Key': API_KEY
};

export const birdService = {
  async getBirds(): Promise<Bird[]> {
    try {
      console.log('Fetching birds from:', `${API_BASE_URL}/birds`);
      const response = await fetch(`${API_BASE_URL}/birds`, { headers });
      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received birds data:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch birds:', error);
      throw new Error('鳥のリストの取得に失敗しました');
    }
  },

  async getBirdImage(birdName: string): Promise<string> {
    try {
      console.log('Fetching bird image for:', birdName);
      const response = await fetch(`${API_BASE_URL}/birds/image/${encodeURIComponent(birdName)}`, { headers });
      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received image data:', data);
      return data.url;
    } catch (error) {
      console.error('Failed to fetch bird image:', error);
      throw new Error('鳥の画像の取得に失敗しました');
    }
  },

  async getBirdDetails(birdId: string): Promise<Bird> {
    try {
      console.log('Fetching bird details for:', birdId);
      const response = await fetch(`${API_BASE_URL}/birds/${birdId}`, { headers });
      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received bird details:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch bird details:', error);
      throw new Error('鳥の詳細情報の取得に失敗しました');
    }
  }
};

export default birdService;