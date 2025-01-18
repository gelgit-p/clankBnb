/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const TokenomicsLazyImport = createFileRoute('/tokenomics')()
const RoadmapLazyImport = createFileRoute('/roadmap')()
const HomepageLazyImport = createFileRoute('/homepage')()
const CreatelistingLazyImport = createFileRoute('/createlisting')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TokenomicsLazyRoute = TokenomicsLazyImport.update({
  id: '/tokenomics',
  path: '/tokenomics',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/tokenomics.lazy').then((d) => d.Route))

const RoadmapLazyRoute = RoadmapLazyImport.update({
  id: '/roadmap',
  path: '/roadmap',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/roadmap.lazy').then((d) => d.Route))

const HomepageLazyRoute = HomepageLazyImport.update({
  id: '/homepage',
  path: '/homepage',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/homepage.lazy').then((d) => d.Route))

const CreatelistingLazyRoute = CreatelistingLazyImport.update({
  id: '/createlisting',
  path: '/createlisting',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/createlisting.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

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
    '/createlisting': {
      id: '/createlisting'
      path: '/createlisting'
      fullPath: '/createlisting'
      preLoaderRoute: typeof CreatelistingLazyImport
      parentRoute: typeof rootRoute
    }
    '/homepage': {
      id: '/homepage'
      path: '/homepage'
      fullPath: '/homepage'
      preLoaderRoute: typeof HomepageLazyImport
      parentRoute: typeof rootRoute
    }
    '/roadmap': {
      id: '/roadmap'
      path: '/roadmap'
      fullPath: '/roadmap'
      preLoaderRoute: typeof RoadmapLazyImport
      parentRoute: typeof rootRoute
    }
    '/tokenomics': {
      id: '/tokenomics'
      path: '/tokenomics'
      fullPath: '/tokenomics'
      preLoaderRoute: typeof TokenomicsLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/createlisting': typeof CreatelistingLazyRoute
  '/homepage': typeof HomepageLazyRoute
  '/roadmap': typeof RoadmapLazyRoute
  '/tokenomics': typeof TokenomicsLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/createlisting': typeof CreatelistingLazyRoute
  '/homepage': typeof HomepageLazyRoute
  '/roadmap': typeof RoadmapLazyRoute
  '/tokenomics': typeof TokenomicsLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/createlisting': typeof CreatelistingLazyRoute
  '/homepage': typeof HomepageLazyRoute
  '/roadmap': typeof RoadmapLazyRoute
  '/tokenomics': typeof TokenomicsLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/createlisting' | '/homepage' | '/roadmap' | '/tokenomics'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/createlisting' | '/homepage' | '/roadmap' | '/tokenomics'
  id:
    | '__root__'
    | '/'
    | '/createlisting'
    | '/homepage'
    | '/roadmap'
    | '/tokenomics'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  CreatelistingLazyRoute: typeof CreatelistingLazyRoute
  HomepageLazyRoute: typeof HomepageLazyRoute
  RoadmapLazyRoute: typeof RoadmapLazyRoute
  TokenomicsLazyRoute: typeof TokenomicsLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  CreatelistingLazyRoute: CreatelistingLazyRoute,
  HomepageLazyRoute: HomepageLazyRoute,
  RoadmapLazyRoute: RoadmapLazyRoute,
  TokenomicsLazyRoute: TokenomicsLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/createlisting",
        "/homepage",
        "/roadmap",
        "/tokenomics"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/createlisting": {
      "filePath": "createlisting.lazy.tsx"
    },
    "/homepage": {
      "filePath": "homepage.lazy.tsx"
    },
    "/roadmap": {
      "filePath": "roadmap.lazy.tsx"
    },
    "/tokenomics": {
      "filePath": "tokenomics.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
