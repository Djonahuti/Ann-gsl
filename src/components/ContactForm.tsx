// components/ContactCTA.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_WEB_APP_URL;

if (!GOOGLE_SHEET_URL) {
  console.error("VITE_GOOGLE_WEB_APP_URL missing!");
}

const contactSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(5, "Message too short"),
  newsletter: z.boolean(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactCTA() {
  const { control, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: "bus-hire-purchase",
      newsletter: false,
      company: "",
    }
  });

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    if (!GOOGLE_SHEET_URL) {
      toast.error("Form not configured.");
      return;
    }

    try {
      // 1. Supabase
      const { error: sbError } = await supabase.from("contact_us").insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        subject: data.service,
        message: data.message,
        newsletter: data.newsletter,
      }]);
      if (sbError) throw sbError;

      // 2. Google Sheets + Email
      const res = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Network error");

      const result = await res.json();
      if (result.status !== "success") throw new Error("Sheets failed");

      toast.success("Message sent! Check your email.");
      reset();
    } catch (err) {
      console.error("Failed:", err);
      toast.error("Failed. Call us directly: +234 809 348 7556");
    }
  };

  return (
    <section className="py-24 px-6 bg-linear-to-b from-gray-50 to-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900">Ready to Start Investing?</h2>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            Get in touch with our expert team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}>
            <Card className="p-10 shadow-2xl bg-white border-0">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Phone", text: "+234 809 348 7556\n9am – 5pm WAT" },
                  { icon: Mail, title: "Email", text: "customerservices@annhurst-gsl.com" },
                  { icon: MapPin, title: "Location", text: "Lagos, Nigeria" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="p-3 bg-red-100 rounded-full"><item.icon className="w-6 h-6 text-red-600" /></div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}>
            <Card className="p-10 shadow-2xl bg-white border-0">
              <h3 className="text-2xl font-bold mb-2">Send Us a Message</h3>
              <p className="text-gray-600 mb-8">We reply within 24 hours.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {["name", "email", "phone", "company"].map((field) => (
                  <div key={field}>
                    <Label>{field === "company" ? "Company (Optional)" : field.charAt(0).toUpperCase() + field.slice(1)} {field !== "company" && "*"}</Label>
                    <Controller
                      name={field as keyof ContactFormData}
                      control={control}
                      render={({ field: f }) => (
                        <Input
                          {...f}
                          value={String(f.value || "")}
                          placeholder={field === "phone" ? "+234..." : ""}
                          className="mt-2"
                        />
                      )}
                    />
                    {errors[field as keyof typeof errors] && (
                      <p className="text-red-500 text-sm mt-1">{(errors[field as keyof typeof errors] as any)?.message}</p>
                    )}
                  </div>
                ))}

                <div>
                  <Label>Investment Interest</Label>
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value || ""} onValueChange={field.onChange}>
                        <SelectTrigger className="mt-2"><SelectValue placeholder="Choose one" /></SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Services</SelectLabel>
                            {["Bus Hire Purchase", "Fleet Management", "Business Consulting", "Other"].map((s) => (
                              <SelectItem key={s} value={s.toLowerCase().replace(/ /g, "-")}>{s}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label>Message *</Label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => <Textarea {...field} value={field.value || ""} rows={5} className="mt-2" placeholder="How can we help?" />}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox id="newsletter" onCheckedChange={(c) => setValue("newsletter", c === true)} />
                  <Label htmlFor="newsletter" className="text-sm cursor-pointer">Send me updates</Label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !GOOGLE_SHEET_URL}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-xl"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showTopBtn ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 bg-red-600 text-white rounded-full p-4 shadow-2xl hover:bg-red-700"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </section>
  );
}