"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "Joel has a thoughtful ability to turn a brand's vision into a clear, functional website. For Designed Spaces by Yemi, he created a website that reflects the character of our practice and gives our work room to speak. We particularly valued his eye for detail and his understanding that every design decision should serve a purpose. The result feels distinctly ours.",
    name: "Omoyemi Olayiwola",
    role: "Creative Lead, Designed Spaces by Yemi",
  },
  {
    quote: "Working with Joel has been a great experience. Beyond his technical skills, he takes the time to understand what you want, listens patiently and delivers. What sets him apart is the way he thinks about your business goals. Our booking conversions doubled after the redesign. He's a great guy, easy to work with, and someone I'd happily recommend to anyone looking for a web designer.",
    name: "Evan Michael",
    role: "H.O.P, EvanMicky Photography",
  },
  {
    quote: "I highly recommend Joel as a skilled and reliable Front-End Developer. He is talented, creative, detail-oriented, and has a strong understanding of modern web development. We've worked on numerous web projects together over the span of 6+ years. Working with him has been a great experience. He pays close attention to design, functionality, responsiveness, and user experience, while also being able to turn ideas and designs into clean, functional websites.",
    name: "Tolu Adeyemi",
    role: "CEO, Meedyianexus",
  },
];

export function Testimonials() {
  return (
    <section className="lp-section border-t border-dashed border-primary">
      <p className="lp-section-label">People talk*</p>
      <h2 className="lp-heading">
        Feedback from recent<br />
        <em>client collaborations.</em>
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            className="lp-testimonial"
          >
            <p className="lp-testimonial-quote">"{t.quote}"</p>
            <div className="lp-testimonial-attribution">
              <span className="lp-testimonial-name">{t.name}</span>
              <span className="lp-testimonial-role">{t.role}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-6 italic opacity-50">
        * Real client feedback from collaborations across Designed Spaces, EvanMicky Photography, and Meedyianexus.
      </p>
    </section>
  );
}
