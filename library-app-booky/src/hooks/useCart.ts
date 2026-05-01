import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPost, apiDelete } from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'
import type { Cart } from '@/types/cart'
import type { ApiResponse } from '@/types/api'

export const useCart = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: () => apiGet<ApiResponse<Cart>>(ENDPOINTS.CART),
  })
}

export const useCartCheckout = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CART_CHECKOUT],
    queryFn: () => apiGet<ApiResponse<Cart>>(ENDPOINTS.CART_CHECKOUT),
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookId: number) => apiPost(ENDPOINTS.CART_ITEMS, { bookId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] })
    },
  })
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (itemId: number) => apiDelete(ENDPOINTS.CART_ITEM(itemId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] })
    },
  })
}

export const useClearCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => apiDelete(ENDPOINTS.CART),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] })
    },
  })
}
