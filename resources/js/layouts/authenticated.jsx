import { Link } from "@inertiajs/react";
import {
  Bell,
  Package2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/partials/header";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/partials/sidebar";

export default function Authenticated({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">Animals Recognition</span>
              </Link>
            </div>
          <Sidebar />
          </div>
        </div>
        <div className="flex flex-col">
          <Header />
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
