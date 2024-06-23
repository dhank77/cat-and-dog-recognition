import Authenticated from "@/layouts/authenticated";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Index({ data }) {
   return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
         <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
         </div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead className="w-[50px]">No.</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Option</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.length > 0 &&
                  data[0].map((value, index) => {
                     return (
                        <TableRow key={index}>
                           <TableCell className="font-medium">
                              {index + 1}
                           </TableCell>
                           <TableCell>{value.image}</TableCell>
                           <TableCell>{value.created_at}</TableCell>
                           <TableCell className="text-right">
                              <Button>Choose</Button>
                           </TableCell>
                        </TableRow>
                     );
                  })}
            </TableBody>
         </Table>
      </main>
   );
}

Index.layout = (page) => <Authenticated children={page} />;
