import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

const nextAuth: unknown = NextAuth(authOptions);
export default nextAuth;
