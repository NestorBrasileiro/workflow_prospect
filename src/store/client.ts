// Utilities
import {defineStore} from 'pinia'
import {Panel} from "@/store/panel";


export type Client = {
  id: string
  name: string
  address: string
  phone: string
  additionalInformation: {
    URN: string
  }
  panelId: Panel['id'],
  updatedAt: number
}

const clientMock = {
  id: `${Date.now()}`,
  name: "Client 1",
  address: "Address 1",
  phone: "Phone 1",
  additionalInformation: {
    URN: "URN 1",
  },
  panelId: "Panel1",
  updatedAt: 1
}

const clientListMock = () => {

  const listClients = [];

  const fn: any = () => {
    const random = Math.round(Math.random() * 10)
    return random <= 9 ? random : fn()
  }

  for(let i = 1; i <= 40; i++){
    listClients.push(
      {
        id: `${Date.now() + i}`,
        name: `Client ${i}`,
        address: `Address ${i}`,
        phone: `Phone ${i}`,
        additionalInformation: {
          URN: `URN ${i}`
        },
        panelId: `Panel${fn()}`,
        updatedAt: Date.now() + i
      },
    )
  }

  return listClients

}

type State = {
  client: Client | {},
  clients: Array<Client> | Array<undefined>
}

export const clientStore = defineStore('clientStore', {
  state: (): State => {
    return {
      clients: clientListMock(),
      client: clientMock,
    }
  },
  getters: {
    getClient: (state: State): State[keyof State] => state.client,
    getClients: (state: State): State[keyof State] => state.clients
  },
  actions: {
    create(data: Client) {},
    findAll(filter = {} ) {},
    findOne(id: Client['id']) {},
    update(id: Client['id'], data: Record<keyof Client, string | number>) {

      return true

    },
    delete(id: Client['id']) {}
  }
})


