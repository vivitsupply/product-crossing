import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Login(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
    return (
        <form className="flex-1 flex flex-col w-[400px] m-auto">
            <h1 className="text-2xl font-medium text-center">Product Crossing Portal</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                </div>
                <Input type="password" name="password" placeholder="Your password" required />
                <SubmitButton pendingText="Signing In..." formAction={signInAction}>
                    Sign in
                </SubmitButton>
                <FormMessage message={searchParams} />
            </div>
        </form>
    );
}
