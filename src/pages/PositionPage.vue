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
              <h3>{{ isSyncing ? `同步中 ${progressPercent}%` : '模式不匹配' }}</h3>
            </div>
            
            <div class="ct-guide-text">
              <div class="ct-mode-comparison">
                <div class="ct-mode-item">
                  <span class="ct-mode-tag">当前硬件</span>
                  <span class="ct-mode-val">{{ currentHwLabel }}模式</span>
                </div>
                <v-icon icon="mdi-arrow-right-thin" class="ct-mode-arrow" />
                <div class="ct-mode-item target">
                  <span class="ct-mode-tag">所需模式</span>
                  <span class="ct-mode-val">{{ targetLabel }}模式</span>
                </div>
              </div>
              <p class="ct-action-hint">
                <v-icon icon="mdi-gesture-tap-hold" size="14" class="mr-1" />
                请<strong>长按</strong>图中高亮按键进行切换
              </p>
            </div>

            <!-- Realistic Physical Panel Illustration with Interaction -->
            <div class="ct-panel-illus side-style" :class="{ 'is-syncing': isSyncing }">
              <div class="ct-illus-shell">
                <div class="ct-illus-sensor"></div>
                
                <!-- Group 1: Mode Switch (Dark Capsule) -->
                <div class="ct-illus-group-capsule">
                  <div 
                    class="ct-illus-btn mode-btn horizontal" 
                    :class="{ active: targetMode === SCAN_MODES.HORIZONTAL }"
                    @mousedown="targetMode === SCAN_MODES.HORIZONTAL && startSyncing()"
                    @mouseup="stopSyncing"
                    @mouseleave="stopSyncing"
                    @touchstart.prevent="targetMode === SCAN_MODES.HORIZONTAL && startSyncing()"
                    @touchend="stopSyncing"
                  >
                    <v-icon icon="mdi-rectangle-outline" size="16" />
                    <!-- Progress Overlay -->
                    <div 
                      v-if="isSyncing && targetMode === SCAN_MODES.HORIZONTAL" 
                      class="ct-btn-progress" 
                      :style="{ height: syncProgress + '%' }"
                    ></div>
                  </div>
                  <div 
                    class="ct-illus-btn mode-btn vertical" 
                    :class="{ active: targetMode === SCAN_MODES.VERTICAL }"
                    @mousedown="targetMode === SCAN_MODES.VERTICAL && startSyncing()"
                    @mouseup="stopSyncing"
                    @mouseleave="stopSyncing"
                    @touchstart.prevent="targetMode === SCAN_MODES.VERTICAL && startSyncing()"
                    @touchend="stopSyncing"
                  >
                    <v-icon icon="mdi-rectangle-outline" size="16" />
                    <!-- Progress Overlay -->
                    <div 
                      v-if="isSyncing && targetMode === SCAN_MODES.VERTICAL" 
                      class="ct-btn-progress" 
                      :style="{ height: syncProgress + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Group 2: D-Pad (Cross Style) -->
                <div class="ct-illus-group-cross">
                  <div class="ct-cross-v">
                    <v-icon icon="mdi-menu-up" size="18" />
                    <v-icon icon="mdi-menu-down" size="18" />
                  </div>
                  <div class="ct-cross-h">
                    <v-icon icon="mdi-menu-left" size="18" />
                    <div class="ct-pill-icon"></div>
                    <v-icon icon="mdi-menu-right" size="18" />
                  </div>
                </div>

                <!-- Group 3: Fine Adjust (Light Capsule) -->
                <div class="ct-illus-group-fine">
                  <v-icon icon="mdi-minus" size="14" />
                  <div class="ct-pill-icon small"></div>
                  <v-icon icon="mdi-plus" size="14" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="ct-action-bar">
      <button class="ct-secondary" @click="goBack">
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
  currentHwMode,
  isSyncing,
  syncProgress,
  isMatched,
  currentStep,
  time,
  startSyncing,
  stopSyncing,
  setTargetMode,
  setCurrentStep,
} = useScanState();

const targetLabel = computed(() =>
  targetMode.value === SCAN_MODES.HORIZONTAL ? '水平' : '垂直'
);

const currentHwLabel = computed(() =>
  currentHwMode.value === SCAN_MODES.HORIZONTAL ? '水平' : '垂直'
);

const progressPercent = computed(() => Math.floor(syncProgress.value));

onMounted(() => {
  setCurrentStep('position');
});

const goBack = () => {
  setCurrentStep('position');
  router.push('/');
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
  margin-bottom: 24px;
}

.ct-mode-comparison {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #FFFFFF;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #E1E4E8;
  margin-bottom: 16px;
}

.ct-mode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.ct-mode-tag {
  font-size: 10px;
  color: #90A4AE;
  font-weight: 700;
  text-transform: uppercase;
}

.ct-mode-val {
  font-size: 15px;
  font-weight: 700;
  color: #4A5A6B;
}

.ct-mode-item.target .ct-mode-val {
  color: #1976D2;
}

.ct-mode-arrow {
  color: #CFD8DC;
  font-size: 24px !important;
}

.ct-action-hint {
  font-size: 13px;
  color: #7A8896;
  line-height: 1.4;
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

/* Realistic Illustration Styles */
.ct-panel-illus.side-style .ct-illus-shell {
  width: 140px;
  background: #EDF0F4;
  padding: 24px 12px;
  border-radius: 40px 40px 20px 80px; /* Ergonomic wavy profile */
  border: 2px solid #CDD3DB;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  box-shadow: inset -2px 0 5px rgba(0,0,0,0.05);
}

.ct-illus-sensor {
  width: 6px;
  height: 6px;
  background: #78909C;
  border-radius: 50%;
  margin: 0 auto 10px;
}

/* Mode Capsule (Dark) */
.ct-illus-group-capsule {
  width: 100px;
  background: #757575;
  padding: 6px;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  transform: rotate(-25deg);
  margin: 0 auto;
}

.ct-illus-btn.mode-btn {
  width: 40px;
  height: 40px;
  background: #F5F5F5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;
  transform: rotate(25deg);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden; /* For progress bar overlay */
  cursor: pointer;
}

.ct-btn-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(76, 175, 80, 0.4);
  pointer-events: none;
  transition: height 0.1s linear;
}

.ct-panel-illus.is-syncing .ct-illus-shell {
  border-color: #4CAF50;
  box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
}

.ct-illus-btn.mode-btn.active {
  background: #B7E28E;
  color: #FFFFFF;
  box-shadow: 0 0 15px rgba(183, 226, 142, 0.8);
  border: 2px solid #FFFFFF;
}

/* Cross Pad */
.ct-illus-group-cross {
  width: 110px;
  height: 110px;
  position: relative;
  margin: 10px auto;
}

.ct-cross-v {
  position: absolute;
  top: 0; left: 35px;
  width: 40px; height: 110px;
  background: #FFFFFF;
  border: 1px solid #CDD3DB;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 0;
  color: #BBDEFB;
}

.ct-cross-h {
  position: absolute;
  top: 35px; left: 0;
  width: 110px; height: 40px;
  background: #757575;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  color: #FFFFFF;
  z-index: 2;
}

.ct-pill-icon {
  width: 12px;
  height: 24px;
  background: #FFFFFF;
  border-radius: 6px;
}

.ct-pill-icon.small {
  width: 10px;
  height: 18px;
  background: #757575;
}

/* Fine Adjust (Light) */
.ct-illus-group-fine {
  width: 100px;
  background: #FFFFFF;
  border: 1px solid #CDD3DB;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  color: #757575;
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
