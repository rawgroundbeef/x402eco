# Roadmap: x402.eco

## Overview

Transform x402.eco from a hardcoded educational site into a community-maintained ecosystem directory. Move from static data in lib/data.ts to file-based JSON entries organized by category, add logo management, populate all ~80 entries from x402.org, and create contributor documentation that makes PR submissions straightforward.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Data Structure** - File-based ecosystem entry system
- [x] **Phase 2: Ecosystem Display** - Integrate file loading into UI components
- [ ] **Phase 3: Logo Management & Content Population** - Local logos and full x402.org migration
- [ ] **Phase 4: Contributor Experience** - Documentation for community PRs

## Phase Details

### Phase 1: Data Structure
**Goal**: Ecosystem entries stored as individual JSON files with TypeScript validation
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04
**Success Criteria** (what must be TRUE):
  1. Ecosystem entries exist as individual JSON files in data/ecosystem/{category}/{entry-slug}.json
  2. Each entry JSON contains name, description, url, category, and logo path fields
  3. TypeScript types are generated or validated from schema
  4. Directory structure supports 4 ecosystem categories
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Schema, types, directory structure, and sample JSON entries
- [x] 01-02-PLAN.md — Data loader utility to read JSON files at build time

### Phase 2: Ecosystem Display
**Goal**: Ecosystem grid renders entries from JSON files across all categories
**Depends on**: Phase 1
**Requirements**: ECO-01, ECO-02, ECO-03, ECO-04, ECO-05
**Success Criteria** (what must be TRUE):
  1. Client-Side Integrations category displays correctly from JSON files
  2. Services & Endpoints category displays correctly from JSON files
  3. Infrastructure & Tooling category displays correctly from JSON files
  4. Learning & Community category displays correctly from JSON files
  5. Ecosystem grid component loads and renders entries from file system
**Plans**: 1 plan

Plans:
- [x] 02-01-PLAN.md — Server component integration for ecosystem display

### Phase 3: Logo Management & Content Population
**Goal**: All x402.org ecosystem entries populated with local logos
**Depends on**: Phase 2
**Requirements**: LOGO-01, LOGO-02, LOGO-03, POP-01, POP-02, POP-03, POP-04, POP-05
**Success Criteria** (what must be TRUE):
  1. Logos are stored in public/logos/ directory and referenced in entry JSON files
  2. Fallback display renders when logos are missing
  3. All Client-Side Integrations from x402.org exist as JSON entries
  4. All Services & Endpoints from x402.org exist as JSON entries
  5. All Infrastructure & Tooling from x402.org exist as JSON entries
  6. All Learning & Community from x402.org exist as JSON entries
  7. All logos are downloaded and stored locally
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 4: Contributor Experience
**Goal**: Contributors can add new ecosystem entries via PR with clear guidance
**Depends on**: Phase 3
**Requirements**: CONTRIB-01, CONTRIB-02, CONTRIB-03
**Success Criteria** (what must be TRUE):
  1. README documents step-by-step how to add new ecosystem entries
  2. Entry schema is documented with working examples
  3. PR template exists and guides contributors through submission checklist
**Plans**: TBD

Plans:
- [ ] TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Data Structure | 2/2 | Complete | 2026-01-23 |
| 2. Ecosystem Display | 1/1 | Complete | 2026-01-23 |
| 3. Logo Management & Content Population | 0/TBD | Not started | - |
| 4. Contributor Experience | 0/TBD | Not started | - |
