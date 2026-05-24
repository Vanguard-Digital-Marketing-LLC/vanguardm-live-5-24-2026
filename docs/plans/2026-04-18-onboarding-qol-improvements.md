# Onboarding QoL Improvements — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix duplicate fields, add required/optional labels, improve form UX, harden API validation, and add auto-save recovery across the onboarding wizard.

**Architecture:** All changes are in the existing Next.js 16 App Router onboarding system. UI changes touch step components (`components/admin/onboarding/steps/`), API hardening touches route handlers (`app/api/`), and validation adds a shared schema module. No Prisma schema changes needed.

**Tech Stack:** Next.js 16, React (client components), Prisma 7, Vitest, TypeScript

---

## Phase 1: Fix Duplicate Fields & Dropdowns (UI)

### Task 1: Fix Business Category dropdown — remove Industry overlap

**Files:**
- Modify: `components/admin/onboarding/steps/BusinessInfoStep.tsx:84-103`

**Step 1: Replace Business Category options with digital-presence types**

Replace the current `business_category` select options (lines 84-103) with:

```tsx
<div>
  <label className="block text-xs text-slate-400 mb-1">
    Business Category
  </label>
  <select
    className={inputClass}
    value={v("business_category")}
    onChange={(e) => onChange("business_category", e.target.value)}
  >
    <option value="">Select category</option>
    <option value="Web App">Web App</option>
    <option value="Phone App">Phone App</option>
    <option value="Website">Website</option>
    <option value="E-commerce Store">E-commerce Store</option>
    <option value="SaaS Platform">SaaS Platform</option>
    <option value="None (New Build)">None (New Build)</option>
    <option value="Other">Other</option>
  </select>
</div>
```

**Step 2: Rename Industry to Business Objective**

Change the Industry label text (around line 108) from "Industry" to "Business Objective". Keep the same field key `industry` for backward compatibility with saved responses. Update the placeholder from "Select industry" to "Select objective".

**Step 3: Verify in browser**

Load `mentservices.vanguardm.com/admin/onboarding` → open an onboarding → Business Info step. Confirm:
- Business Category shows: Web App, Phone App, Website, E-commerce Store, SaaS Platform, None (New Build), Other
- Business Objective shows the original industry list (Automotive, Construction, etc.)
- No duplicates between the two dropdowns

**Step 4: Commit**

```bash
git add components/admin/onboarding/steps/BusinessInfoStep.tsx
git commit -m "fix: deduplicate Business Category and Industry dropdowns in onboarding"
```

---

### Task 2: Add cross-step propagation notice on WebStep URL field

**Files:**
- Modify: `components/admin/onboarding/steps/WebStep.tsx:78-89`

**Step 1: Add auto-filled notice below WebStep URL**

After the `web_current_url` input (line 88), add a notice when the value matches business_info's website_url. Since WebStep only receives its own `data` prop (not cross-step data), the simplest approach is a static helper note:

```tsx
<p className="text-xs text-slate-500 mt-1">
  Auto-filled from Business Information if provided.
</p>
```

Add this after the closing `</input>` tag for `web_current_url` (line 88).

**Step 2: Commit**

```bash
git add components/admin/onboarding/steps/WebStep.tsx
git commit -m "fix: add auto-fill notice on WebStep URL field"
```

---

### Task 3: Add competitor cross-reference notes to SMA and PPC steps

**Files:**
- Modify: `components/admin/onboarding/steps/SmaStep.tsx:463-471`
- Modify: `components/admin/onboarding/steps/PpcStep.tsx:441-451`

**Step 1: Add note to SMA competitors field**

After the "Competitors to Watch" label (SmaStep.tsx line 463), add:

```tsx
<span className="text-xs text-slate-500 font-normal ml-1">
  (channel-specific — general competitors are in Business Info)
</span>
```

**Step 2: Add note to PPC competitor targeting field**

After the "Competitor targeting?" label (PpcStep.tsx line 443), add the same note pattern.

**Step 3: Commit**

