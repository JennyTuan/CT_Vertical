<template>
  <div class="ct-card group">
    <div class="ct-card-top">
      <div class="ct-card-icon-box">
        <svg
          v-if="customIcon"
          viewBox="0 0 24 24"
          class="ct-custom-icon"
          fill="currentColor"
        >
          <path :d="customIcon" />
        </svg>
        <v-icon v-else size="16" :icon="icon" />
      </div>
      <div class="ct-card-spacer"></div>
    </div>

    <div class="ct-card-main">
      <span class="ct-card-value font-mono">{{ value }}</span>
      <div class="ct-card-label-box">
        <span class="ct-card-label">{{ label }}</span>
      </div>
    </div>

    <!-- Data Progress Bar Section -->
    <div class="ct-card-footer">
      <div class="ct-progress-labels">
        <span>Limit Min</span>
        <span class="ct-feed-tag">Real-time Feed</span>
        <span>Limit Max</span>
      </div>
      <div class="ct-progress-track">
        <div 
          class="ct-progress-fill"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  value: string;
  icon: string;
}>();

// Static percentages for visual effect as per mockup
const progressPercent = computed(() => {
  if (props.label.includes('横移')) return 65;
  if (props.label.includes('机架高度')) return 40;
  if (props.label.includes('机架倾斜')) return 30;
  if (props.label.includes('扫描环角度')) return 85;
  return 50;
});

const ICONS: Record<string, string> = {
  'move-h': 'M2,12L5,9V11H19V9L22,12L19,15V13H5V15L2,12M11,4H13V10H11V4M11,14H13V20H11V14Z',
  'move-v': 'M12,2L15,5H13V19H15L12,22L9,19H11V5H9L12,2M4,11H10V13H4V11M14,11H20V13H14V11Z',
  'tilt': 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M13,8L11,8L11,10L13,10V8M13,12L11,12L11,16L13,16V12Z',
  'rotate': 'M7.5,18A5.5,5.5 0 1,1 13,23.5L13,21.5A3.5,3.5 0 1,0 9.5,18H7.5M10.29,13H12.29L14.79,18H12.79L10.29,13Z'
};

const customIcon = computed(() => ICONS[props.icon]);
</script>

<style scoped>
.ct-card {
  background: white;
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid rgba(209, 217, 228, 0.5);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  height: 100%;
}

.ct-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  border-color: rgba(126, 157, 210, 0.2);
}

.ct-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.ct-card-icon-box {
  padding: 6px;
  background: #F1F5F9;
  border-radius: 8px;
  border: 1px solid #F1F5F9;
  color: #6485C1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-custom-icon {
  width: 16px;
  height: 16px;
}

.ct-card-spacer {
  width: 40px;
  height: 2px;
  background: rgba(241, 245, 249, 0.5);
  border-radius: 99px;
  margin-top: 4px;
}

.ct-card-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
}

.ct-card-value {
  font-size: 48px; /* Reduced from 60px */
  font-weight: 900;
  color: #2D3748;
  line-height: 1;
  letter-spacing: -0.05em;
}

.ct-card-label-box {
  margin-top: 8px;
  padding: 2px 12px;
  background: #F8FAFC;
  border: 1px solid #F1F5F9;
  border-radius: 99px;
}

.ct-card-label {
  font-size: 9px;
  font-weight: 800;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* Footer & Progress Bar */
.ct-card-footer {
  margin-top: 8px;
}

.ct-progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  font-weight: 900;
  color: #CBD5E1;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 3px;
}

.ct-feed-tag {
  color: rgba(126, 157, 210, 0.4);
  letter-spacing: 0.15em;
}

.ct-progress-track {
  height: 4px; /* Reduced from 6px */
  background: #F1F5F9;
  border-radius: 99px;
  padding: 1px;
  border: 1px solid rgba(226, 232, 240, 0.4);
  overflow: hidden;
}

.ct-progress-fill {
  height: 100%;
  background: linear-gradient(to right, #7e9dd2, #6485C1);
  border-radius: 99px;
}
</style>
