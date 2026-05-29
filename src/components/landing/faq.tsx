import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const faqs = [
  {
    question: "Is the app free?",
    answer: "Yes. You can start learning for free and access a large collection of courses.",
  },
  {
    question: "How does the XP system work?",
    answer: "You earn XP by completing lessons, quizzes, achievements, and maintaining streaks.",
  },
  {
    question: "Can I learn offline?",
    answer: "Selected content can be downloaded for offline learning.",
  },
  {
    question: "How are recommendations generated?",
    answer: "Recommendations are personalized using your interests, progress, and learning goals.",
  },
  {
    question: "Are certificates available?",
    answer: "Yes, certificates are available for eligible course completions.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="container mx-auto px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground">Everything you need to know.</p>
        </div>
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>

              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
