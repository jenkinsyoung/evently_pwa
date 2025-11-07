const BASE_URL = 'https://raw.githubusercontent.com/jenkinsyoung/database-json/refs/heads/main/evently.json'

class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    const url = `${BASE_URL}${endpoint}`
    
    console.log('Fetching from:', url) // Для дебага
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json() as Promise<T>
  }
}

export const apiClient = new ApiClient()