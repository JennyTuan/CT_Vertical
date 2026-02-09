<template>
  <div class="ct-frame">
    <HeaderBar :time="time" />

    <div class="ct-body">
      <SidebarPanel
        :target-mode="targetMode"
        :is-syncing="isSyncing"
        :is-matched="isMatched"
        @update:target-mode="emit('update:targetMode', $event)"
      />

      <main class="ct-main">
        <slot />
      </main>
    </div>

    <FooterSteps :current-step="currentStep" :steps="steps" />
  </div>
</template>

<script setup lang="ts">
import type { Step, ScanMode } from '@/types/scan';
import HeaderBar from '@/components/HeaderBar.vue';
import SidebarPanel from '@/components/SidebarPanel.vue';
import FooterSteps from '@/components/FooterSteps.vue';

defineProps<{
  time: Date;
  targetMode: ScanMode;
  isSyncing: boolean;
  isMatched: boolean;
  currentStep: string;
  steps: Step[];
}>();

const emit = defineEmits<{
  (event: 'update:targetMode', value: ScanMode): void;
}>();
</script>
