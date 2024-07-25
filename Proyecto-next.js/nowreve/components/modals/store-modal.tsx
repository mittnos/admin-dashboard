"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

//parte del formulario
const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const StoreModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);

    try {
      setLoading(true);
      // throw new Error("error");
      const response = await axios.post("/api/stores", values);
      console.log(response.data);
      window.location.assign(`/${response.data.id}`)


    } catch (error) {
      toast.error("Error creating store");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Create a new store"
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Name</FormLabel>
                      <FormControl>
                        <Input 
                        disabled={loading}
                        {...field} 
                        placeholder="Name" />
                      </FormControl>
                     <FormMessage/>
                   
                  </FormItem>
                )}
              >
                
              </FormField>
              <div className="pt-6 space-x-2 flex items-center justify-end">
               <Button  disabled={loading}   variant="outline" onClick={StoreModal.onClose}>cancel</Button>
               <Button  disabled={loading} type="submit">continue</Button>

              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
