import { NextResponse } from 'next/server';
export declare function POST(request: Request): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    token: any;
    user: {
        id: any;
        email: any;
        name: any;
    };
}>>;
