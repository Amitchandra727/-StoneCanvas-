// Clerk middleware disabled until authentication is configured
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher([
//   '/account(.*)',
//   '/checkout(.*)',
//   '/admin(.*)',
// ])

// const isAdminRoute = createRouteMatcher([
//   '/admin(.*)',
// ])

// export default clerkMiddleware((auth, req) => {
//   if (isAdminRoute(req)) {
//     auth().protect((has) => has({ role: 'admin' }))
//   }
  
//   if (isProtectedRoute(req)) {
//     auth().protect()
//   }
// })

export default function middleware(req: Request) {
  // Middleware disabled - no authentication required
  return
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
