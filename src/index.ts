import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { env } from 'hono/adapter';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.get('/', (c) => {
    return c.redirect('http://localhost:5173');
});

app.use(
    cors({
        origin: '*',
        exposeHeaders: ['*'],
    }),
);

// https://sdk.vercel.ai/docs/guides/frameworks/nextjs-app
app.post('/chat', async (c) => {
    const { OPENAI_API_KEY } = env(c);
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
    });

    const { messages } = await c.req.json();

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // IMPORTANT
    // uncomment to disable compression and fix streaming
    // c.res.headers.set('Content-Encoding', 'identity');

    // Respond with the stream
    return new StreamingTextResponse(stream);
});

export default app;
