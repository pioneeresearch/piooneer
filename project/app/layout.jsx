import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Pioneer Wealth",
  description: "Financial Planning Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Font Awesome CDN — yehi jagah sahi hai */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      <body className="bg-gray-50 flex flex-col min-h-screen">
        {/* Navbar (Top Section) */}
        <Navbar />

        {/* Main Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer (Bottom Section) */}
        <Footer />
      </body>
    </html>
  );
}
