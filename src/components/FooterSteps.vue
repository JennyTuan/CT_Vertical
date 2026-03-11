<template>
  <footer class="ct-footer">
    <div
      v-for="(step, idx) in steps"
      :key="step.id"
      class="ct-footer-step"
      :class="{ active: currentStep === step.id }"
      @click="handleStepClick(step.id)"
    >
      <div class="ct-indicator-container">
        <div class="ct-dot-outer" :class="{ active: currentStep === step.id }">
          <div class="ct-dot-inner" :class="{ active: currentStep === step.id }"></div>
        </div>
      </div>
      <span class="ct-footer-label" :class="{ active: currentStep === step.id }">
        {{ step.label }}
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Step } from '@/types/scan';

const props = defineProps<{
  currentStep: string;
  steps: Step[];
}>();

const emit = defineEmits<{
  (event: 'update:currentStep', value: string): void;
}>();

const handleStepClick = (id: string) => {
  // Navigation logic if needed, or just emit
  emit('update:currentStep', id);
};
</script>

<style scoped>
.ct-footer {
  height: 48px;
  background: #7e9dd2;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  padding: 0 64px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.2);
  z-index: 50;
}

.ct-footer-step {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.4;
  position: relative;
}

.ct-footer-step.active {
  opacity: 1;
  transform: scale(1.05);
}

.ct-footer-step:hover:not(.active) {
  opacity: 0.7;
}

.ct-indicator-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-dot-outer {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.ct-dot-outer.active {
  border-color: #FFFFFF;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

.ct-dot-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  transition: all 0.3s ease;
}

.ct-dot-inner.active {
  background: #FFFFFF;
  transform: scale(1.1);
}

.ct-footer-label {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: -0.02em;
  transition: all 0.3s ease;
}

.ct-footer-label.active {
  color: #FFFFFF;
}
</style>