```bash
git add components/admin/onboarding/steps/SmaStep.tsx components/admin/onboarding/steps/PpcStep.tsx
git commit -m "fix: add cross-reference notes for competitor fields across steps"
```

---

## Phase 2: Required/Optional Field Labels

### Task 4: Add required indicator to critical fields in BusinessInfoStep

**Files:**
- Modify: `components/admin/onboarding/steps/BusinessInfoStep.tsx`

**Step 1: Define required fields**

Required fields (must have data before submission):
- `legal_name`, `industry`, `primary_contact_name`, `primary_contact_email`, `primary_contact_phone`, `address_street`, `address_city`, `address_state`, `address_zip`

**Step 2: Add red asterisk to required field labels**

For each required field label, append:

```tsx
<label className="block text-xs text-slate-400 mb-1">
  Legal Name <span className="text-red-400">*</span>
</label>
```

Do NOT add asterisks to optional fields (DBA, tagline, secondary contact, billing contact, etc.).

**Step 3: Add legend at top of step**

After the opening `<div className="space-y-8">` (line 40), add:

```tsx
<p className="text-xs text-slate-500">
  Fields marked <span className="text-red-400">*</span> are required.
</p>
```

**Step 4: Repeat for WebStep, SmaStep, PpcStep, SeoStep**

Apply the same pattern. Required fields per step:
- **WebStep**: `web_current_url`, `web_goal`
- **SmaStep**: at least one platform selected
- **PpcStep**: `ppc_monthly_budget`, `ppc_goal`
- **SeoStep**: `seo_goal`, `seo_target_locations`

**Step 5: Commit**

```bash
git add components/admin/onboarding/steps/*.tsx
git commit -m "feat: add required field indicators across all onboarding steps"
```

---

## Phase 3: Review Step & Submission Validation

### Task 5: Show actual field values in ReviewStep

**Files:**
- Modify: `components/admin/onboarding/steps/ReviewStep.tsx:88-125`

**Step 1: Add expandable data preview per section**

Replace the simple `% completed` display with a toggle that shows non-empty field values. After the section summary (line ~110), add:

```tsx
{expanded[step.key] && (
  <div className="mt-2 space-y-1 text-xs text-slate-400">
    {Object.entries(sectionData)
      .filter(([, v]) => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
      .map(([k, v]) => (
        <div key={k} className="flex gap-2">
          <span className="text-slate-500 min-w-[140px]">{k.replace(/_/g, " ")}:</span>
          <span className="text-slate-300 truncate">{Array.isArray(v) ? v.join(", ") : String(v)}</span>
        </div>
      ))}
  </div>
)}
```

Add `expanded` state: `const [expanded, setExpanded] = useState<Record<string, boolean>>({});`

Add toggle button next to each section heading.

**Step 2: Block submission if required fields empty**

Add validation check before enabling the Submit button. Check `responses["business_info"]` has `legal_name`, `industry`, `primary_contact_name`, `primary_contact_email`. If missing, show which fields are incomplete and disable submit.

**Step 3: Commit**

```bash
git add components/admin/onboarding/steps/ReviewStep.tsx
git commit -m "feat: add data preview and submission validation to ReviewStep"
```

---

### Task 6: Fix progress bar to show 3-state completion

**Files:**
- Modify: `components/admin/onboarding/WizardProgressBar.tsx`

**Step 1: Change checkmark logic**

Replace binary complete/incomplete with three states:
- **Empty** (gray): no data saved for this step
- **Partial** (amber dot): some fields filled but <80%
- **Complete** (green checkmark): >80% of fields filled

Calculate by counting non-empty values vs total expected fields per step (define field counts in `lib/onboarding-steps.ts`).

**Step 2: Commit**

```bash
git add components/admin/onboarding/WizardProgressBar.tsx lib/onboarding-steps.ts
git commit -m "feat: 3-state progress indicator (empty/partial/complete) in wizard"
```

---

## Phase 4: Auto-Save Recovery

### Task 7: Add retry mechanism and localStorage backup

**Files:**
- Modify: `components/admin/onboarding/OnboardingWizard.tsx:58-97`

**Step 1: Add retry on save failure**

