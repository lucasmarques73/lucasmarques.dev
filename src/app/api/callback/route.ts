import { callback } from "@/app/api";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  return callback(request);
}
