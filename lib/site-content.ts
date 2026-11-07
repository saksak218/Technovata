export const services = [
  {
    id: "websites",
    name: "Websites",
    eyebrow: "A stronger first impression",
    description:
      "We design and develop company websites, landing pages, and content-led sites that explain your offer and make it easy to take the next step. From page structure to responsive development, we bring the design and build together.",
    shortDescription:
      "Company websites and landing pages, built to turn interest into conversations.",
    deliverables: [
      "Company websites, landing pages & redesigns",
      "Responsive design & accessible navigation",
      "Content structure, metadata & technical SEO",
      "CMS, inquiry forms & analytics integrations",
      "Performance review & launch handover",
    ],
  },
  {
    id: "web-apps",
    name: "Web applications",
    eyebrow: "Make the complex feel simple",
    description:
      "We build custom software for the work your business actually does. Customer portals, internal tools, booking systems, and dashboards connect your people and data in one place, with clear workflows and permissions.",
    shortDescription:
      "Dashboards, customer portals, and business tools that simplify everyday work.",
    deliverables: [
      "Customer portals, dashboards & internal tools",
      "Authentication, roles & approval workflows",
      "Database design, search & reporting",
      "API development & third-party integrations",
      "Testing, deployment & technical handover",
    ],
  },
  {
    id: "mobile-apps",
    name: "Mobile applications",
    eyebrow: "Good ideas, on the move",
    description:
      "We design and develop iOS and Android applications with focused journeys and interfaces made for touch. Connect your mobile experience to your existing platform, or build a new product from its first useful release.",
    shortDescription:
      "iOS and Android products with clear flows, thoughtful details, and connected data.",
    deliverables: [
      "iOS & Android application development",
      "Mobile product design & interactive prototypes",
      "Account, API & backend integration",
      "Notifications, camera & device features",
      "Release preparation & store submission support",
    ],
  },
  {
    id: "saas",
    name: "SaaS development",
    eyebrow: "From first release to what's next",
    description:
      "We help founders and teams turn a recurring customer need into a usable software product. Define the MVP, design the core workspace, and connect the accounts, tenant permissions, onboarding, and billing flows your business model needs.",
    shortDescription:
      "From MVP to multi-tenant platforms, with onboarding and subscription workflows.",
    deliverables: [
      "Product discovery, MVP scope & UX design",
      "Multi-tenant workspaces & role permissions",
      "Signup, onboarding & account management",
      "Subscription, billing & usage integrations",
      "Admin tools, reporting & release foundations",
    ],
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const processSteps = [
  {
    number: "01",
    name: "Discover",
    description:
      "We listen first. Your goals, your users, and the problem worth solving.",
  },
  {
    number: "02",
    name: "Plan",
    description:
      "A clear direction. The right scope, a considered design, and a shared roadmap.",
  },
  {
    number: "03",
    name: "Build",
    description:
      "Ideas become interfaces. We design, develop, and refine together.",
  },
  {
    number: "04",
    name: "Launch",
    description:
      "Test the details. Bring it to life. Make room for what comes next.",
  },
] as const;

export const faqs = [
  {
    question: "What can we build together?",
    answer:
      "A company website, a custom web application, a mobile product, or a SaaS platform. We start with the problem you're trying to solve, then define a practical scope around it.",
  },
  {
    question: "Can you help with an existing product?",
    answer:
      "Your project doesn't have to start from zero. An initial conversation can explore your current website or application, what needs to improve, and whether there's a good fit.",
  },
  {
    question: "How do you estimate a project?",
    answer:
      "Every project has its own requirements. Scope, design complexity, integrations, and timing shape a tailored proposal. There are no fixed-price packages in this website preview.",
  },
  {
    question: "Can you help turn an idea into a SaaS product?",
    answer:
      "Yes. We can help shape the core product, map onboarding and subscription flows, and plan a focused first release. The technical scope follows what your customers need, rather than a list of features added for its own sake.",
  },
  {
    question: "What about after launch?",
    answer:
      "Maintenance, support, and future iterations can be discussed as part of the project proposal. The responsibilities and ongoing scope are agreed before the work begins.",
  },
  {
    question: "What happens when I send an inquiry?",
    answer:
      "This is a website prototype, so the form demonstrates the inquiry experience without sending or storing your details. A live inquiry workflow will be connected before the public launch.",
  },
] as const;

export const demoTestimonials = [
  {
    quote:
      "The idea felt complicated. The experience made it feel simple. That is exactly what we wanted our product to do.",
    name: "Alex Morgan",
    initials: "AM",
    role: "Fictional startup founder",
    service: "Web application",
  },
  {
    quote:
      "Thoughtful design, clear conversations, and the little details that make a digital product feel right.",
    name: "Sam Rivera",
    initials: "SR",
    role: "Fictional product lead",
    service: "SaaS platform",
  },
  {
    quote:
      "A website that feels like our business, with a direction we can build on. Everything has a reason to be there.",
    name: "Jordan Lee",
    initials: "JL",
    role: "Fictional business owner",
    service: "Company website",
  },
] as const;
