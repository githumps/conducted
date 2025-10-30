# /context-check - Report Current Token Usage

Check how close we are to the 8k token budget limit.

## What This Command Does

1. Count total tokens in current conversation
2. Warn if approaching 8k limit
3. Suggest actions to reduce context

## Output Format

```
## Context Budget Status

**Current Tokens**: 3,247 / 8,000 (40%)
**Status**: ✅ Healthy

**Breakdown**:
- System prompt: 1,200 tokens
- Conversation history: 1,850 tokens
- File references: 197 tokens

**Files Currently Loaded**:
- js/game.js (lines 284-300): ~150 tokens
- js/world-maps.js (lines 60-75): ~120 tokens

**Recommendations**:
- ✅ Continue normally
- 💡 Can load 2-3 more file segments safely
```

Or if too high:

```
## Context Budget Status

**Current Tokens**: 7,890 / 8,000 (98%)
**Status**: ⚠️ DANGER ZONE

**Actions Required**:
1. Dump current reasoning to DOCS/TASKLOG.md
2. Create summary GitHub issue
3. Close chat and start fresh with Enforcer PM
4. Reference new issue for context
```
