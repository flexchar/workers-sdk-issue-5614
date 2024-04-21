<script setup lang="ts">
    // https://sdk.vercel.ai/docs/guides/frameworks/nuxt
    import { useChat } from 'ai/vue';
    import { ref } from 'vue';

    const encodingHeader = ref('');

    const { messages, input, handleSubmit } = useChat({
        api: 'http://localhost:8787/chat',
        initialInput:
            'Tell me why compressing streaming responses is a bad idea',
        onResponse(response) {
            console.log(response);

            encodingHeader.value = response.headers.get('content-encoding')!;
        },
    });
</script>

<template>
    <section class="flex h-full min-h-screen flex-col w-full justify-center">
        <pre class="text-white">
          encodingHeader: {{ encodingHeader }}
        </pre>

        <div class="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <div
                v-for="m in messages"
                key="m.id"
                class="whitespace-pre-wrap text-white"
            >
                {{ m.role === 'user' ? 'User: ' : 'AI: ' }}
                {{ m.content }}
            </div>

            <form @submit="handleSubmit">
                <input
                    class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-white bg-gray-800"
                    v-model="input"
                    placeholder="Say something..."
                    autofocus
                />
            </form>
        </div>
    </section>
</template>
