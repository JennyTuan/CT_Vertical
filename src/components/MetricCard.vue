<template>
  <div class="ct-card">
    <div class="ct-card-icon-container">
      <svg
        v-if="customIcon"
        viewBox="0 0 24 24"
        class="ct-custom-icon"
        fill="currentColor"
      >
        <path :d="customIcon" />
      </svg>
      <v-icon v-else size="28" :icon="icon" class="ct-card-icon" />
    </div>
    
    <div class="ct-card-content">
      <span class="ct-card-value">{{ value }}</span>
      <span class="ct-card-label">{{ label }}</span>
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

// Motion icons based on the provided reference images
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
  background: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #DDE2EA;
  border-top: 3px solid #7094BA;
  padding: 20px 18px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 10px rgba(43, 92, 138, 0.07), 0 1px 3px rgba(0,0,0,0.04);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  position: relative;
  overflow: hidden;
}

.ct-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(112, 148, 186, 0.04) 0%, transparent 60%);
  pointer-events: none;
}

.ct-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(43, 92, 138, 0.13), 0 2px 6px rgba(0,0,0,0.05);
  border-top-color: #2B5C8A;
  border-color: #B8C5D6;
}

.ct-card-icon-container {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EDF2F7;
  border-radius: 10px;
  border: 1px solid #DDE2EA;
  color: #5A7FA8;
}

.ct-custom-icon {
  width: 32px;
  height: 32px;
}

.ct-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.ct-card-value {
  font-size: 56px;
  font-weight: 800;
  color: #1E2D3D;
  line-height: 1;
  font-family: 'Roboto', sans-serif;
  letter-spacing: -0.03em;
}

.ct-card-label {
  font-size: 10px;
  font-weight: 700;
  color: #6B7F96;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: #EDF2F7;
  padding: 3px 8px;
  border-radius: 4px;
}
</style>
