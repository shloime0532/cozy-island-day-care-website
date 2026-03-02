"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Fade-up observer ─── */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll(".fade-up").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ═══════════════════════════════════════════
   NAV — Transparent overlay, friendly warm
   ═══════════════════════════════════════════ */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Cozy Island Day Care"
              width={160}
              height={50}
              className="h-9 sm:h-11 w-auto"
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {["Programs", "Our Team", "About", "Why Us"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  scrolled ? "text-text" : "text-white"
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-accent-dark transition-all hover:shadow-xl"
            >
              Schedule a Tour
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                scrolled ? "bg-text" : "bg-white"
              } ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                scrolled ? "bg-text" : "bg-white"
              } ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                scrolled ? "bg-text" : "bg-white"
              } ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-80 opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-xl">
            {["Programs", "Our Team", "About", "Why Us"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setOpen(false)}
                className="text-text font-medium py-2 hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-white shadow-lg"
            >
              Schedule a Tour
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO — Full-bleed overlay
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero.jpg"
        alt="Happy children learning and playing at Cozy Island Day Care"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 via-primary/50 to-primary-dark/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 mb-6">
          <span className="text-accent text-lg">&#9733;</span>
          <span className="text-white/90 text-sm font-medium">
            5.0 Rated on Google &bull; Licensed &amp; Certified
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Where Every Child{" "}
          <span className="text-accent">Feels at Home</span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Lakewood&apos;s trusted childcare center providing a warm, nurturing
          environment for children ages 6 weeks to 12 years. Where learning
          meets love.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto rounded-full bg-accent px-8 py-4 text-base font-bold text-white shadow-xl hover:bg-accent-dark hover:shadow-2xl transition-all hover:-translate-y-0.5"
          >
            Schedule a Tour
          </a>
          <a
            href="tel:+17329874411"
            className="w-full sm:w-auto rounded-full border-2 border-white/30 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
          >
            Call (732) 987-4411
          </a>
        </div>
      </div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full block" preserveAspectRatio="none">
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROGRAMS — Image-header cards
   ═══════════════════════════════════════════ */
const programs = [
  {
    title: "Infant Care",
    ages: "6 Weeks - 18 Months",
    image: "/program-infant.jpg",
    description:
      "Gentle, personalized care in a cozy environment. Our trained caregivers follow each baby's unique schedule for feeding, napping, and play.",
    ratio: "1:4 Ratio",
  },
  {
    title: "Toddler Program",
    ages: "18 Months - 3 Years",
    image: "/program-toddler.jpg",
    description:
      "Hands-on exploration through sensory play, music, and movement. Building social skills, language, and independence in a safe setting.",
    ratio: "1:6 Ratio",
  },
  {
    title: "Preschool",
    ages: "3 - 5 Years",
    image: "/program-preschool.jpg",
    description:
      "Kindergarten-ready curriculum blending STEAM activities, literacy, and creative arts. Building confidence and a love for learning.",
    ratio: "1:10 Ratio",
  },
  {
    title: "After-School Care",
    ages: "5 - 12 Years",
    image: "/program-afterschool.jpg",
    description:
      "Safe, fun after-school environment with homework help, outdoor play, snacks, and enrichment activities to keep kids engaged.",
    ratio: "1:15 Ratio",
  },
];

function Programs() {
  const containerRef = useFadeUp();
  return (
    <section id="programs" className="py-16 sm:py-24 bg-white" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 fade-up">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Our Programs
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-text mb-4">
            Nurturing Growth at Every Stage
          </h2>
          <p className="text-text-light max-w-2xl mx-auto text-base sm:text-lg">
            Age-appropriate programs designed to inspire curiosity, build
            confidence, and develop skills in a loving environment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {programs.map((program, i) => (
            <div
              key={program.title}
              className="fade-up group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {program.ratio}
                </div>
              </div>
              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-text mb-1">
                  {program.title}
                </h3>
                <p className="text-accent font-semibold text-sm mb-3">
                  {program.ages}
                </p>
                <p className="text-text-light text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TEAM GRID — SIGNATURE ELEMENT
   ═══════════════════════════════════════════ */
const teamMembers = [
  {
    name: "Maria Santos",
    role: "Center Director",
    credential: "M.Ed. Early Childhood",
    image: "/team-2.jpg",
    bio: "15+ years in early childhood education. Passionate about creating nurturing learning environments for every child.",
  },
  {
    name: "Aisha Johnson",
    role: "Lead Infant Teacher",
    credential: "CDA Certified",
    image: "/team-1.jpg",
    bio: "Specializes in infant development and attachment-based care. Every baby receives personalized attention.",
  },
  {
    name: "Emily Richardson",
    role: "Preschool Teacher",
    credential: "B.A. Education",
    image: "/team-3.jpg",
    bio: "Creates engaging STEAM curriculum that sparks curiosity and prepares children for kindergarten success.",
  },
  {
    name: "Sarah Chen",
    role: "Toddler Room Lead",
    credential: "CPR & First Aid",
    image: "/team-4.jpg",
    bio: "Expert in toddler development milestones. Builds confidence through sensory play and gentle guidance.",
  },
];

function Team() {
  const containerRef = useFadeUp();
  return (
    <section id="our-team" className="py-16 sm:py-24 bg-light" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 fade-up">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Our Team
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-text mb-4">
            Meet the People Who Care for Your Children
          </h2>
          <p className="text-text-light max-w-2xl mx-auto text-base sm:text-lg">
            Our experienced, certified team is dedicated to providing the
            warmest care and the best early learning experience for your family.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className="fade-up group bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Credential badge */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {member.credential}
                  </span>
                </div>
              </div>
              {/* Info */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-text">
                  {member.name}
                </h3>
                <p className="text-accent font-semibold text-sm mb-2">
                  {member.role}
                </p>
                <p className="text-text-light text-xs sm:text-sm leading-relaxed hidden sm:block">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT — Split layout
   ═══════════════════════════════════════════ */
function About() {
  const containerRef = useFadeUp();
  return (
    <section id="about" className="py-16 sm:py-24 bg-white" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* Image */}
          <div className="fade-up relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
            <Image
              src="/about.jpg"
              alt="Cozy Island Day Care building exterior"
              fill
              className="object-cover"
            />
            {/* Years badge */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-lg text-center">
              <div className="text-3xl font-bold text-primary">5+</div>
              <div className="text-xs font-semibold text-text-light uppercase tracking-wide">
                Years Serving
                <br />
                Families
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="fade-up" style={{ transitionDelay: "200ms" }}>
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              About Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-text mb-6 leading-tight">
              A Warm, Safe Place
              <br />
              <span className="text-primary">Your Family Can Trust</span>
            </h2>
            <p className="text-text-light text-base sm:text-lg leading-relaxed mb-6">
              Founded with a simple mission: to provide Lakewood families with
              a childcare center that feels like a second home. At Cozy Island,
              we believe every child deserves a nurturing space where they can
              grow, explore, and thrive.
            </p>
            <p className="text-text-light text-base sm:text-lg leading-relaxed mb-8">
              Under the direction of Yosef Falk, our team of 40+ dedicated
              educators creates personalized learning experiences for children
              from infancy through school age. We are proud to be a licensed,
              NJ-certified facility serving up to 172 children daily.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "172", label: "Children\nCapacity" },
                { number: "40+", label: "Caring\nStaff" },
                { number: "5.0", label: "Google\nRating" },
              ].map((stat) => (
                <div
                  key={stat.number}
                  className="bg-light rounded-2xl p-4 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-text-light font-medium whitespace-pre-line mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   WHY CHOOSE US — Feature cards
   ═══════════════════════════════════════════ */
const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Licensed & Certified",
    description:
      "NJ state-licensed facility (License #170800294) with all staff background-checked, trained, and certified.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Low Teacher-to-Child Ratios",
    description:
      "Small group sizes ensure every child receives personalized attention and care throughout the day.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Age-Appropriate Curriculum",
    description:
      "Structured learning programs designed by early childhood educators to spark curiosity and school readiness.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5V4.5m6 0a48.11 48.11 0 013.478.397m-9.956 0A48.108 48.108 0 0112 4.5m3.478.397a48.11 48.11 0 013.478.397m-13.912 0a48.109 48.109 0 013.478.397M12 15.75h.007v.008H12v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    title: "Nutritious Meals Included",
    description:
      "Fresh, balanced breakfast, lunch, and snacks prepared daily. We accommodate allergies and dietary needs.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Secure Entry System",
    description:
      "Keypad-controlled entry, security cameras, and strict sign-in/sign-out procedures keep children safe.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Outdoor Play Areas",
    description:
      "Age-appropriate outdoor playgrounds with safe surfacing, shade structures, and open space for active play.",
  },
];

function WhyUs() {
  const containerRef = useFadeUp();
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-light" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 fade-up">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Why Cozy Island
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-text mb-4">
            What Makes Us Different
          </h2>
          <p className="text-text-light max-w-2xl mx-auto text-base sm:text-lg">
            We go beyond basic childcare to create an environment where children
            feel safe, valued, and excited to learn every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="fade-up bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-text mb-2">
                {feature.title}
              </h3>
              <p className="text-text-light text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
const testimonials = [
  {
    text: "From the moment we walked in, we knew Cozy Island was the right place for our daughter. The teachers are warm, attentive, and truly love what they do. She's thriving!",
    name: "Rebecca M.",
    detail: "Parent of Preschooler",
    stars: 5,
  },
  {
    text: "I was so anxious about leaving my infant at daycare, but the infant room team put my mind completely at ease. They send photos throughout the day and communicate everything.",
    name: "Sarah K.",
    detail: "Parent of Infant",
    stars: 5,
  },
  {
    text: "My son has been at Cozy Island for 2 years now. His language skills, social development, and confidence have grown so much. The curriculum is excellent and the staff are like family.",
    name: "David L.",
    detail: "Parent of Toddler",
    stars: 5,
  },
];

function Testimonials() {
  const containerRef = useFadeUp();
  return (
    <section className="py-16 sm:py-24 bg-white" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 fade-up">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-text mb-4">
            What Parents Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="fade-up bg-light rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <svg
                    key={j}
                    className="w-5 h-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-text text-sm sm:text-base leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-primary/10 pt-4">
                <p className="font-bold text-text text-sm">{t.name}</p>
                <p className="text-text-light text-xs">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA — Schedule a Tour
   ═══════════════════════════════════════════ */
function CTA() {
  const containerRef = useFadeUp();
  return (
    <section id="contact" className="py-16 sm:py-24 bg-primary relative overflow-hidden" ref={containerRef}>
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-up">
          <span className="inline-block text-accent-light font-semibold text-sm uppercase tracking-widest mb-3">
            Take the First Step
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6">
            Schedule a Tour Today
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Come see our warm, nurturing environment firsthand. Meet our
            teachers, explore our classrooms, and discover why families in
            Lakewood trust Cozy Island with their most precious little ones.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="tel:+17329874411"
              className="w-full sm:w-auto rounded-full bg-accent px-8 py-4 text-base font-bold text-white shadow-xl hover:bg-accent-dark hover:shadow-2xl transition-all hover:-translate-y-0.5"
            >
              Call (732) 987-4411
            </a>
            <a
              href="https://maps.google.com/?q=500+River+Ave+Ste+100+Lakewood+NJ+08701"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              Get Directions
            </a>
          </div>

          {/* Hours */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-6 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-white/90 text-sm">
                Mon-Thu 8:30am - 4:15pm
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <span className="text-white/90 text-sm">Fri 8:30am - 1:00pm</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-text py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo-white.png"
              alt="Cozy Island Day Care"
              width={140}
              height={44}
              className="h-10 w-auto mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Nurturing growth, inspiring joy, and building bright futures for
              Lakewood&apos;s children since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {["Programs", "Our Team", "About", "Why Us"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-white/60 text-sm hover:text-accent transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Programs
            </h4>
            <div className="flex flex-col gap-2">
              {[
                "Infant Care",
                "Toddler Program",
                "Preschool",
                "After-School Care",
              ].map((prog) => (
                <a
                  key={prog}
                  href="#programs"
                  className="text-white/60 text-sm hover:text-accent transition-colors"
                >
                  {prog}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+17329874411"
                className="flex items-center gap-2 text-white/60 text-sm hover:text-accent transition-colors"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                (732) 987-4411
              </a>
              <a
                href="https://maps.google.com/?q=500+River+Ave+Ste+100+Lakewood+NJ+08701"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-white/60 text-sm hover:text-accent transition-colors"
              >
                <svg
                  className="w-4 h-4 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                500 River Ave, Ste 100
                <br />
                Lakewood, NJ 08701
              </a>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Mon-Thu 8:30a-4:15p
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Cozy Island Day Care. All rights
            reserved.
          </p>
          <p className="text-white/40 text-xs">
            NJ License #170800294 &bull; Subsidized Care Available
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Programs />
      <Team />
      <About />
      <WhyUs />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
