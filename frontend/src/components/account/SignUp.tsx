"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function signUp(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);

		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		setLoading(false);

		if (error) {
			alert(error.message);
		} else {
			router.push("/account/claim");
		}
	}

	return (
		<main className="max-w-5xl mx-auto px-4 py-16 space-y-16">
			{/* HERO */}
			<section className="text-center space-y-4">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
					Create your Yearly Go account
				</h1>
				<p className="text-lg max-w-2xl mx-auto">
					Start tracking yearly goals and collaborating with your
					groups.
				</p>
			</section>

			{/* FORM */}
			<section className="max-w-2xl mx-auto space-y-8">
				<form
					onSubmit={signUp}
					aria-busy={loading}
					className="space-y-6"
				>
					<div className="space-y-2">
						<label
							htmlFor="email"
							className="block text-sm font-medium"
						>
							Email address
						</label>
						<input
							id="email"
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="
								w-full rounded-lg px-4 py-3
								bg-card border border-border
								text-text placeholder:text-text-muted
								focus-visible:outline-none
								focus-visible:ring-2
								focus-visible:ring-border
							"
							placeholder="you@example.com"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="password"
							className="block text-sm font-medium"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							autoComplete="new-password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="
								w-full rounded-lg px-4 py-3
								bg-card border border-border
								text-text placeholder:text-text-muted
								focus-visible:outline-none
								focus-visible:ring-2
								focus-visible:ring-border
							"
							placeholder="At least 8 characters"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="
							w-full px-4 py-3 rounded-lg
							disabled:opacity-60
							disabled:cursor-not-allowed
						"
					>
						{loading ? "Creating account…" : "Create account"}
					</button>
				</form>

				{/* SECONDARY CTA */}
				<div className="text-center space-y-3">
					<p className="text-sm text-text-muted">
						Already have an account?
					</p>
					<Link href="/account/signin">
						<button className="px-4 py-2 rounded-lg">
							Sign in instead
						</button>
					</Link>
				</div>
			</section>
		</main>
	);
}
