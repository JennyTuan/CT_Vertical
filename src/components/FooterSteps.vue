<template>
  <footer class="ct-footer">
    <div
      v-for="step in steps"
      :key="step.id"
      class="ct-footer-step"
      :class="{ active: currentStep === step.id }"
    >
      <div class="ct-footer-icon">
        <v-icon size="15" :icon="step.icon || 'mdi-circle-outline'" />
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
  height: 60px;
  background: #6E8BB8;
  border-top: 1px solid #5A7AA8;
  display: flex;
  align-items: stretch;
}

.ct-footer-step {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.25s ease;
  opacity: 0.45;
  position: relative;
}

.ct-footer-step + .ct-footer-step::before {
  content: '';
  position: absolute;
  left: 0;
  top: 18px;
  bottom: 18px;
  width: 1px;
  background: rgba(255, 255, 255, 0.15);
}

.ct-footer-step.active {
  background: #1a4482;
  border-left: 1px solid rgba(15, 35, 70, 0.5);
  border-right: 1px solid rgba(15, 35, 70, 0.5);
  box-shadow: inset 0 2px 12px rgba(10, 20, 50, 0.4), inset 0 -2px 4px rgba(255,255,255,0.05);
  opacity: 1;
}

.ct-footer-icon {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  color: rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.ct-footer-step.active .ct-footer-icon {
  border-color: rgba(255, 255, 255, 0.9);
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 8px rgba(255,255,255,0.2);
}

.ct-footer-label {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.02em;
  font-family: 'Roboto', sans-serif;
}

.ct-footer-step.active .ct-footer-label {
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
</style>
