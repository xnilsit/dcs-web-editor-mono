<template>
  <div>
    <n-form-item label="Surface Winds">
      <div class="flex flex-row w-1/2">
        <n-input-number
          id="sfc-winds-input"
          class="w-3/5"
          v-model:value="sfcwind"
          :min="0"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="sfc-winds-dir-input"
          v-model:value="sfcwinddir"
          :min="0"
          :format="windDir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-form-item label="Winds at 2000">
      <div class="flex flex-row w-1/2">
        <n-input-number
          class="w-3/5"
          id="twok-wind-input"
          v-model:value="twokwind"
          :min="0"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="twok-wind-dir-input"
          v-model:value="twokwinddir"
          :min="0"
          :format="windDir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-form-item label="Winds at 8000">
      <div class="flex flex-row w-1/2">
        <n-input-number
          class="w-3/5"
          id="eightk-wind-input"
          v-model:value="eightkwind"
          :min="0"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="eightk-wind-dir-input"
          v-model:value="eightkwinddir"
          :min="0"
          :format="windDir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-divider class="divider w-1/2" />
    <n-form-item label="Turbulence">
      <n-input-number
        id="turbulence-input"
        class="w-1/2 min-w-24"
        v-model:value="turbulence"
        size="small"
        :step="3"
        :min="0"
        :max="197"
      >
        <template #suffix> 0.1* ft</template>
      </n-input-number>
    </n-form-item>
  </div>
</template>

<script setup lang="ts">
import { NFormItem, NInputNumber, NDivider } from "naive-ui";
import { computed } from "vue";
import { MToft, ftToM } from "../libs/convert";
import { useWeatherStore } from "../stores/state";

const windDir = (wind: number | null): string => {
  if (wind === null) {
    return "";
  } else if (wind > 359) {
    return "000";
  } else if (wind < 100) {
    let result = wind.toString().padStart(3, "0");
    return result;
  } else {
    return wind.toString();
  }
};

const Weather = computed(() => useWeatherStore());

const turbulence = computed({
  get: () => MToft(Weather.value.wx.groundTurbulence),
  set: (value) => {
    Weather.value.wx.groundTurbulence = ftToM(value);
  },
});

type WindLevel = "atGround" | "at2000" | "at8000";
type WindProperty = "speed" | "dir";

function createWindComputed(level: WindLevel, property: WindProperty) {
  return computed({
    get: () => Math.round(Weather.value.wx.wind[level][property]),
    set: (value: number) => {
      Weather.value.wx.wind[level][property] = Math.round(value / 100) * 100;
    },
  });
}

const sfcwind = createWindComputed("atGround", "speed");
const sfcwinddir = createWindComputed("atGround", "dir");
const twokwind = createWindComputed("at2000", "speed");
const twokwinddir = createWindComputed("at2000", "dir");
const eightkwind = createWindComputed("at8000", "speed");
const eightkwinddir = createWindComputed("at8000", "dir");
</script>
