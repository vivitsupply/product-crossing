import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = await createClient();

    // Parse the request body
    const body = await request.json();
    const { compSkus } = body; // Match the client-side key
    console.log(compSkus);

    try {
        // Query the Supabase database
        const { data: crossings, error } = await supabase.from("crossings").select().in("comp-sku", compSkus);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const results = compSkus.map((sku) => {
            const match = crossings.find((item) => item["comp-sku"] === sku);
            return match
                ? match // If found in the database, return the matching entry
                : { "comp-sku": "SKU not in Database" }; // If not found, return a placeholder
        });

        return NextResponse.json({ data: results });
    } catch (err) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
