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
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";


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
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      // Show button if scrolled to within 40px of bottom
      setShowTopBtn(scrollY + windowHeight >= docHeight - 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/submit_contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const result = await res.json();

      if (result.status !== "success") throw new Error(result.message);

      toast.success("Message sent! Check your email for confirmation.");
      reset();
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Failed to send. Please call us directly: +234 809 348 7556");
    }
  };

  return (
    <section className="py-24 px-6 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-gray-900">
            Ready to Start Investing?
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            Get in touch with our expert team to discuss your investment goals and discover
            the perfect opportunity for your financial growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Get In Touch */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-10 shadow-2xl bg-white border-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <p className="text-gray-600 mb-8">
                Our dedicated team is here to help you make informed investment decisions.
                Contact us today to schedule a consultation.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm text-gray-600">
                      +234 809 348 7556
                      <br />
                      Available 9am – 5pm (WAT)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-gray-600 break-all">
                      customerservices@annhurst-gsl.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-sm text-gray-600">
                      Lagos, Nigeria
                      <br />
                      Serving clients nationwide
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <p className="font-semibold mb-3">Follow Us</p>
                <div className="flex justify-item-between space-x-3">
                  <a
                   href="https://x.com/i/flow/login?redirect_after_login=%2FAnnhurstGSL" 
                   className="text-center"
                   target="_blank"
                   rel="noopener noreferrer"
                  >
                    <p className='mx-auto h-9 w-9 bg-linear-to-b from-red-500 to-red-500/80 shadow-md shadow-red-500/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50'>
                        {/* Glossy highlight overlay */}
                      <span
                        className="
                          absolute inset-0
                          bg-linear-to-t from-transparent via-white/30 to-white/70
                          opacity-40
                          rounded-full
                        "
                      ></span>
                      <IconBrandX stroke={2} className='h-5 w-5 text-white relative z-10' />
                    </p>
                  </a>

                  <a
                   href="https://web.facebook.com/people/Annhurst-Global-Services/100068235036574/?_rdc=1&_rdr#" 
                   className="text-center"
                   target="_blank"
                   rel="noopener noreferrer"
                  >
                    <p className='mx-auto h-9 w-9 bg-linear-to-b from-red-500 to-red-500/80 shadow-md shadow-red-500/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50'>
                        {/* Glossy highlight overlay */}
                      <span
                        className="
                          absolute inset-0
                          bg-linear-to-t from-transparent via-white/30 to-white/70
                          opacity-40
                          rounded-full
                        "
                      ></span>
                      <IconBrandFacebook className='h-5 w-5 text-white relative z-10' />
                    </p>
                  </a>

                  <a
                   href="https://www.instagram.com/annhurst_transport_services/" 
                   className="text-center"
                   target="_blank"
                   rel="noopener noreferrer"
                  >
                    <p className='mx-auto h-9 w-9 bg-linear-to-b from-red-500 to-red-500/80 shadow-md shadow-red-500/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50'>
                        {/* Glossy highlight overlay */}
                      <span
                        className="
                          absolute inset-0
                          bg-linear-to-t from-transparent via-white/30 to-white/70
                          opacity-40
                          rounded-full
                        "
                      ></span>
                      <IconBrandInstagram stroke={2} className='h-5 w-5 text-white relative z-10' />
                    </p>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-10 shadow-2xl bg-white border-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we’ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {["name", "email", "phone", "company"].map((field) => (
                  <div key={field}>
                    <Label>{field === "company" ? "Company (Optional)" : field.charAt(0).toUpperCase() + field.slice(1)} {field !== "company" && "*"}</Label>
                    <Controller
                      name={field as keyof ContactFormData}
                      control={control}
                      render={({ field: f }) => <Input {...f} value={String(f.value || "")} className="mt-2" placeholder={field === "phone" ? "+234..." : ""} />}
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
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="mt-2"><SelectValue placeholder="Choose one" /></SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Our Services</SelectLabel>
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
                    render={({ field }) => <Textarea {...field} value={field.value || ""} rows={5} className="mt-2" placeholder="How can we help you grow?" />}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox id="newsletter" onCheckedChange={(c) => setValue("newsletter", c === true)} />
                  <Label htmlFor="newsletter" className="text-sm cursor-pointer">Send me investment updates</Label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    {/* Jump to Top Button (only at bottom) */}
    {showTopBtn && (
      <button
        type="button"
        aria-label="Jump to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center w-12 h-12 hover:bg-red-700 transition-all duration-300"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    )}
    </section>
  );
}