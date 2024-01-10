 <script setup>
    import { ref } from 'vue'
    import Ai from "@/views/tools/toolsMain/ai.vue";
    import Translate from "@/views/tools/toolsMain/translate.vue";
    import document from "@/views/tools/toolsMain/document.vue";

    const active = ref(0)
  </script>

  <template>
    <var-tabs elevation v-model:active="active">
      <var-tab name="ai">ai</var-tab>
      <var-tab name="translate">翻译</var-tab>
      <var-tab name="document">文档</var-tab>
    </var-tabs>
    <var-tabs-items v-model:active="active">
      <var-tab-item name="ai">
        <template #default>
          <ai />


        </template>

      </var-tab-item>
      <var-tab-item name="translate">
        <translate />


      </var-tab-item>
      <var-tab-item name="document">
      <document />
      </var-tab-item>
    </var-tabs-items>
  </template>

<style scoped>

</style>