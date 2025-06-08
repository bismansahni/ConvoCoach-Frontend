This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Here's a standard Git commit practice for your organization on GitHub:

### Standard Commit Practice:

1. **Commit Message Structure**:

   - **Format**: `type(scope): summary`
   - **Example**: `feat(auth): add user authentication endpoint`

2. **Types**:

   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code formatting, no impact on code behavior
   - `refactor`: Code change that neither fixes a bug nor adds a feature
   - `test`: Adding or modifying tests
   - `chore`: Other changes, like build tasks, package manager configs, etc.

3. **Summary**:

   - Briefly describe the change in the imperative form (e.g., "add" not "added").
   - Limit to 50-72 characters.

4. **Scope (Optional)**:

   - Indicates the section of the codebase affected (e.g., auth, UI).

5. **Detailed Body (Optional)**:

   - Separate from the summary by a blank line.
   - Explains _what_ and _why_, not _how_.
   - If relevant, reference related issues or PRs (e.g., “Resolves #123”).

6. **Footer (Optional)**:
   - Adds references to issues, breaking changes, or other notes.
   - Example: `BREAKING CHANGE: removes old authentication method`

### Example Commit Messages:

- `feat(login): implement OAuth 2.0`
- `fix(user-profile): resolve crash on load`
- `docs(readme): update installation guide`
- `chore(deps): update dependencies`

By adopting this practice, your team can maintain consistency and clarity across all commits, aiding collaboration and tracking changes efficiently.
