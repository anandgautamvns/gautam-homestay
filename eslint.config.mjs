import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  // ── Next.js + TypeScript base ──────────────────────────────────────────────
  // nextVitals: React, Next.js, accessibility, and Web Vitals rules.
  // nextTs: @typescript-eslint recommended rules + registers the plugin.
  ...nextVitals,
  ...nextTs,

  // ── Import ordering ────────────────────────────────────────────────────────
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. React / Next.js first
            ['^react$', '^react/', '^next$', '^next/'],
            // 2. Other external packages
            ['^@?\\w'],
            // 3. Internal aliases  (@/)
            ['^@/'],
            // 4. Relative imports (parent → sibling → index)
            ['^\\.\\./'],
            ['^\\./', '^\\.'],
            // 5. Type-only imports (kept last within each group by TypeScript)
            ['^.+\\u0000$'],
            // 6. Style / asset imports
            ['^.+\\.s?css$', '^.+\\.(png|svg|jpg|jpeg|webp|gif|ico)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      // Disable the base rule so simple-import-sort owns ordering entirely
      'import/order': 'off',
    },
  },

  // ── Strict TypeScript rules ────────────────────────────────────────────────
  // These extend the @typescript-eslint plugin already registered by nextTs.
  {
    rules: {
      // --- Correctness ---
      // No implicit `any` – use explicit types or `unknown`
      '@typescript-eslint/no-explicit-any': 'error',
      // Catch unused variables; prefix `_` to silence intentionally unused
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // No non-null assertions (`!`) – handle nullability explicitly
      '@typescript-eslint/no-non-null-assertion': 'error',
      // Prefer `as const` over type widening
      '@typescript-eslint/prefer-as-const': 'error',
      // No ts-ignore/ts-expect-error without explanation
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          minimumDescriptionLength: 10,
        },
      ],
      // No empty catch blocks or no-op functions
      '@typescript-eslint/no-empty-function': [
        'warn',
        { allow: ['arrowFunctions', 'functions', 'methods'] },
      ],

      // --- Consistency ---
      // Use `import type` for type-only imports (tree-shake safe)
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      // Use `interface` for object shapes; `type` for unions/aliases
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      // Prefer `Type[]` over `Array<Type>`
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

      // ── General JavaScript / ES6+ ──────────────────────────────────────────
      // Block `console.log` noise in production code; allow warn/error
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Always prefer `const` over `let` when value is never reassigned
      'prefer-const': 'error',
      // Ban `var` – use `const` / `let`
      'no-var': 'error',
      // Enforce strict equality (`===` / `!==`)
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      // No duplicate `import` declarations for the same module
      'no-duplicate-imports': 'error',
      // Prefer object shorthand: `{ foo }` over `{ foo: foo }`
      'object-shorthand': ['error', 'always'],
      // Prefer template literals over string concatenation
      'prefer-template': 'error',
    },
  },

  // ── Prettier – must come last ──────────────────────────────────────────────
  // Disables all ESLint rules that would conflict with Prettier's formatting.
  prettierConfig,

  // ── Ignored paths ─────────────────────────────────────────────────────────
  globalIgnores(['.next/**', 'out/**', 'build/**', 'dist/**', 'node_modules/**', 'next-env.d.ts']),
]);
