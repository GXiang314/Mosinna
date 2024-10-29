<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 sm:px-0"
  >
    <div
      class="bg-[#f1ecff] rounded-lg p-4 sm:p-6 w-full sm:w-4/5 lg:w-3/5 h-[90vh] sm:h-4/5"
    >
      <div class="flex justify-between items-center mb-2 sm:mb-4">
        <h3 class="text-lg sm:text-xl font-semibold">建立貼文</h3>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
        >
          ×
        </button>
      </div>

      <div class="space-y-2 sm:space-y-4">
        <textarea
          :value="detailsText"
          @input="$emit('update:detailsText', $event.target.value)"
          class="w-full h-32 sm:h-40 p-3 sm:p-4 text-sm sm:text-base rounded border border-gray-300 resize-none"
        ></textarea>
        <input
          type="text"
          value="#魔聲仔"
          class="w-full p-2 text-sm sm:text-base rounded border border-gray-300"
        />
      </div>

      <div class="mt-4 sm:mt-6">
        <p class="text-gray-700 mb-2 text-sm sm:text-base">分享至：</p>
        <div class="flex gap-3 sm:gap-4">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            class="hover:opacity-80"
          >
            <img
              src="/social.png"
              alt="Instagram"
              class="w-6 h-6 sm:w-8 sm:h-8"
            />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            class="hover:opacity-80"
          >
            <img
              src="/facebook.png"
              alt="Facebook"
              class="w-6 h-6 sm:w-8 sm:h-8"
            />
          </a>
          <button @click="$emit('share-to-threads')" class="hover:opacity-80">
            <img
              src="/threads.png"
              alt="Threads"
              class="w-6 h-6 sm:w-8 sm:h-8"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  detailsText: {
    type: String,
    required: true
  }
})

defineEmits(['close', 'share-to-threads', 'update:detailsText'])
</script>
