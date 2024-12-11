import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { TextareaForm } from "@/components/crossing-input";
import CrossingClient from "@/components/crossing-client";

export default async function Index() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <div className="max-w-screen-xl px-5 m-auto">
            <h1 className="text-center text-2xl font-medium">Product Crossing Portal</h1>
            <CrossingClient />
        </div>
    );
}
