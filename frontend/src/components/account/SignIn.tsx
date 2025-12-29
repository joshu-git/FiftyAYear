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
		<div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
			{/* HERO */}
			<section className="text-center space-y-4">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
					Sign In
				</h1>
				<p className="text-lg max-w-2xl mx-auto">
					Access your account to join groups and track your yearly
					challenges.
				</p>
			</section>

			{/* FORM */}
			<section className="bg-card p-10 max-w-2xl mx-auto space-y-6">
				<form onSubmit={signIn} className="space-y-5">
					<div className="space-y-1">
						<label className="text-sm font-medium">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="
								w-full rounded-lg px-3 py-2
								bg-background
								border border-border
							"
						/>
					</div>

					<div className="space-y-1">
						<label className="text-sm font-medium">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="
								w-full rounded-lg px-3 py-2
								bg-background
								border border-border
							"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full px-4 py-2 rounded-lg"
					>
						{loading ? "Signing In..." : "Sign In"}
					</button>
				</form>

				<div className="text-center text-sm text-text-muted">
					Don’t have an account?
				</div>

				<Link href="/account/signup">
					<button className="w-full px-4 py-2 rounded-lg">
						Create Account
					</button>
				</Link>
			</section>
		</div>
	);
}
