"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calculator, Sparkles, Rocket, TrendingDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const creditPlans = [
  {
    title: "Starter",
    credits: "5",
    price: "$20",
    priceId: "price_1QRMufK9t9vieqbI3UhTDC24",
    period: "one-time",
    pricePerCredit: "4.00",
    originalPrice: "$25",
    savings: "20%",
    suggestion: "Perfect for trying out the platform",
    icon: Calculator,
    popular: false,
  },
  {
    title: "Professional",
    credits: "10",
    price: "$35",
    priceId: "price_1QRMyBK9t9vieqbIxSB9Hunu",
    period: "one-time",
    pricePerCredit: "3.50",
    originalPrice: "$50",
    savings: "30%",
    suggestion: "Most popular for active users",
    icon: Sparkles,
    popular: true,
  },
  {
    title: "Enterprise",
    credits: "15",
    price: "$45",
    priceId: "price_1QRMzKK9t9vieqbIMGGx1wjT",
    period: "one-time",
    pricePerCredit: "3.00",
    originalPrice: "$75",
    savings: "40%",
    suggestion: "Best for teams and organizations",
    icon: Rocket,
    popular: false,
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    content:
      "This platform has revolutionized how we handle our interview processes. The credit system is transparent and cost-effective.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "HR Director at InnovateCo",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop",
    content:
      "The professional plan perfectly suits our needs. We've seen a 40% improvement in our hiring quality since using this platform.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Tech Lead at StartupX",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
    content:
      "Incredibly intuitive platform with fair pricing. It's become an essential part of our technical interview process.",
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start gap-4 bg-background/50 p-4 rounded-lg border border-border/50"
    >
      <Image
        src={testimonial.image}
        alt={testimonial.name}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-foreground">{testimonial.name}</h3>
          <div className="flex">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-primary text-primary" />
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{testimonial.role}</p>
        <p className="text-sm text-foreground/80">{testimonial.content}</p>
      </div>
    </motion.div>
  );
}

function CardSpotlight({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const maskImage = useMotionTemplate`radial-gradient(350px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={style}
      />
    </div>
  );
}

function PricingCardItem({ plan, index }: { plan: any; index: number }) {
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handlePurchase = () => {
    router.push(`/dashboard/Payments/payment?priceId=${plan.priceId}`);
  };

  const Icon = plan.icon;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card
        onMouseMove={onMouseMove}
        className="relative flex flex-col flex-1 w-full bg-card border-border hover:border-primary/50 group transition-all duration-300"
      >
        <CardSpotlight mouseX={mouseX} mouseY={mouseY} />

        <CardHeader className="flex flex-col space-y-1.5 p-6">
          {plan.popular && (
            <Badge className="absolute top-4 right-4 bg-primary hover:bg-primary/90">
              Best Value
            </Badge>
          )}
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">{plan.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{plan.suggestion}</p>
        </CardHeader>

        <CardContent className="flex-1 p-6 pt-0 grid gap-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-5xl font-bold text-primary">
              {plan.credits}
            </div>
            <div className="text-xl font-medium text-muted-foreground">
              Credits
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm line-through text-muted-foreground">
                  {plan.originalPrice}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                <TrendingDown className="w-4 h-4 text-green-500" />
                <span className="text-green-500 font-medium">
                  {plan.savings}
                </span>{" "}
                savings
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Price per credit</span>
                <span className="font-medium text-foreground">
                  ${plan.pricePerCredit}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total credits</span>
                <span className="font-medium text-foreground">
                  {plan.credits} credits
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Billing</span>
                <span className="font-medium text-foreground">
                  One-time payment
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <Button
            onClick={handlePurchase}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            Purchase Credits
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function CreditsPricing() {
  return (
    <div className="min-h-screen bg-background flex items-center p-0">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            Purchase Credits
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-[600px]"
          >
            Select the credit package that best suits your needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {creditPlans.map((plan, index) => (
            <PricingCardItem key={plan.title} plan={plan} index={index} />
          ))}
        </div>

        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold text-center text-foreground mb-6"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
