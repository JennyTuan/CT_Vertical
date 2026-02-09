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
