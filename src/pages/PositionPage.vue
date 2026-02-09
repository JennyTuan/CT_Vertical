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
      <div class="ct-position">
        <div v-if="!isMatched && !isSyncing" class="ct-overlay">
          <div class="ct-overlay-card">
            <v-icon size="48" icon="mdi-alert-circle-outline" class="ct-overlay-icon" />
            <h3>模式不匹配</h3>
            <p>
              请按操作面板切换至
              <span class="ct-overlay-highlight">“{{ targetLabel }}”</span>
              模式
            </p>
            <button class="ct-overlay-button" @click="handleSync">模拟硬件就位</button>
          </div>
        </div>

        <div class="ct-metric-grid">
          <MetricCard
            v-for="metric in POSITION_METRICS"
            :key="metric.label"
            :label="metric.label"
            :value="metric.value"
            :icon="metric.icon"
          />
        </div>
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
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import MetricCard from '@/components/MetricCard.vue';
import { POSITION_METRICS } from '@/data/mock';
import { STEPS, SCAN_MODES } from '@/constants/scan';
import { useScanState } from '@/composables/useScanState';

const router = useRouter();
const {
  targetMode,
  isSyncing,
  isMatched,
  currentStep,
  time,
  handleSync,
  setTargetMode,
  setCurrentStep,
} = useScanState();

const targetLabel = computed(() =>
  targetMode.value === SCAN_MODES.HORIZONTAL ? '水平' : '垂直'
);

onMounted(() => {
  setCurrentStep('position');
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
.ct-position {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.ct-metric-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.ct-overlay {
  position: absolute;
  inset: 0;
  z-index: 20;
  background: rgba(241, 245, 249, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-overlay-card {
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  border-top: 8px solid #f97316;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
  width: min(360px, 90%);
  text-align: center;
}

.ct-overlay-icon {
  color: #f97316;
  margin-bottom: 12px;
}

.ct-overlay-card h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.ct-overlay-card p {
  margin: 0 0 20px;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
}

.ct-overlay-highlight {
  color: #2563eb;
  font-weight: 700;
}

.ct-overlay-button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
}

.ct-overlay-button:active {
  transform: scale(0.98);
}

.ct-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 4px;
  border: 1px solid #B0BEC5;
  background: transparent;
  color: #546E7A;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ct-secondary:hover:not(:disabled) {
  background: rgba(25, 118, 210, 0.04);
  border-color: #1976D2;
  color: #1976D2;
}

.ct-secondary:disabled {
  color: #B0BEC5;
  cursor: not-allowed;
  opacity: 0.5;
}

.ct-primary {
  min-height: 48px;
  padding: 0 48px;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  background: #1976D2;
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ct-primary:hover:not(:disabled) {
  background: #1565C0;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
}

.ct-primary:disabled {
  background: #CFD8DC;
  color: #90A4AE;
  cursor: not-allowed;
  box-shadow: none;
}

.ct-primary:active:not(:disabled) {
  transform: scale(0.98);
}
</style>
