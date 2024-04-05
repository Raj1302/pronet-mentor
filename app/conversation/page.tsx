"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import OpenAI from "openai";
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Input } from "@/components/ui/input";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constants";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";

type ExtendedMessage = OpenAI.ChatCompletionMessage & { role: "user" | "assistant" | string };

const ConversationPage = () => {
  // Using useRouter for navigation actions
  const router = useRouter();

  // State for storing chat messages
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);


  // Setting up the form with react-hook-form and zod for validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  // Checking if the form is currently being submitted
  const isLoading = form.formState.isSubmitting;
  
  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Creating a message object for the user's input
      const userMessage = { role: "user", content: values.prompt };
      // Adding the user message to the existing messages
      const newMessages = [...messages, userMessage];
      
      // Sending the updated message list to the server
      const response = await axios.post('/api/conversation', { messages: newMessages });

      // Updating the state with both the user's message and the server's response
      setMessages((current) => [...current, userMessage, response.data]);
      
      // Resetting the form after submission
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        
      } else {
        toast.error("Something went Wrong");
      }
    } finally {
      router.refresh();
    }
  }

  // Render function for the component
  return ( 
    <div>
      <Navbar/>
      <h1 className="pt-36 text-center leading-loose font-semibold text-3xl">Engage with the premier <span className="p-1 bg-sky-500 rounded-lg">LinkedIn coach</span> for<br/> <span className="p-1 bg-yellow-500 rounded-lg">unparalleled</span> guidance.</h1>
      <div className="px-4 lg:px-32 pt-20">
        <div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                rounded-xl 
                bg-zinc-200 dark:bg-zinc-950 
                w-full 
                p-4 
                px-3 
                md:px-6 
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 pl-2 bg-zinc-200 dark:bg-zinc-950 text-zinc-100 rounded-xl">
                      <Input
                        className=" border-0  outline-none placeholder:text-zinc-500"
                        disabled={isLoading} 
                        placeholder="Ask me anything ...." 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="rounded-xl bg-sky-900 hover:bg-zinc-900 col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 bg-zinc-200 dark:bg-zinc-950 rounded-xl w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No Scripts Generated." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div 
              key={message.content}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-xl",
                message.role === "assistant" ? "bg-zinc-200 dark:bg-zinc-950" : "bg-sky-900 text-zinc-200",
              )}
              >
                {message.role === "assistant" ? <BotAvatar /> : <UserAvatar />}
                <div
                  className="text-sm overflow-hidden leading-7"
                  dangerouslySetInnerHTML={{
                    __html: message.content
                      ? message.content.replace(/\n/g, "<br />")
                      : "",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default ConversationPage;