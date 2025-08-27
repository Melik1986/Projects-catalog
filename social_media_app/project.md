# Frontend Codebase Analysis: social_media_app-main (Snapgram)

## 🖼 Project Showcase
- **Type**: Social app (feed, profile, create/edit posts).
- **Core user scenarios**:
  - Authenticate (sign in/up) and persist session.
  - Create/edit posts with media upload and validation.
  - Browse feed/explore, like/save, view profiles with user posts.
- **How tech/architecture supports scenarios**:
  - React Query manages server state, caching, and invalidation around Appwrite SDK.
  - React Hook Form + Zod provide robust form UX and schema validation.
  - Layout split into public (AuthLayout) and private (RootLayout) routes.

## 📁 Project Structure
- `src/_auth/` — public routes, auth forms.
- `src/_root/` — private routes, global shell.
- `src/components/` — `forms/`, `shared/`, `ui/` (toaster, inputs).
- `src/lib/` — Appwrite API client and React Query hooks.
- `src/context/` — `AuthContext` for user/session.

What folders solve:
- `lib/react-query/queries.ts` — wraps Appwrite SDK with typed hooks and cache keys.
- `components/forms/PostForm.tsx` — form state + Zod validation + mutations.
- `context/AuthContext.tsx` — lifts user to context to avoid prop drilling.

Organization: feature/layer-based; separation of auth vs app routes improves clarity and guards.

## 🛠 Tech Stack

| Technology | Version | Role in the project |
|---|---:|---|
| React | 18.2.0 | UI rendering, hooks-based architecture |
| Vite | 4.4.x | Fast dev server/build |
| TypeScript | ^5 | Strict typing for forms, API, and hooks |
| Tailwind CSS | 3.3.x | Utility-first styling and design tokens |
| @tanstack/react-query | 4.36.x | Server state, cache, mutations, invalidation |
| appwrite | 13.x | Backend SDK for auth and CRUD |
| react-hook-form + zod | 7.x + 3.x | Forms with schema validation |
| Radix UI/Shadcn | 1.x | Accessible UI primitives |

Notable solutions:
- Query keys and targeted `invalidateQueries` keep feed fresh after mutations.
- Zod schemas shared between form and mutation payloads to ensure consistency.

## 🏗 Architecture
- Component patterns: composition + controlled forms.
- State: React Query for server state; context for user; local state for UI-only.
- API: Appwrite SDK wrapped by `lib/appwrite/api` and consumed via React Query hooks.

Examples:
React Query mutation with invalidation
```ts
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
  });
};
```
Form with Zod validation
```tsx
const form = useForm<z.infer<typeof PostValidation>>({ resolver: zodResolver(PostValidation) });
const { mutateAsync: createPost } = useCreatePost();
const onSubmit = (v: z.infer<typeof PostValidation>) => createPost({ ...v, userId: user.id });
```
Task solved: reliable CRUD UX with optimistic freshness and safe inputs.

## 🎨 UI and Styling
- Tailwind CSS utilities; Shadcn UI elements for form/accessibility.
- Responsive layouts via flex/grid utilities.
- Strengths: consistent styling and component API.
- Risks: utility bloat in complex nodes — consider extracting to components.

## ✅ Code Quality
- ESLint, Prettier, TS-ESLint, Tailwind plugin.
- Strong TS types across forms and queries.
- Tests: not present; add unit tests for hooks and form validation, and E2E for auth flow.

## 🔧 Key Modules
1) `AuthLayout` / `RootLayout`
- Purpose: route-based access control and app shell.

2) `PostForm`
- Purpose: create/edit post; integrates file uploads and validation.
- Dependencies: react-hook-form, zod, React Query.

3) `lib/react-query/queries.ts`
- Purpose: typed data access layer with caching/invalidation.

## 🌟 Best Practices
- Strict typing for DTOs; shared schemas.
- React Query cache keys and targeted invalidation.
- Separation of public/private routes.

## 🚀 Infrastructure
- Scripts: `dev`, `build` (tsc + vite), `preview`, `lint`.
- Prettier + ESLint keep consistency; Vercel config present.

## 📋 Conclusions and Recommendations
- Strengths: robust data layer, strong forms, clean routing.
- Improvements: add tests; standardize error boundaries and loading skeletons.
- Level: middle.