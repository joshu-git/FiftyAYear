"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function signIn(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setLoading(false);
			alert(error.message);
			return;
		}

		const userId = data.user.id;

		const { data: player } = await supabase
			.from("players")
			.select("username")
			.eq("user_id", userId)
			.maybeSingle();

		setLoading(false);

		if (player && player.username) {
			router.push(`/profile/${player.username}`);
		} else {
			router.push("/account/claim");
		}
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-16">
			<div className="max-w-md mx-auto bg-card p-8 rounded-xl space-y-6">
				{/* Header */}
				<div className="text-center space-y-2">
					<h1 className="text-2xl font-bold tracking-tight">
						Sign In
					</h1>
					<p className="text-sm text-text-muted">
						Access your account and continue your progress.
					</p>
				</div>

				{/* Form */}
				<form onSubmit={signIn} className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm font-medium text-text-subtle">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="
                                w-full rounded-lg px-3 py-2
                                bg-background border border-border
                                focus:outline-none focus:ring-1 focus:ring-border
                            "
						/>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium text-text-subtle">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="
                                w-full rounded-lg px-3 py-2
                                bg-background border border-border
                                focus:outline-none focus:ring-1 focus:ring-border
                            "
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="
                            w-full py-2.5 rounded-lg
                            bg-foreground text-background
                            font-medium
                            hover:opacity-90
                            transition
                        "
					>
						{loading ? "Signing In..." : "Sign In"}
					</button>
				</form>

				{/* Footer */}
				<div className="text-center space-y-3 pt-2">
					<p className="text-sm text-text-muted">
						Don’t have an account?
					</p>

					<Link
						href="/account/signup"
						className="
                            inline-block w-full py-2 rounded-lg
                            border border-border
                            text-sm font-medium
                            hover:bg-muted transition
                        "
					>
						Create Account
					</Link>
				</div>
			</div>
		</div>
	);
}
