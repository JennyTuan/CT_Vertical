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
      <v-icon v-else size="32" :icon="icon" class="ct-card-icon" />
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
  'move-h': 'M2,12L5,9V11H19V9L22,12L19,15V13H5V15L2,12M11,4H13V10H11V4M11,14H13V20H11V14Z', // Horizontal
  'move-v': 'M12,2L15,5H13V19H15L12,22L9,19H11V5H9L12,2M4,11H10V13H4V11M14,11H20V13H14V11Z', // Vertical
  'tilt': 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M13,8L11,8L11,10L13,10V8M13,12L11,12L11,16L13,16V12Z', // Tilt (Simplifed Ring)
  'rotate': 'M7.5,18A5.5,5.5 0 1,1 13,23.5L13,21.5A3.5,3.5 0 1,0 9.5,18H7.5M10.29,13H12.29L14.79,18H12.79L10.29,13Z' // Rotation
};

const customIcon = computed(() => ICONS[props.icon]);


</script>

<style scoped>
.ct-card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E1E4E8;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.ct-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: #64B5F6;
}

.ct-card-icon-container {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #78909C;
  opacity: 0.6;
}

.ct-custom-icon {
  width: 48px;
  height: 48px;
}

.ct-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.ct-card-value {
  font-size: 64px;
  font-weight: 800;
  color: #263238;
  line-height: 1;
  font-family: 'Roboto', sans-serif;
  letter-spacing: -0.02em;
}

.ct-card-label {
  font-size: 11px;
  font-weight: 600;
  color: #90A4AE;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}


</style>
