import type { InjectionKey } from 'vue'
import type { IVFormContext } from '@/shared/components/VForm/types'

export const VFormContextKey: InjectionKey<IVFormContext> = Symbol('VFormContextKey');
