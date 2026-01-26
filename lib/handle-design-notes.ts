/**
 * Handle Change Strategy - Design Notes
 * =====================================
 * 
 * PROBLEM: If users can change their handle (or it auto-upgrades from Clerk username change),
 * existing links to /u/{old-handle} will break (link rot).
 * 
 * PROPOSED SOLUTIONS:
 * 
 * Option A: Freeze Handle After First Set
 * ----------------------------------------
 * - Once a user has a real handle (not user-xxxxx), it becomes permanent
 * - Users cannot change it, even if they change their Clerk username
 * - Simplest approach, no redirect logic needed
 * - Con: Users stuck with initial handle forever
 * 
 * Option B: Handle History with Redirects (Recommended)
 * ------------------------------------------------------
 * - Add `HandleHistory` model to store previous handles
 * - When handle changes: old handle saved to history with timestamp
 * - /u/[handle] route first checks HandleHistory, then redirects to current handle
 * - Con: Slightly more complex, but enables flexibility
 * 
 * Schema addition:
 * ```prisma
 * model HandleHistory {
 *     id        String   @id @default(cuid())
 *     userId    String
 *     handle    String   @unique  // Old handle
 *     changedAt DateTime @default(now())
 *     user      User     @relation(fields: [userId], references: [id])
 * }
 * ```
 * 
 * Route logic:
 * ```typescript
 * // In /u/[handle]/page.tsx
 * const user = await prisma.user.findUnique({ where: { handle } });
 * if (!user) {
 *     // Check if this is an old handle
 *     const history = await prisma.handleHistory.findUnique({ where: { handle } });
 *     if (history) {
 *         const currentUser = await prisma.user.findUnique({ where: { id: history.userId } });
 *         if (currentUser) {
 *             redirect(`/u/${currentUser.handle}`);
 *         }
 *     }
 *     notFound();
 * }
 * ```
 * 
 * CURRENT STATUS: Handle changes are NOT user-exposed yet.
 * Only auto-upgrade from user-xxxxx → Clerk username on login.
 * 
 * TODO: Before enabling user-facing handle editor:
 * - [ ] Implement HandleHistory model
 * - [ ] Add redirect logic to /u/[handle] route
 * - [ ] Add rate limit on handle changes (e.g., once per 30 days)
 * - [ ] Reserve common handles to prevent squatting
 */

export const HANDLE_DESIGN_NOTES = "See comments above for handle change strategy";
