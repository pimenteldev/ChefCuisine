import {Product} from '@/models'

type Action = 'add' | 'modify' | 'remove'

export interface DialogState {
  action: Action
  product?: Product
}
