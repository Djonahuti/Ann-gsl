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
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone required"),
  company: z.string().optional(),  
  service: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
  newsletter: z.boolean(),
});

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactCTA() {
  const { control, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: "higher-purchase",
      newsletter: false
    }
  })

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
      const { error } = await supabase.from("contact_us").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          subject: data.subject ?? data.service,
          message: data.message,
          newsletter: data.newsletter,
        }
      ])

      if (error) {
        console.error(error)
        toast.error("Something went wrong. Please try again.")
        return
      }

      toast.success("Message sent successfully! We'll get back to you soon.")
      reset()
    } catch (err) {
      console.error(err)
      toast.error("Unexpected error occurred.")
    }
  }

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
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-red-50 rounded-full hover:bg-red-100 transition">
                    <Facebook className="w-5 h-5 text-red-600" />
                  </a>
                  <a href="#" className="p-3 bg-red-50 rounded-full hover:bg-red-100 transition">
                    <Twitter className="w-5 h-5 text-red-600" />
                  </a>
                  <a href="#" className="p-3 bg-red-50 rounded-full hover:bg-red-100 transition">
                    <Instagram className="w-5 h-5 text-red-600" />
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
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input id="name" {...field} className="mt-2" />
                      )}
                    />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input id="email" type="email" {...field} className="mt-2" />
                      )}
                    />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Input id="phone" type="tel" {...field} className="mt-2" />
                      )}
                    />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Controller
                    name="company"
                    control={control}
                    render={({ field }) => (
                      <Input id="company" type="text" {...field} className="mt-2" />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="service">Investment Interest</Label>
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="mt-2 w-full">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Services</SelectLabel>
                            <SelectItem
                              value="higher-purchase"
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-highlighted:bg-primary-light data-highlighted:text-gray-200"
                            >
                              Bus Higher Purchase
                            </SelectItem>
                            <SelectItem
                              value="fleet-management"
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-highlighted:bg-primary-light data-highlighted:text-gray-200"
                            >
                              Fleet Management
                            </SelectItem>
                            <SelectItem
                              value="consulting"
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-highlighted:bg-primary-light data-highlighted:text-gray-200"
                            >
                              Business Consulting
                            </SelectItem>
                            <SelectItem
                              value="other"
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-highlighted:bg-primary-light data-highlighted:text-gray-200"
                            >
                              Other Services
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Textarea id="message" rows={6} {...field} className="mt-2" />
                    )}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    onCheckedChange={(checked) => setValue("newsletter", checked === true)}
                  />
                  <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
                    Subscribe to our newsletter for investment updates and opportunities
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg"
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