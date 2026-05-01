export interface PaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiError {
  message: string
  statusCode: number
}

export interface ApiResponse<T> {
  data: T
}

export interface PageMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}