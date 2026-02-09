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
    <div class="ct-section ct-position-container">
      <!-- Main Content: Metrics (Always Visible) -->
      <div class="ct-main-content">
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

      <!-- Mode Mismatch Side Guide (Conditional) -->
      <transition name="slide-fade">
        <div v-if="!isMatched" class="ct-mismatch-guide">
          <div class="ct-guide-card">
            <div class="ct-guide-header">
              <v-icon 
                size="28" 
                :icon="isSyncing ? 'mdi-loading' : 'mdi-alert-circle-outline'" 
                :class="{ 'mdi-spin': isSyncing }"
                class="ct-guide-icon" 
              />
              <h3>{{ isSyncing ? '模式同步中...' : '模式不匹配' }}</h3>
            </div>
            
            <div class="ct-guide-text">
              <p>请按住面板上的高亮按钮，直到设备完全切换至 <span class="text-primary font-weight-bold">【{{ targetLabel }}模式】</span></p>
            </div>

            <!-- More Compact Physical Panel Illustration -->
            <div class="ct-panel-illus small">
              <div class="ct-illus-frame">
                <!-- Top Button -->
                <div class="ct-illus-btn-top">Inactive</div>
                
                <!-- Mode Switch -->
                <div class="ct-illus-mode-switch">
                  <div 
                    class="ct-illus-btn horizontal" 
                    :class="{ active: targetMode === SCAN_MODES.HORIZONTAL }"
                  >
                    <v-icon icon="mdi-circle-outline" size="18" />
                  </div>
                  <div 
                    class="ct-illus-btn vertical" 
                    :class="{ active: targetMode === SCAN_MODES.VERTICAL }"
                  >
                    <v-icon icon="mdi-rectangle-outline" size="18" />
                  </div>
                </div>

                <!-- D-Pad -->
                <div class="ct-illus-dpad">
                  <v-icon icon="mdi-menu-up" size="18" />
                  <div class="ct-illus-dpad-center">
                    <v-icon icon="mdi-menu-left" size="18" />
                    <v-icon icon="mdi-circle-small" size="16" />
                    <v-icon icon="mdi-menu-right" size="18" />
                  </div>
                  <v-icon icon="mdi-menu-down" size="18" />
                </div>

                <!-- Bottom Fine Adjustment -->
                <div class="ct-illus-fine">
                  <v-icon icon="mdi-minus" size="14" />
                  <div class="ct-illus-fine-center">
                    <v-icon icon="mdi-tune-vertical" size="14" />
                  </div>
                  <v-icon icon="mdi-plus" size="14" />
                </div>
              </div>
            </div>

            <p class="ct-guide-hint">观察中心数值变化</p>
            <button class="ct-guide-debug-btn" @click="handleSync">模拟就位</button>
          </div>
        </div>
      </transition>
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
.ct-position-container {
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
}

.ct-main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.ct-metric-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  max-width: 800px;
  width: 100%;
}

/* Side Mismatch Guide */
.ct-mismatch-guide {
  width: 280px;
  background: rgba(237, 240, 244, 0.95);
  border-left: 1px solid #CDD3DB;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05);
}

.ct-guide-card {
  text-align: center;
}

.ct-guide-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.ct-guide-icon {
  color: #FB8C00;
}

.ct-guide-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #263238;
}

.ct-guide-text {
  margin-bottom: 20px;
}

.ct-guide-text p {
  font-size: 13px;
  line-height: 1.6;
  color: #4A5A6B;
  margin: 0;
}

.ct-guide-hint {
  font-size: 12px;
  font-weight: 600;
  color: #1976D2;
  margin-top: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Compact Illustration */
.ct-panel-illus.small .ct-illus-frame {
  width: 120px;
  background: #B0BEC5;
  padding: 16px 8px;
  border-radius: 50px 50px 15px 15px;
  border: 3px solid #78909C;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.4);
}

.ct-illus-btn-top {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #CFD8DC;
  border: 4px solid #90A4AE;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #546E7A;
}

.ct-panel-illus.small .ct-illus-mode-switch {
  width: 90px;
  height: 48px;
  background: #90A4AE;
  border-radius: 24px;
  transform: rotate(-25deg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
}

.ct-panel-illus.small .ct-illus-btn {
  width: 36px;
  height: 36px;
  background: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(25deg);
  color: #4A5A6B;
}

.ct-panel-illus.small .ct-illus-btn.active {
  background: #B7E28E;
  box-shadow: 0 0 12px #B7E28E;
  border: 2px solid #FFFFFF;
  color: #FFFFFF;
}

.ct-illus-dpad {
  width: 80px;
  height: 80px;
  background: #CFD8DC;
  border-radius: 50%;
  border: 2px solid #90A4AE;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #546E7A;
}

.ct-illus-dpad-center {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ct-illus-fine {
  width: 80px;
  height: 32px;
  background: #E0E0E0;
  border-radius: 16px;
  border: 2px solid #90A4AE;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #546E7A;
}

.ct-illus-fine-center {
  width: 24px;
  height: 24px;
  background: #90A4AE;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
}

.ct-guide-debug-btn {
  margin-top: 24px;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px dashed #CDD3DB;
  background: transparent;
  color: #7A8896;
  font-size: 12px;
  cursor: pointer;
}

/* Animations */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Action Bar Styles */
.ct-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 4px;
  border: 1px solid #CDD3DB;
  background: #FFFFFF;
  color: #4A5A6B;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}

.ct-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ct-primary {
  min-height: 48px;
  padding: 0 48px;
  border-radius: 4px;
  border: none;
  font-weight: 700;
  font-size: 14px;
  background: #2B5C8A;
  color: #FFFFFF;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 4px rgba(43, 92, 138, 0.2);
}

.ct-primary:disabled {
  background: #D5DBE3;
  color: #7A8896;
  box-shadow: none;
  cursor: not-allowed;
}
</style>
