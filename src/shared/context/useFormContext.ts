import { inject } from 'vue'
import { VFormContextKey } from '@/shared/keys'

export const useFormContext = () => inject(VFormContextKey, null)
