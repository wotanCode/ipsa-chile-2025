import { ref } from 'vue'
const VITE_UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || ''

export interface UnsplashImage {
  id: string
  urls: {
    regular: string
    small: string
  }
  description: string | null
  alt_description: string | null
  user: {
    name: string
  }
}

export default function useImageSearch() {
  const images = ref<UnsplashImage[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const searchImages = async (keyword: string, count: number) => {
    isLoading.value = true
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${keyword}&per_page=${count}`,
        {
          headers: {
            Authorization: `Client-ID ${VITE_UNSPLASH_ACCESS_KEY}`,
          },
        },
      )

      if (!response.ok) throw new Error('Error al obtener imágenes')
      const data = await response.json()
      return data.results as UnsplashImage[]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      error.value = 'Error cargando imágenes. Intenta con otro término.'
      return []
    } finally {
      isLoading.value = false
    }
  }

  return { images, isLoading, error, searchImages }
}
