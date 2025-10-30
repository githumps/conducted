# /ship - Pre-Merge Checklist

Run before merging any PR to ensure quality.

## What This Command Does

1. Verify all quality gates pass
2. Check for common issues
3. Confirm tests/lint clean (if configured)
4. Verify mobile compatibility
5. Check save/load still works

## Checklist

### Code Quality
- [ ] Max 150 lines changed (check `git diff --stat`)
- [ ] No console.log() left in code
- [ ] No commented-out code blocks
- [ ] No TODO comments without GitHub issue links
- [ ] No hardcoded values that should be constants

### Functionality
- [ ] Game boots without errors
- [ ] Feature works as described in issue
- [ ] No regression bugs (old features still work)
- [ ] Save/load tested and working
- [ ] Works on both desktop and mobile

### Documentation
- [ ] PR description includes "Fixes #N"
- [ ] Code comments added for complex logic
- [ ] If new system: added to DEVELOPMENT_ROADMAP.md

### Testing
- [ ] Manual testing completed
- [ ] Edge cases tested (party full, no money, etc.)
- [ ] Mobile touch controls verified
- [ ] No console errors in browser

### GitHub
- [ ] PR linked to issue
- [ ] Labels applied (bug/feature/refactor)
- [ ] Milestone assigned
- [ ] No merge conflicts

## Auto-Checks (if CI configured)

```
Running pre-merge checks...
✅ Lint: No errors
✅ Build: Success
✅ Tests: 24/24 passed
✅ Diff size: 127 lines (under 150 limit)
✅ No console.log found
✅ Save format compatible

All checks passed! Safe to merge.
```
