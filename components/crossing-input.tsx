"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
    bio: z.string().refine((value) => value.split("\n").every((line) => /^[a-zA-Z0-9]+$/.test(line.trim())), {
        message: "Each line must contain only letters or numbers, with no special characters.",
    }),
});

export function TextareaForm({ onSubmit, onClear }: { onSubmit: (data: string[]) => void; onClear: () => void }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const handleSubmit = (data: z.infer<typeof FormSchema>) => {
        const skus = data.bio.split("\n").map((line) => line.trim()); // Split the input into lines
        onSubmit(skus); // Pass the data back to the parent component
    };

    const handleClear = () => {
        form.reset({ bio: "" }); // Reset the form's field
        onClear(); // Clear data in parent component
    };

    return (
        <div>
            <h2 className="font-medium mb-4 mt-8">SKU Input</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-[500px] space-y-6">
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>SKU Input</FormLabel> */}
                                <FormControl>
                                    <Textarea placeholder="Enter the SKUs you want crossed" {...field} />
                                </FormControl>
                                <FormDescription>Please only enter one SKU per line</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2">
                        <Button type="submit">Submit</Button>
                        <Button type="button" variant="outline" onClick={handleClear}>
                            Clear
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
