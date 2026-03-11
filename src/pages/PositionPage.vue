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
                size="32" 
                :icon="isSyncing ? 'mdi-loading' : 'mdi-alert-circle'" 
                :class="{ 'mdi-spin': isSyncing }"
                class="ct-guide-icon" 
              />
              <h3>{{ isSyncing ? `同步中 ${progressPercent}%` : '设备模式不匹配' }}</h3>
            </div>
            
            <div class="ct-guide-text">
              <div class="ct-mode-comparison">
                <div class="ct-mode-item">
                  <span class="ct-mode-tag">当前物理状态</span>
                  <span class="ct-mode-val">{{ currentHwLabel }}</span>
                </div>
                <v-icon icon="mdi-chevron-double-right" class="ct-mode-arrow" />
                <div class="ct-mode-item target">
                  <span class="ct-mode-tag">所需扫描模式</span>
                  <span class="ct-mode-val">{{ targetLabel }}</span>
                </div>
              </div>
              <p class="ct-action-hint">
                <v-icon icon="mdi-gesture-tap-hold" size="14" class="mr-1" />
                请<strong>长按</strong>下方控制面板中的高亮按键
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
                    :class="{ 
                      active: targetMode === SCAN_MODES.HORIZONTAL,
                      'is-syncing': isSyncing && targetMode === SCAN_MODES.HORIZONTAL 
                    }"
                    @mousedown="targetMode === SCAN_MODES.HORIZONTAL && startSyncing()"
                    @mouseup="stopSyncing"
                    @mouseleave="stopSyncing"
                    @touchstart.prevent="targetMode === SCAN_MODES.HORIZONTAL && startSyncing()"
                    @touchend="stopSyncing"
                  >
                    <v-icon icon="mdi-minus" size="14" />
                    <!-- Progress Overlay -->
                    <div 
                      v-if="isSyncing && targetMode === SCAN_MODES.HORIZONTAL" 
                      class="ct-btn-progress" 
                      :style="{ height: syncProgress + '%' }"
                    ></div>
                  </div>
                  <div 
                    class="ct-illus-btn mode-btn vertical" 
                    :class="{ 
                      active: targetMode === SCAN_MODES.VERTICAL,
                      'is-syncing': isSyncing && targetMode === SCAN_MODES.VERTICAL 
                    }"
                    @mousedown="targetMode === SCAN_MODES.VERTICAL && startSyncing()"
                    @mouseup="stopSyncing"
                    @mouseleave="stopSyncing"
                    @touchstart.prevent="targetMode === SCAN_MODES.VERTICAL && startSyncing()"
                    @touchend="stopSyncing"
                  >
                    <v-icon icon="mdi-minus" size="14" />
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
                    <v-icon icon="mdi-triangle" size="14" />
                    <v-icon icon="mdi-triangle-down" size="14" />
                  </div>
                  <div class="ct-cross-h">
                    <v-icon icon="mdi-triangle-left" size="14" />
                    <div class="ct-pill-icon-inner"></div>
                    <v-icon icon="mdi-triangle-right" size="14" />
                  </div>
                </div>

                <!-- Group 3: Fine Adjust -->
                <div class="ct-illus-group-fine">
                   <div class="ct-pill-icon-inner tiny"></div>
                </div>
              </div>
            </div>
            
            <div class="ct-mismatch-footer">
               同步完成后即可开始扫描
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="ct-action-bar">
      <button class="ct-btn-secondary" @click="goBack">
        <v-icon size="20" icon="mdi-arrow-left" class="mr-2" />
        <span>返回</span>
      </button>

      <button class="ct-btn-primary" :disabled="!isMatched" @click="confirmPosition">
        <span>患者列表</span>
        <v-icon size="20" icon="mdi-check-circle-outline" class="ml-2" />
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
  targetMode.value === SCAN_MODES.HORIZONTAL ? '水平扫描' : '垂直扫描'
);

const currentHwLabel = computed(() =>
  currentHwMode.value === SCAN_MODES.HORIZONTAL ? '水平模式' : '垂直模式'
);

const progressPercent = computed(() => Math.floor(syncProgress.value));

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
  padding: 40px;
}

.ct-metric-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 720px;
  width: 100%;
}

/* Side Mismatch Guide */
.ct-mismatch-guide {
  width: 320px;
  background: #EDF0F4;
  border-left: 2px solid #CDD3DB;
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.08);
}

.ct-guide-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ct-guide-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
}

