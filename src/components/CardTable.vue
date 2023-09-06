<template>
  <v-row
    class="ma-2 flex-nowrap overflow-y-auto"
  >
    <template
      v-for="column in clientsPerPanelComputed"
      :key="column.step"
    >
      <v-card
        min-width="300"
        class="rounded-shaped ma-1"
        elevation="2"
        @dragleave="panelEdit = column;"
        @dragend="switchClientDelay(200)"
      >
        <template v-slot:title> {{ column.name }} </template>
        <v-col
          v-for="card in column.clients"
          :key="`${column.id}${card.id}`"
          class="pb-1 pt-1"
          cols="12"
        >
          <Card
            v-if="card.panelId === column.id"
            :client="{
              id:card.id,
              name: card.name,
              address: card.address,
              phone: card.phone,
              additionalInformation: card.additionalInformation,
              panelId: card.panelId
            }"
            @hold-card="(client) => clientEdit = client"
          />
        </v-col>
      </v-card>
    </template>
  </v-row>
</template>
<script setup lang="ts">

import Card from "@/components/ClientCard.vue";
import {Panel, panelStore} from "@/store/panel";
import {Client, clientStore} from "@/store/client";
import { computed, reactive, ref } from "vue";

const usePanelStore  = panelStore()
const useClientStore = clientStore()

const clientsPerPanelComputed = computed(() => {

  const panelWithClients = []

  const clients = useClientStore.clients

  for(const panel of usePanelStore.panels) {

    const clientOfPanel = clients.filter<Client>(v => v.panelId === panel.id)
    clientOfPanel.sort<Client>((a,b) => b.updatedAt - a.updatedAt)

    panelWithClients.push({
      ...panel,
      clients: clientOfPanel
    })

  }

  panelWithClients.sort((a, b) => a.step - b.step)
  return panelWithClients
})


let clientEdit = reactive({})
let panelEdit = reactive({})
let timeoutId: number = 0
let loading = ref(false)

function switchClientDelay(delay: number) {
  if(clientEdit.panelId && panelEdit.id !== (clientEdit as Client).panelId){
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      loading.value = true
      setNewColumnToClient(panelEdit.id)
    }, delay | 0)
  }
}

function setNewColumnToClient(newPanelId: Panel['id']){

  const index = useClientStore.clients.findIndex(v => {
    return v!.id === clientEdit.id
  })

  const clientToUpdate = useClientStore.clients[index]

  const update = { panelId: newPanelId }

  for(const key of Object.keys(update)){
    clientToUpdate[key] = update[key]
  }

  clientToUpdate!.updatedAt = Date.now() + 1000

  clientEdit = {}

}

</script>
