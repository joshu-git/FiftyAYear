import Link from "next/link";

// Feature card
function Feature({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="bg-card p-6 space-y-2 hover-card">
			<h2 className="font-semibold text-lg text-text">{title}</h2>
			<p className="text-sm text-text-muted">{description}</p>
		</div>
	);
}

// Quick Stats
function QuickStats() {
	const stats = [
		{ label: "Entries", value: 0 },
		{ label: "Participants", value: 0 },
		{ label: "Groups", value: 0 },
	];

	return (
		<div className="flex justify-center gap-6 text-text-subtle text-sm md:text-base mt-2">
			{stats.map((stat, index) => (
				<div key={index} className="flex items-center gap-1">
					<span className="font-semibold">{stat.value}</span>
					<span>{stat.label}</span>
				</div>
			))}
		</div>
	);
}

// Home Page
export default function HomePage() {
	return (
		<div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
			{/* HERO */}
			<section className="text-center space-y-4 md:space-y-6">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
					Group Challenges
				</h1>

				<p className="text-lg max-w-2xl mx-auto">
					Create a group, set a yearly goal, and track progress
					together. Simple challenges, clear progress, and quiet
					accountability.
				</p>

				<QuickStats />

				<div className="flex justify-center gap-4 pt-4">
					<Link href="/groups">
						<button className="px-4 py-2 rounded-lg">
							View Groups
						</button>
					</Link>

					<Link href="/groups/new">
						<button className="px-4 py-2 rounded-lg">
							Create A Group
						</button>
					</Link>
				</div>
			</section>

			{/* FEATURES */}
			<section className="grid md:grid-cols-3 gap-6">
				<Feature
					title="Yearly Goals"
					description="Set a goal for the year and track progress over time. Books, workouts, runs, or anything countable."
				/>
				<Feature
					title="Group Progress"
					description="See how everyone in your group is progressing without leaderboards or pressure."
				/>
				<Feature
					title="Simple Tracking"
					description="Log entries in seconds and watch percentages update automatically."
				/>
			</section>

			{/* CTA */}
			<section className="bg-card p-10 text-center space-y-4">
				<h2 className="text-2xl font-bold">
					Ready to start a challenge?
				</h2>
				<p>Sign in, create a group, and set your first yearly goal.</p>

				<Link href="/account/signin">
					<button className="mt-2 px-4 py-2 rounded-lg">
						Sign In
					</button>
				</Link>
			</section>
		</div>
	);
}
