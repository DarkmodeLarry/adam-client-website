export const OPENING_HOURS_BEGINNING = 9 // IN HOURS
export const OPENING_HOURS_END = 12 // IN HOURS
export const OPENING_HOURS_INTERVAL = 30 // in minutes

export const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5MB

export const categories = ['all', 'breakfast', 'lunch', 'dinner'] as const

export const now = new Date() // Do not use this in mutated functions, e.g. setHours(0, 0, 0, 0)

export const STORE_OPENING_TIME = 9 // IN HOURS
export const STORE_CLOSING_TIME = 17 // IN HOURS
export const INTERVAL = 30 // in minutes
