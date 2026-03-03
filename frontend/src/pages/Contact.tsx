import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAddInquiry } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  productId: string;
}

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Commerce Street, Business District, Mumbai 400001, India',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 98765 43210',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@rkoverseas.com',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon–Sat: 9:00 AM – 6:00 PM IST',
  },
];

function getInitialProductId(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('productId') ?? '';
  } catch {
    return '';
  }
}

export default function Contact() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const initialProductId = getInitialProductId();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InquiryFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      productId: initialProductId,
    },
  });

  useEffect(() => {
    if (initialProductId) {
      setValue('productId', initialProductId);
    }
  }, [initialProductId, setValue]);

  const addInquiry = useAddInquiry();

  const onSubmit = async (data: InquiryFormData) => {
    setSubmitError('');
    try {
      await addInquiry.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        productId: data.productId ? BigInt(data.productId) : BigInt(0),
      });
      setSubmitSuccess(true);
      reset();
    } catch {
      setSubmitError('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-amber text-sm font-semibold uppercase tracking-wider mb-1">Get in Touch</p>
        <h1 className="font-display text-3xl font-bold text-foreground">Contact &amp; Inquiries</h1>
        <p className="text-muted-foreground mt-2">
          Have a question or want to inquire about a product? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact Info */}
        <div className="lg:col-span-2">
          <div className="bg-charcoal rounded-xl p-8 text-white h-full">
            <h2 className="font-display text-xl font-bold text-white mb-2">Store Information</h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              RK Overseas is your trusted partner for premium home appliances. Reach out to us for product inquiries, pricing, and availability.
            </p>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-amber" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="text-white text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-white/50 text-xs">
                We typically respond to inquiries within 24 business hours.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-xl border border-border p-8 shadow-card">
            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Inquiry Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-amber text-amber-foreground font-semibold px-6 py-3 rounded-md hover:bg-amber-dark transition-all duration-200"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">Send an Inquiry</h2>

                {submitError && (
                  <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md border border-destructive/20">
                    <AlertCircle size={16} />
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      {...register('name', { required: 'Name is required' })}
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email address',
                        },
                      })}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    {...register('phone', { required: 'Phone number is required' })}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-xs">{errors.phone.message}</p>
                  )}
                </div>

                {initialProductId && (
                  <div className="space-y-1.5">
                    <Label htmlFor="productIdDisplay">Product Reference</Label>
                    <Input
                      id="productIdDisplay"
                      readOnly
                      value={`Product #${initialProductId}`}
                      className="bg-muted text-muted-foreground cursor-not-allowed"
                    />
                    <input type="hidden" {...register('productId')} />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your requirements, the product you're interested in, or any questions you have..."
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && (
                    <p className="text-destructive text-xs">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={addInquiry.isPending}
                  className="w-full flex items-center justify-center gap-2 bg-amber text-amber-foreground font-semibold px-6 py-3 rounded-md hover:bg-amber-dark transition-all duration-200 shadow-amber disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {addInquiry.isPending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-amber-foreground/30 border-t-amber-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Inquiry'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