Replace the current error handler (line 71-72) with a retry mechanism:

```tsx
const saveStepData = useCallback(
  async (stepKey: string, data: Record<string, unknown>, retries = 2) => {
    setSaveStatus("saving");
    try {
      const res = await fetch(`${apiBase}/responses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepKey, data, currentStep }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaveStatus("saved");
      localStorage.removeItem(`onboarding-draft-${onboardingId}-${stepKey}`);
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      if (retries > 0) {
        setTimeout(() => saveStepData(stepKey, data, retries - 1), 3000);
        return;
      }
      localStorage.setItem(`onboarding-draft-${onboardingId}-${stepKey}`, JSON.stringify(data));
      setSaveStatus("error");
    }
  },
  [apiBase, currentStep, onboardingId]
);
```

**Step 2: Add "Retry" button in error state UI**

In the header area (line 260-265), replace the static error text:

```tsx
{saveStatus === "error" && (
  <button
    onClick={() => {
      const stepKey = currentStepDef?.key;
      if (stepKey && responses[stepKey]) saveStepData(stepKey, responses[stepKey]);
    }}
    className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"
  >
    <Save size={12} />
    Save failed — tap to retry
  </button>
)}
```

**Step 3: Restore from localStorage on mount**

Add to the `useEffect` or initialization:

```tsx
useEffect(() => {
  steps.forEach((step) => {
    const draft = localStorage.getItem(`onboarding-draft-${onboardingId}-${step.key}`);
    if (draft) {
      try {
        const data = JSON.parse(draft);
        setResponses((prev) => ({ ...prev, [step.key]: { ...(prev[step.key] || {}), ...data } }));
      } catch { /* ignore corrupt drafts */ }
    }
  });
}, [onboardingId, steps]);
```

**Step 4: Commit**

```bash
git add components/admin/onboarding/OnboardingWizard.tsx
git commit -m "feat: auto-save retry with localStorage backup for onboarding wizard"
```

---

## Phase 5: API Hardening

### Task 8: Validate stepKey against service types

**Files:**
- Modify: `app/api/onboarding/[token]/responses/route.ts:27-45`
- Modify: `app/api/admin/onboarding/[id]/responses/route.ts:40-55`

**Step 1: Write failing test**

```typescript
// tests/onboarding-validation.test.ts
import { describe, it, expect } from "vitest";
import { isValidStepKey } from "@/lib/onboarding-steps";

describe("isValidStepKey", () => {
  it("allows business_info for any service types", () => {
    expect(isValidStepKey("business_info", ["WEB"])).toBe(true);
  });
  it("allows web for WEB service", () => {
    expect(isValidStepKey("web", ["WEB"])).toBe(true);
  });
  it("rejects ppc for WEB-only service", () => {
    expect(isValidStepKey("ppc", ["WEB"])).toBe(false);
  });
  it("rejects arbitrary keys", () => {
    expect(isValidStepKey("admin_hack", ["WEB"])).toBe(false);
  });
});
```

**Step 2: Run test — verify it fails**

```bash
npx vitest run tests/onboarding-validation.test.ts
```

Expected: FAIL — `isValidStepKey` not exported.

**Step 3: Add `isValidStepKey` to `lib/onboarding-steps.ts`**

```typescript
export function isValidStepKey(stepKey: string, serviceTypes: string[]): boolean {
  const validSteps = getStepsForServices(serviceTypes);
  return validSteps.some((s) => s.key === stepKey);
}
```

**Step 4: Run test — verify it passes**

```bash
npx vitest run tests/onboarding-validation.test.ts
```

**Step 5: Add validation to both API routes**

In `app/api/onboarding/[token]/responses/route.ts`, after fetching the onboarding record, add:

```typescript
import { isValidStepKey } from "@/lib/onboarding-steps";

