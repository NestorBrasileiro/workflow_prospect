// Utilities
import { createPinia } from 'pinia'

export function crudActions<StoreEntity>(state: any) {

  type StoreDefaultFields = StoreEntity & { id: string}

  return {
    create(data: StoreEntity) {},
    findAll(filter = {} ) {},
    findOne(id: StoreDefaultFields['id']) {},
    update(id: StoreDefaultFields['id'], data: StoreDefaultFields[ keyof StoreEntity]) {},
    delete(id: StoreDefaultFields['id']) {}
  }
}

export default createPinia()

