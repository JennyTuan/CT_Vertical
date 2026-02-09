<template>
  <footer class="ct-footer">
    <div
      v-for="step in steps"
      :key="step.id"
      class="ct-footer-step"
      :class="{ active: currentStep === step.id }"
    >
      <div class="ct-footer-icon">
        <v-icon size="16" :icon="step.icon || 'mdi-circle-outline'" />
      </div>
      <span class="ct-footer-label">{{ step.label }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Step } from '@/types/scan';

defineProps<{
  currentStep: string;
  steps: Step[];
}>();
</script>

<style scoped>
.ct-footer {
  height: 64px;
  background: #7e98c4;
  border-top: 1px solid #6b85b2;
  display: flex;
  align-items: stretch;
}

.ct-footer-step {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  opacity: 0.4;
}

.ct-footer-step.active {
  background: #1e4d94;
  border-left: 1px solid #0d2a57;
  border-right: 1px solid #0d2a57;
  box-shadow: inset 0 0 12px rgba(15, 23, 42, 0.45);
  opacity: 1;
}

.ct-footer-icon {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-footer-step.active .ct-footer-icon {
  border-color: #ffffff;
  color: #ffffff;
}

.ct-footer-label {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
}

.ct-footer-step.active .ct-footer-label {
  color: #ffffff;
}
</style>