.ct-guide-icon {
  color: #FB8C00;
  filter: drop-shadow(0 2px 4px rgba(251, 140, 0, 0.2));
}

.ct-guide-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #263238;
  letter-spacing: -0.01em;
}

.ct-mode-comparison {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #FFFFFF;
  padding: 14px 10px;
  border-radius: 12px;
  border: 1px solid #D1D9E4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: 12px;
}

.ct-mode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex: 1;
}

.ct-mode-tag {
  font-size: 9px;
  color: #B0BEC5;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ct-mode-val {
  font-size: 15px;
  font-weight: 800;
  color: #455A64;
}

.ct-mode-item.target .ct-mode-val {
  color: #2B5C8A;
}

.ct-mode-arrow {
  color: #CFD8DC;
  font-size: 20px !important;
}

.ct-action-hint {
  font-size: 13px;
  color: #546E7A;
  line-height: 1.5;
  margin: 0;
  padding: 0 10px;
}

.ct-action-hint strong {
  color: #2B5C8A;
  font-weight: 800;
}

/* Realistic Illustration Styles */
.ct-panel-illus.side-style .ct-illus-shell {
  width: 150px;
  background: #FFFFFF;
  padding: 24px 12px;
  border-radius: 40px 40px 24px 80px; 
  border: 2px solid #CDD3DB;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  box-shadow: 
    inset 0 2px 6px rgba(255,255,255,1),
    0 8px 24px rgba(0, 0, 0, 0.08);
}

.ct-illus-sensor {
  width: 8px;
  height: 8px;
  background: #CFD8DC;
  border-radius: 50%;
  margin: 0 auto 4px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
}

/* Mode Capsule (Dark) */
.ct-illus-group-capsule {
  width: 110px;
  background: #37474F;
  padding: 6px;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  transform: rotate(-25deg);
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.ct-illus-btn.mode-btn {
  width: 44px;
  height: 44px;
  background: #455A64;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #B0BEC5;
  transform: rotate(25deg);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 4px solid #37474F;
}

.ct-illus-btn.mode-btn.active {
  background: #ECEFF1;
  color: #37474F;
  border-color: #2B5C8A;
  box-shadow: 0 0 12px rgba(43, 92, 138, 0.4);
}

.ct-illus-btn.mode-btn.active.is-syncing {
  background: #C8E6C9;
  border-color: #4CAF50;
  box-shadow: 0 0 16px rgba(76, 175, 80, 0.6);
}

.ct-btn-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(76, 175, 80, 0.8);
  pointer-events: none;
  transition: height 0.1s linear;
  z-index: 10;
}

/* Cross Pad */
.ct-illus-group-cross {
  width: 120px;
  height: 120px;
  position: relative;
  margin: 10px auto;
}

.ct-cross-v {
  position: absolute;
  top: 0; left: 40px;
  width: 40px; height: 120px;
  background: #ECEFF1;
  border: 1px solid #CFD8DC;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
  color: #B0BEC5;
}

.ct-cross-h {
  position: absolute;
  top: 40px; left: 0;
  width: 120px; height: 40px;
  background: #455A64;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  color: #FFFFFF;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.ct-pill-icon-inner {
  width: 14px;
  height: 24px;
  background: #FFFFFF;
  border-radius: 7px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
}

.ct-pill-icon-inner.tiny {
  width: 24px;
  height: 12px;
  background: #455A64;
  margin: 0 auto;
}

.ct-illus-group-fine {
  width: 110px;
  height: 48px;
  background: #ECEFF1;
  border: 1px solid #CFD8DC;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.ct-mismatch-footer {
  font-size: 11px;
  font-weight: 700;
  color: #90A4AE;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 10px;
}

/* Action Bar Styles Overrides */
.ct-action-bar {
  padding: 0 32px;
  gap: 16px;
}

.ct-btn-secondary {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #CDD3DB;
  background: #FFFFFF;
  color: #455A64;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ct-btn-secondary:hover {
  background: #F5F7FA;
  border-color: #B0BEC5;
}

.ct-btn-primary {
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 48px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #2B5C8A 0%, #1E4470 100%);
  color: #FFFFFF;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(43, 92, 138, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.ct-btn-primary:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(43, 92, 138, 0.35);
}

.ct-btn-primary:disabled {
  background: #D5DBE3;
  color: #90A4AE;
  box-shadow: none;
  cursor: not-allowed;
}

/* Animations */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
