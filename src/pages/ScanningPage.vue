<template>
  <MainLayout
    :time="time"
    :target-mode="targetMode"
    :is-syncing="isSyncing"
    :is-matched="isMatched"
    :current-step="currentStep"
    :steps="STEPS"
    @update:target-mode="setTargetMode"
  >
    <div class="ct-section">
      <div class="ct-scanning">
        <v-icon size="48" icon="mdi-play" class="ct-scanning-icon" />
        <h2>Scanning In Progress</h2>
      </div>
    </div>

    <div class="ct-action-bar">
      <button class="ct-secondary" :disabled="currentStep === 'position'" @click="goBack">
        <v-icon size="18" icon="mdi-chevron-left" />
        <span>返回</span>
      </button>

      <button class="ct-primary" :disabled="!isMatched" @click="confirmPosition">
        确认位置
      </button>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import { STEPS } from '@/constants/scan';
import { useScanState } from '@/composables/useScanState';

const router = useRouter();
const {
  targetMode,
  isSyncing,
  isMatched,
  currentStep,
  time,
  setTargetMode,
  setCurrentStep,
} = useScanState();

onMounted(() => {
  setCurrentStep('scanning');
});

const goBack = () => {
  setCurrentStep('position');
  router.push('/position');
};

const confirmPosition = () => {
  if (!isMatched.value) return;
  setCurrentStep('scanning');
  router.push('/scanning');
};
</script>

<style scoped>
.ct-scanning {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.ct-scanning h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.ct-scanning-icon {
  color: #2563eb;
  margin-bottom: 12px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.08);
    opacity: 1;
  }
}

.ct-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #6b7280;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
}

.ct-secondary:disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.ct-primary {
  padding: 10px 40px;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  font-size: 15px;
  background: #96c496;
  color: #1e4d1e;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
}

.ct-primary:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}

.ct-primary:active {
  transform: scale(0.98);
}
</style>
