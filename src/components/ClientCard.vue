<template>
  <v-hover
    v-slot="{ isHovering, props }"
    close-delay="30"
  >
    <v-card
      @dragstart="triggerDragStart"
      @dragend="triggerDragEnd"
      class="rounded-shaped"
      :class="{ 'on-hover bg-blue-grey-lighten-4': isHovering }"
      color="#E3F2FD"
      theme="dark"
      :elevation="isHovering ? 12 : 2"
      draggable="true"
      v-bind='props'
    >
      <v-card-title class="text-h6">
        {{ client.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ client.address }}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn variant="outlined" size="small">
          Listen Now
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script setup lang="ts">
const props = defineProps<{
  client: {
    id: String,
    name: String,
    address: String,
    phone: String,
    additionalInformation: Object,
    panelId: String
  }
}>()

const emit = defineEmits<{
  (e: 'holdCard', client: any): void
  (e: 'releaseCard', client: any): void
}>()

function triggerDragStart(){
  emit('holdCard', props.client)
}
function triggerDragEnd(){
  emit('releaseCard', props.client)
}

</script>
