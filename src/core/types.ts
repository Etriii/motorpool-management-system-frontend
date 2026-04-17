export interface ApiResponse<T> {
  status_code: number
  message: string
  data: T
  errors: Record<string, string[]> | null
}

export interface PaginatedApiResponse<T> {
  current_page: number
  per_page: number
  total_pages: number
  total_items: number
  data: T[]
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ListParams<EntityFilter> {
    current_page: number
    per_page: number
    search?: string
    ordering?: string
    filters?: EntityFilter  
}

