interface Bird {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const API_BASE_URL = 'http://localhost:3000/api';
const API_KEY = import.meta.env.VITE_BIRD_API_KEY || '';

if (!API_KEY) {
  console.warn('Warning: VITE_BIRD_API_KEY environment variable is not set');
}

export const birdService = {
  async getBirds(): Promise<Bird[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/birds`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch birds:', error);
      throw new Error('鳥のリストの取得に失敗しました');
    }
  },

  async getBirdImage(birdName: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/bird-image?name=${encodeURIComponent(birdName)}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Failed to fetch bird image:', error);
      throw new Error('鳥の画像の取得に失敗しました');
    }
  },

  async getBirdDetails(birdId: string): Promise<Bird> {
    try {
      const response = await fetch(`${API_BASE_URL}/birds/${birdId}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch bird details:', error);
      throw new Error('鳥の詳細情報の取得に失敗しました');
    }
  }
};

export default birdService;