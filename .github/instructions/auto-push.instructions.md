---
applyTo: "**"
---

# Automatic Git publishing preference

- After completing and verifying requested file changes, stage only the files changed for the task, create a Conventional Commit, and push the current branch to its configured upstream without waiting for a separate request.
- Do not include unrelated or pre-existing work. Never force-push, rewrite history, or commit secrets.
- If validation fails, the branch has diverged, conflicts exist, or authentication prevents pushing, stop and explain the blocker instead of bypassing it.
- Do not create commits for review-only, explanation-only, or other tasks that make no file changes.
