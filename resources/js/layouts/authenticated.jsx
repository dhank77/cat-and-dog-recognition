import { Link, usePage } from "@inertiajs/react";
import { AlertCircle, CheckCheckIcon, Package2 } from "lucide-react";
import { Header } from "@/components/partials/header";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/partials/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Authenticated({ children }) {
   const { flash } = usePage().props;

   (flash && flash.messages !== '') && toast(flash.messages, {
      icon : (flash.type == 'success' ? <CheckCheckIcon className="text-green-500"/> : <AlertCircle className="text-red-500" />)
   });

   return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <Toaster />
         <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
               <div className="flex h-full max-h-screen flex-col gap-2">
                  <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                     <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                     >
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
