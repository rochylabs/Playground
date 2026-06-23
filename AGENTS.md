<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Branch & PR workflow

**Never push directly to `main`.** All changes must go through a PR so CI and Copilot review run.

```
git checkout -b fix/short-description   # or feat/ improvement/ chore/
# make changes, then:
git add <files>
git commit -m "type: short description"
git push origin fix/short-description
# open PR on GitHub → CI runs → Copilot reviews → merge
```

Branch prefixes: `feat/` · `fix/` · `improvement/` · `chore/`

# Lint rules that will fail CI

- `react-hooks/set-state-in-effect` — never call setState directly in a useEffect body
- `react-hooks/refs` — never read or write ref.current during render
- `@next/next/no-html-link-for-pages` — use `<Link>` not `<a>` for internal routes
- CI runs `eslint . --max-warnings 0` — warnings are errors

# Audio regeneration

If any listening script text changes, delete the affected MP3 and run:
```
python3 scripts/generate-audio-edge.py   # set 1
python3 scripts/generate-audio-sets.py  # sets 2–4
```
Commit the new MP3s alongside the script/data changes in the same PR.
