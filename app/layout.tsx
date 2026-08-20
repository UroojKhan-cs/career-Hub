
import Navbar from "@/components/shared/Navbar";
import "./globals.css";
import Footer from "@/components/shared/Footer";



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        
        <div className="overflow-hidden">

          <Navbar />

          {children}

          <Footer />
        </div>
        
        </body>
    </html>
  );
}
