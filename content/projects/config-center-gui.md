---
id: 2
date: march 5, 2024
image: "images/project/cars.jpg"
technology: ["React.js", "TypeScript", "ReactQuery"]
---

# Config Center GUI

React Typescript app that displays and interacts with multiple internal microservices. Authenticated users could log in using Keycloak and send requests if they had the correct roles in their JWT token.

User could view vehicle data and historical logs, and apply config files to vehicles among other things.

When I joined JLR, this GUI was a JavaScript-only repository with no tests nor linting, and it over relied on dependencies. Over the course of two months, I migrated the substantial sized project to TypeScript, which highlighted a few bugs along the way. Over time, I added Vitest, MSW for mocking API calls, added DataDog monitoring, and removed dependencies like React Bootstrap.
