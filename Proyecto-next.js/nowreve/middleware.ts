import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";



const isPublicRoue = createRouteMatcher(["/api/:patch*"])
export default clerkMiddleware({
  
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

