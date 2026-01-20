import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSurveyStore = defineStore('survey', () => {
  // Default value
  const currentSurveyName = ref('Substation 1 Survey');

  function setSurveyName(name: string) {
    currentSurveyName.value = name;
  }

  return { currentSurveyName, setSurveyName };
});