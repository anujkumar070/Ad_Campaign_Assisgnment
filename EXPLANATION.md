
# EXPLANATION

## 1. Optimistic UI
Optimistic UI gives instant feedback and better UX. Challenges include race conditions, reverting state on failure, and keeping consistency with rapid updates.

Scanerios:
If the API fails, the UI must revert to the previous state
Multiple quick updates can cause race conditions
Client state can temporarily differ from server data

So we must store the previous state and handle rollback on failure.

## 2. API Security
API keys are weak (static, leakable, no user context). Real apps use OAuth/JWT with roles & expiration.
Use JWT-based authentication. 
With JWT tokens : 
-> Once can identify the user
-> Can Expire access after a time
-> Get Support roles/permissions related to  Users
JWT are widely used in production apps.

## 3. Performance
Bottlenecks:
- Large DOM lists -> use virtualization (react-window)
- Frequent re-renders -> Memoization (React.memo, useMemo), pagination, server filtering
