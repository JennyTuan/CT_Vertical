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
    <div class="ct-position-view">
      <!-- Main Metrics Grid -->
      <div class="ct-metrics-viewport">
        <div class="ct-metrics-layout">
          <MetricCard
            v-for="metric in POSITION_METRICS"
            :key="metric.label"
            :label="metric.label"
            :value="metric.value"
            :icon="metric.icon"
          />
        </div>
      </div>

      <!-- Bottom Action Card -->
      <div class="ct-action-card">
        <button class="ct-btn-secondary" @click="goBack">
          <v-icon size="16" icon="mdi-chevron-left" />
          <span>返回</span>
        </button>

        <button class="ct-btn-primary" @click="confirmPosition">
          <span>{{ isMatched ? '患者列表' : '模式同步中' }}</span>
          <v-icon size="16" icon="mdi-chevron-right" />
        </button>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import MetricCard from '@/components/MetricCard.vue';
import { POSITION_METRICS } from '@/data/mock';
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
  setCurrentStep('position');
});

const goBack = () => {
  router.push('/');
};

const confirmPosition = () => {
  if (!isMatched.value) return;
  router.push('/scanning');
};
</script>

<style scoped>
.ct-position-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px; /* Reduced from 20px */
  background: #EDF0F4;
  overflow: hidden;
}

.ct-metrics-viewport {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.ct-metrics-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px; /* Reduced from 20px */
  width: 100%;
  max-width: 760px; /* Reduced from 800px */
  margin: auto;
}

.ct-action-card {
  height: 56px; /* Reduced from 64px */
  margin-top: 12px;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(200, 206, 216, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  flex-shrink: 0; /* Ensures it never shrinks below 56px */
}

.ct-btn-secondary {
  height: 36px;
  padding: 0 24px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  background: white;
  color: #64748B;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.ct-btn-primary {
  height: 36px;
  padding: 0 32px;
  border-radius: 8px;
  background: linear-gradient(to right, #7e9dd2, #6485C1);
  color: white;
  font-weight: 900;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(126, 157, 210, 0.2);
}
</style>
