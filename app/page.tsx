"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { supabase } from "../supabase"


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().optional(),
  inquiryType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  contactMethod: z.enum(["email", "phone"], {
    required_error: "Please select a preferred contact method",
  }),
  source: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});


const countryCodes = [
  { value: "+1", label: "United States (+1)" },
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+91", label: "India (+91)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+86", label: "China (+86)" },
  { value: "+81", label: "Japan (+81)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+33", label: "France (+33)" },
  { value: "+39", label: "Italy (+39)" },
  { value: "+7", label: "Russia (+7)" },
];

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "",
      phone: "",
      inquiryType: "",
      message: "",
      contactMethod: "email",
      source: "",
      terms: false,
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const name = form.watch("name");
    const email = form.watch("email");
    const countryCode = form.watch("countryCode"); // example field
    const phone = `${countryCode}${form.watch("phone")}`;
    const typeOfInquiry = form.watch("inquiryType");
    const message = form.watch("message");
    const contactMethod = form.watch("contactMethod");
    const source = form.watch("source");

    const { data, error } = await supabase.from('Form').insert([
      {
        name,
        email,
        phone,
        typeOfInquiry,
        message,
        contactMethod,
        source
      }
    ]);

    if (error) {
      console.error("Insert error:", error);
    } else {
      toast.success("Form submitted successfully!", {
        description: "We'll get back to you soon.",
      });
    }
    console.log(values);
    form.reset();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="px-8 font-poppins font-bold">
            Contact Us
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-poppins font-bold">Get in Touch</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins font-bold">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins font-bold">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-poppins font-bold">Country Code</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countryCodes.map((code) => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-poppins font-bold">Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="inquiryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins font-bold">Type of Inquiry</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an inquiry type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins font-bold">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your inquiry or use case..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-poppins font-bold">Preferred Contact Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="email" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email
                            </div>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="phone" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Phone
                            </div>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins font-bold">How Did You Hear About Us?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="advertisement">Advertisement</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-poppins font-bold">
                        I agree to the terms and conditions
                      </FormLabel>
                      <FormDescription>
                        By submitting this form, you agree to our{" "}
                        <a href="#" className="text-primary underline">
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary underline">
                          Terms of Service
                        </a>
                        .
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Inquiry
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </main>
  );
}