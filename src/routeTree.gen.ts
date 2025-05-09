/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PlaygroundImport } from './routes/playground'
import { Route as ProjectsSlugImport } from './routes/projects/$slug'
import { Route as BlogSlugImport } from './routes/blog/$slug'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()
const ProjectsIndexLazyImport = createFileRoute('/projects/')()
const BlogIndexLazyImport = createFileRoute('/blog/')()
const BlogPrettyTextLazyImport = createFileRoute('/blog/pretty-text')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const PlaygroundRoute = PlaygroundImport.update({
  path: '/playground',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ProjectsIndexLazyRoute = ProjectsIndexLazyImport.update({
  path: '/projects/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/projects/index.lazy').then((d) => d.Route),
)

const BlogIndexLazyRoute = BlogIndexLazyImport.update({
  path: '/blog/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/blog').then((d) => d.Route))

const BlogPrettyTextLazyRoute = BlogPrettyTextLazyImport.update({
  path: '/blog/pretty-text',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/blog/pretty-text.lazy').then((d) => d.Route),
)

const ProjectsSlugRoute = ProjectsSlugImport.update({
  path: '/projects/$slug',
  getParentRoute: () => rootRoute,
} as any)

const BlogSlugRoute = BlogSlugImport.update({
  path: '/blog/$slug',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/playground': {
      id: '/playground'
      path: '/playground'
      fullPath: '/playground'
      preLoaderRoute: typeof PlaygroundImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/blog/$slug': {
      id: '/blog/$slug'
      path: '/blog/$slug'
      fullPath: '/blog/$slug'
      preLoaderRoute: typeof BlogSlugImport
      parentRoute: typeof rootRoute
    }
    '/projects/$slug': {
      id: '/projects/$slug'
      path: '/projects/$slug'
      fullPath: '/projects/$slug'
      preLoaderRoute: typeof ProjectsSlugImport
      parentRoute: typeof rootRoute
    }
    '/blog/pretty-text': {
      id: '/blog/pretty-text'
      path: '/blog/pretty-text'
      fullPath: '/blog/pretty-text'
      preLoaderRoute: typeof BlogPrettyTextLazyImport
      parentRoute: typeof rootRoute
    }
    '/blog/': {
      id: '/blog/'
      path: '/blog'
      fullPath: '/blog'
      preLoaderRoute: typeof BlogIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/projects/': {
      id: '/projects/'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof ProjectsIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/playground': typeof PlaygroundRoute
  '/about': typeof AboutLazyRoute
  '/blog/$slug': typeof BlogSlugRoute
  '/projects/$slug': typeof ProjectsSlugRoute
  '/blog/pretty-text': typeof BlogPrettyTextLazyRoute
  '/blog': typeof BlogIndexLazyRoute
  '/projects': typeof ProjectsIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/playground': typeof PlaygroundRoute
  '/about': typeof AboutLazyRoute
  '/blog/$slug': typeof BlogSlugRoute
  '/projects/$slug': typeof ProjectsSlugRoute
  '/blog/pretty-text': typeof BlogPrettyTextLazyRoute
  '/blog': typeof BlogIndexLazyRoute
  '/projects': typeof ProjectsIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/playground': typeof PlaygroundRoute
  '/about': typeof AboutLazyRoute
  '/blog/$slug': typeof BlogSlugRoute
  '/projects/$slug': typeof ProjectsSlugRoute
  '/blog/pretty-text': typeof BlogPrettyTextLazyRoute
  '/blog/': typeof BlogIndexLazyRoute
  '/projects/': typeof ProjectsIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/playground'
    | '/about'
    | '/blog/$slug'
    | '/projects/$slug'
    | '/blog/pretty-text'
    | '/blog'
    | '/projects'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/playground'
    | '/about'
    | '/blog/$slug'
    | '/projects/$slug'
    | '/blog/pretty-text'
    | '/blog'
    | '/projects'
  id:
    | '__root__'
    | '/'
    | '/playground'
    | '/about'
    | '/blog/$slug'
    | '/projects/$slug'
    | '/blog/pretty-text'
    | '/blog/'
    | '/projects/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  PlaygroundRoute: typeof PlaygroundRoute
  AboutLazyRoute: typeof AboutLazyRoute
  BlogSlugRoute: typeof BlogSlugRoute
  ProjectsSlugRoute: typeof ProjectsSlugRoute
  BlogPrettyTextLazyRoute: typeof BlogPrettyTextLazyRoute
  BlogIndexLazyRoute: typeof BlogIndexLazyRoute
  ProjectsIndexLazyRoute: typeof ProjectsIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  PlaygroundRoute: PlaygroundRoute,
  AboutLazyRoute: AboutLazyRoute,
  BlogSlugRoute: BlogSlugRoute,
  ProjectsSlugRoute: ProjectsSlugRoute,
  BlogPrettyTextLazyRoute: BlogPrettyTextLazyRoute,
  BlogIndexLazyRoute: BlogIndexLazyRoute,
  ProjectsIndexLazyRoute: ProjectsIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/playground",
        "/about",
        "/blog/$slug",
        "/projects/$slug",
        "/blog/pretty-text",
        "/blog/",
        "/projects/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/playground": {
      "filePath": "playground.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/blog/$slug": {
      "filePath": "blog/$slug.tsx"
    },
    "/projects/$slug": {
      "filePath": "projects/$slug.tsx"
    },
    "/blog/pretty-text": {
      "filePath": "blog/pretty-text.lazy.tsx"
    },
    "/blog/": {
      "filePath": "blog/index.lazy.tsx"
    },
    "/projects/": {
      "filePath": "projects/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
