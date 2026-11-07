export const services = [
  {
    id: "websites",
    name: "Websites",
    eyebrow: "A stronger first impression",
    description:
      "Thoughtfully designed websites that make your business feel as good as it is.",
    shortDescription: "A distinctive digital home for your business.",
    deliverables: [
      "Company & marketing websites",
      "Responsive UI design",
      "Content structure & technical SEO",
    ],
  },
  {
    id: "web-apps",
    name: "Web applications",
    eyebrow: "Make the complex feel simple",
    description:
      "Purpose-built web applications that connect your workflows, people, and ideas.",
    shortDescription: "Custom software. Clearer workflows. More possibilities.",
    deliverables: [
      "Custom business applications",
      "Dashboards & customer portals",
      "Product design & development",
    ],
  },
  {
    id: "mobile-apps",
    name: "Mobile applications",
    eyebrow: "Good ideas, on the move",
    description:
      "Considered mobile experiences that put your product right where it belongs. In people's hands.",
    shortDescription: "Intuitive experiences for iOS and Android.",
    deliverables: [
      "iOS & Android applications",
      "Mobile interface design",
      "Connected product experiences",
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
      "A company website, a custom web application, or a mobile product. We start with the problem you're trying to solve, then define a practical scope around it.",
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
    question: "What happens when I send an inquiry?",
    answer:
      "This is a website prototype, so the form demonstrates the inquiry experience without sending or storing your details. A live inquiry workflow will be connected before the public launch.",
  },
] as const;
