import { inject } from 'vue'
import { VFormItemContextKey } from '@/shared/keys'

export const useFormItemContext = () => inject(VFormItemContextKey, null)
