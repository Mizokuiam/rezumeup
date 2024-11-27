import { NextResponse } from "next/server";

// Define the structure of the response data for success and error cases
interface User {
  id: string;
  email: string;
  name: string | null;
}

interface ErrorResponse {
  error: string;
}

export declare function POST(req: Request): Promise<NextResponse<ErrorResponse | { user: User }>>;
