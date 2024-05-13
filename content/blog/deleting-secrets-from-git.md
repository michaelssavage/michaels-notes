---
date: may 20, 2024
---

# Deleting sensitive data on Git

Aaah I did it. I'm guilty. I accidentally committed sensitive data to Github. Oops. It was only for a personal project so nothing TOO drastic to worry about. How did I remove the commits and fix this issue?

- First, change the API keys and passwords.
- For handiness, copy the offending file to a Notepad temporarily while you delete file.
- Use `git-filter-repo` to rewrite the history of commits.

## Guide

I used this guide to help me: :pretty-link{ link="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository" text="Github Docs" external }

I'm working on Windows, so I used pip to install git-filter-repo:

```bash
pip install git-filter-repo --user
```

I didn’t have a fresh clone of my project so I force pushed the changes:

```bash
git filter-repo --invert-paths --path "src/folder/TheAffectedFile.jsx" --force
```

After this, I had to sync my local project with my remote Github repository:

```bash
git remote add origin https://github.com/OWNER/REPOSITORY.git
```

Finally, I could push the changes and the commit would be wiped!

```bash
git push origin --force --all
```
