# Xaçmaz FK Web - Task Tracker

## Previous Tasks
- [x] Single game MVP voting (persist localStorage, live results) ✅

## Current Task: **Per-Game MVP Display & Selection**
**Goal**: Each match row shows its MVP leader. Users can vote MVP for EACH game separately (not global one-time).

**Match Data** (hardcoded → dynamic):
1. ADA-Everest | 5-4 (məğlubiyyət) | 06.03.2026
2. Şirvan | 13-7 (qalibiyyət) | 21.02.2026  
3. Lənkəran | 9-5 (qalibiyyət) | 18.12.2025

**Detailed Steps**:
- [x] **Step 1**: js/script.js - Defined `matches`, renderMatches(), getMatchMVPKey(), initMatchMVP() base functions
- [x] **Step 2**: index.html - Table: Added `<th>MVP</th>`, `<tbody id="matches-tbody"></tbody>`, removed hardcoded mvp-vote div
- [x] **Step 3**: js/script.js - Added voteMVP(), updateMatchMVPResults(), DOMContentLoaded call renderMatches()
- [x] **Step 4**: css/styles.css - Added `.match-mvp`, mini-vote-btn styles, responsive
- [x] **Step 5**: reset-mvp.js - Updated to reset all per-match + legacy votes

**Final Task Status**: Per-game MVP complete ✅

**Test**: Open `index.html` - see table with 3 matches + MVP column. Select player per row → vote → see leader display, "Siz səs verdiniz" after. Votes persist on reload. Use reset-mvp.html to clear.

## Next steps (if needed)
- [ ] Add "Əlavə Oyun" button (dynamic add match)


**Post-edit**: Update this TODO.md with [x] checks.

