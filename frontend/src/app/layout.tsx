import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

//RootLayout wraps all pages: includes Header, Footer, and main content
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Set theme BEFORE first paint to avoid flash */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
(function () {
    try {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
            document.documentElement.setAttribute("data-theme", stored);
            return;
        }

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute(
            "data-theme",
            prefersDark ? "dark" : "light"
        );
    } catch (e) {}
})();
                        `,
					}}
				/>
			</head>

			{/* Body is flex column for header + main + footer layout */}
			<body className="flex flex-col min-h-screen">
				{/* Header component: contains navigation */}
				<Header />

				{/* Main content container */}
				<main className="flex-1 max-w-4xl w-full px-4 py-6 mx-auto sm:px-6 lg:px-8">
					{children}
				</main>

				{/* Footer component: contains copyright / links */}
				<Footer />
			</body>
		</html>
	);
}
