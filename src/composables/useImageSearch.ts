import { ref } from 'vue'
import type { UnsplashImageResponse, Result } from '@/interface/unsplash_image_response'

export default function useImageSearch() {
  const VITE_UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || ''
  const images = ref<Result[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const searchImages = async (keyword: string, count: number): Promise<Result[]> => {
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
      const data: UnsplashImageResponse = await response.json()
      images.value = data.results
      return data.results
    } catch (err) {
      error.value = `Error cargando imágenes. Intenta con otro término. Detalles: ${(err as Error).message}`
      images.value = []
      return []
    } finally {
      isLoading.value = false
    }
  }

  return { images, isLoading, error, searchImages }
}
