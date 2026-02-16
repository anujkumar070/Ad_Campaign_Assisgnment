
# EXPLANATION

## 1. Optimistic UI
Optimistic UI gives instant feedback and better UX. Challenges include race conditions, reverting state on failure, and keeping consistency with rapid updates.

## 2. API Security
API keys are weak (static, leakable, no user context). Real apps use OAuth/JWT with roles & expiration.

## 3. Performance
Bottlenecks:
- Large DOM lists → use virtualization (react-window)
- Frequent re-renders → memoization, pagination, server filtering
