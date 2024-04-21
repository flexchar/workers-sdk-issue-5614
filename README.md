## Workers 3.50.0 `gzip`s responses thus breaking the text streaming.

Uncomment line 41 in index.ts to see the fix in action.

### backend:

```bash
git clone https://github.com/flexchar/workers-sdk-issue-5614
cd workers-sdk-issue-5614
bun install
bun run dev
```

### frontend:

```bash
cd frontend
bun install
bun run dev
```

Good luck.
