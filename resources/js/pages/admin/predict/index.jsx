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
import { Link, router } from "@inertiajs/react";
import { formatDate } from "@/lib/utils";

export default function Index({ data }) {

   const deleteData = (id) => {
      if(confirm('Are you sure?')) {
         router.delete(`/admin/predict/delete/${id}`)
      }
   }

   return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
         <div className="flex justify-between">
            <div className="flex items-center">
               <h1 className="text-lg font-semibold md:text-2xl">Predict Image</h1>
            </div>
            <Button variant="default" asChild>
               <Link href="/admin/predict/create" className="text-white">Create</Link>
            </Button>
         </div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead className="w-[50px]">No.</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">#</TableHead>
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
                           <TableCell className="font-medium">
                              {value.user?.first_name ?? 'Admin'}
                           </TableCell>
                           <TableCell>
                              <img src={`/media/${value.image}`} className="w-20 h-14 lg:w-60 lg:h-40" />
                           </TableCell>
                           <TableCell>{formatDate(value.created_at)}</TableCell>
                           <TableCell className="text-right">
                              <Button variant="destructive" size="sm" onClick={() => deleteData(value.id)}>Delete</Button>
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
