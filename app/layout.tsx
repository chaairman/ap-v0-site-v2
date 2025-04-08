import type React from "react";
import "./globals.css"; // Keep this one at the top
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
// Assuming ThemeProvider comes from next-themes or a wrapper around it
// Make sure this path is correct for your project structure
import { ThemeProvider } from "@/components/theme-provider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Amara & Partners LLC | Legal consultancy",
  description:
    "A modern legal consultancy based in Abu Dhabi offering innovative legal solutions with a commercial approach and regional expertise.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Add suppressHydrationWarning to the element modified by ThemeProvider (<html> tag because of attribute="class")
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          // Add this prop for smoother theme changes
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// Remove the duplicate import from the end of the original file if it was there.