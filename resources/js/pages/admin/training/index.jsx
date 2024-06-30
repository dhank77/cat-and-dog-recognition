import { Button } from "@/components/ui/button";
import Authenticated from "@/layouts/authenticated";
import { Link } from "@inertiajs/react";

export default function Index({ categories }) {
   return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
         <div className="flex justify-between">
            <div className="flex items-center">
               <h1 className="text-lg font-semibold md:text-2xl">
                  Training Index
               </h1>
            </div>
            <Button asChild>
               <Link href="/admin/training/run" className="text-white">Process New Model</Link>
            </Button>
         </div>
         <div className="p-5">
            <h5 className="font-semibold">List of Categories</h5>
            <ol>
               {categories.map((value, index) => {
                  return (
                     <li className="ml-5 mb-2" key={index}>
                       {index + 1}. {value.toUpperCase()}
                     </li>
                  );
               })}
            </ol>
         </div>
      </main>
   );
}

Index.layout = (page) => <Authenticated children={page} />;
