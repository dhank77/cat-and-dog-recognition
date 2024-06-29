import { Link, router } from "@inertiajs/react";
import Authenticated from "@/layouts/authenticated";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Create({ errors }) {
   const [fileName, setFileName] = useState("");
   const [image, setImage] = useState("");

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         setFileName(file.name);
         setImage(file);
      } else {
         setImage("");
         setFileName("");
      }
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      router.post("/admin/predict/create", { image: image });
   };

   return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
         <div className="flex justify-between">
            <div className="flex items-center">
               <h1 className="text-lg font-semibold md:text-2xl">
                  Recognation
               </h1>
            </div>
            <Button variant="secondary" asChild>
               <Link href="/admin/predict">Back</Link>
            </Button>
         </div>

         <div className="md:w-1/2">
            <Card>
               <CardHeader>
                  <CardTitle>Recognation Image</CardTitle>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleSubmit}>
                     <div className="grid w-full max-w-md items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <label
                           htmlFor="picture"
                           className="cursor-pointer bg-blue-400 text-white dark:bg-blue-700 dark:text-gray-200 py-2 px-4 rounded w-full"
                        >
                           Choose File {fileName && `| (${fileName})`}
                        </label>
                        <Input
                           id="picture"
                           type="file"
                           accept="image/*"
                           onChange={handleFileChange}
                           className="hidden"
                        />
                        {errors?.image && (
                           <div className="text-red-500">
                              {" "}
                              {errors.image}{" "}
                           </div>
                        )}
                     </div>
                     {image && (
                        <div className="mt-4">
                           <img
                              src={URL.createObjectURL(image)}
                              alt="Image"
                              width="1920"
                              className="h-96 w-full object-cover rounded-lg"
                           />
                        </div>
                     )}

                     <div className="flex justify-end">
                        <Button
                           type="submit"
                           className="mt-4 text-white"
                           size="lg"
                        >
                           Save
                        </Button>
                     </div>
                  </form>
               </CardContent>
            </Card>
         </div>
      </main>
   );
}

Create.layout = (page) => <Authenticated children={page} />;
