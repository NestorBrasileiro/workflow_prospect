// Utilities
import { defineStore } from 'pinia'
import { crudActions } from "@/store/index";
import {state} from "vue-tsc/out/shared";


const panelListMock = () => {
  const listPanels = []
  for(let i = 1; i <= 9; i++){
    listPanels.push(
      {
        id: `Panel${i}`,
        name: `Step ${i}`,
        step: i
      },
    )
  }

  return listPanels

}

export type Panel = {
  id?: string
  name: string,
  step: number
}

type State = {
  panel: Panel | {},
  panels: Array<Panel> | Array<undefined>
}

export const panelStore = defineStore('panelStore', {
  state: (): State => {
    return {
      panels: panelListMock(),
      panel: {
        id: `Panel1`,
        name: `Passo1`,
        step: 1
      },
    }
  },
  getters: {
    getPanel: (state: State): State[keyof State] => state.panel,
    getPanels: (state: State): State[keyof State] => state.panels
  },
  actions: {
    create(data: Panel) {},
    findAll(filter = {} ) {},
    findOne(id: Panel['id']) {},
    update(id: Panel['id'], data: Panel[keyof Panel]) {},
    delete(id: Panel['id']) {}
  }
})


