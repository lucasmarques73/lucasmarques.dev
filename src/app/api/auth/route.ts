import { auth } from "@/app/api";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  return auth(request);
}