// After line 30 (where onboarding is fetched):
if (!isValidStepKey(body.stepKey, onboarding.serviceTypes)) {
  return NextResponse.json({ error: "Invalid step for this onboarding" }, { status: 400 });
}
```

Apply same check to `app/api/admin/onboarding/[id]/responses/route.ts`.

**Step 6: Commit**

```bash
git add lib/onboarding-steps.ts tests/onboarding-validation.test.ts app/api/onboarding/[token]/responses/route.ts app/api/admin/onboarding/[id]/responses/route.ts
git commit -m "feat: validate stepKey against service types in onboarding API"
```

---

### Task 9: Add response data size limit

**Files:**
- Modify: `app/api/onboarding/[token]/responses/route.ts`
- Modify: `app/api/admin/onboarding/[id]/responses/route.ts`

**Step 1: Add size check after parsing body**

```typescript
const MAX_RESPONSE_SIZE = 50_000; // 50KB per step response

const bodyStr = JSON.stringify(body.data);
if (bodyStr.length > MAX_RESPONSE_SIZE) {
  return NextResponse.json({ error: "Response data too large" }, { status: 413 });
}
```

Add this check in both client and admin response routes, after `const body = await request.json();`.

**Step 2: Commit**

```bash
git add app/api/onboarding/[token]/responses/route.ts app/api/admin/onboarding/[id]/responses/route.ts
git commit -m "feat: add 50KB size limit on onboarding response data"
```

---

## Phase 6: Admin List & UX Polish

### Task 10: Show step completion % in admin onboarding list

**Files:**
- Modify: `app/admin/onboarding/page.tsx`

**Step 1: Replace response count with step completion fraction**

Change the "Responses" column to show "3/7 steps" format by comparing `_count.responses` with total steps for that onboarding's service types.

**Step 2: Commit**

```bash
git add app/admin/onboarding/page.tsx
git commit -m "feat: show step completion fraction in admin onboarding list"
```

---

### Task 11: Add estimated time indicator to wizard

**Files:**
- Modify: `components/admin/onboarding/OnboardingWizard.tsx`

**Step 1: Add time estimate near header**

After the "Onboarding Questionnaire" subtitle (line 248), add:

```tsx
<p className="text-xs text-slate-500 mt-0.5">
  Estimated time: {steps.length <= 4 ? "10-15" : steps.length <= 6 ? "15-25" : "25-40"} minutes
</p>
```

**Step 2: Commit**

```bash
git add components/admin/onboarding/OnboardingWizard.tsx
git commit -m "feat: add estimated completion time to onboarding wizard"
```

---

## Phase 7: Build, Deploy, Verify

### Task 12: Build, deploy, and verify all changes

**Step 1: Run tests**

```bash
cd /home/vanguardm/public_html && npx vitest run
```

Expected: All tests pass.

**Step 2: Build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 3: Deploy**

```bash
cp -rf .next/static .next/standalone/.next/static
ln -sfn /home/vanguardm/public_html/public .next/standalone/public
chown -R vanguardm:vanguardm .next/
sudo -u vanguardm pm2 restart vanguardm
```

**Step 4: Verify in browser**

Check both `vanguardm.com/admin/onboarding` and `mentservices.vanguardm.com/admin/onboarding`:
- [ ] Business Category shows digital presence types (no overlap with Business Objective)
- [ ] Business Objective shows industry list
- [ ] Required fields have red asterisk
- [ ] Review step shows expandable data preview
- [ ] Progress bar shows 3-state (empty/partial/complete)
- [ ] Auto-save retry works (disconnect network, reconnect, verify save)
- [ ] Admin list shows step completion fraction

**Step 5: Flush PM2 error log and verify zero errors**

```bash
sudo -u vanguardm pm2 flush vanguardm
# Hit both admin panels several times
sudo -u vanguardm cat /home/vanguardm/.pm2/logs/vanguardm-error-0.log
```

Expected: 0 bytes.

---

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| 1 | Tasks 1-3 | Fix duplicate fields & dropdowns |
| 2 | Task 4 | Required/optional field labels |
| 3 | Tasks 5-6 | Review step & progress bar |
| 4 | Task 7 | Auto-save recovery |
| 5 | Tasks 8-9 | API validation hardening |
| 6 | Tasks 10-11 | Admin list & UX polish |
| 7 | Task 12 | Build, deploy, verify |
