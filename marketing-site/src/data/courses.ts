import {
  Stethoscope,
  Brain,
  Dna,
  Microscope,
  ClipboardList,
  GraduationCap,
  HeartPulse,
  Pill,
  Syringe,
  Activity,
  CheckCircle2,
  HelpCircle,
  Award,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ProgramComponent = {
  name: string;
  description: string;
  features?: string[];
  outcome?: string;
};

export type Program = {
  id: string;
  icon: LucideIcon;
  title: string;
  tag: string;
  duration: string;
  fee: string;
  feeIncludes: string;
  shortDesc: string;
  whyThisCourse?: string;
  components?: ProgramComponent[];
  questionsAnswered?: string[];
  whatYouWillReceive?: string[];
  whyDifferent?: string;
  modulesCovered?: string[];
  keyFeatures?: string[];
  targetOutcome?: string;
  ourGoal?: string;
};

export const programs: Program[] = [
  {
    id: 'usmle-step1',
    icon: Stethoscope,
    title: 'USMLE Step 1 Comprehensive Preparation Course',
    tag: 'USMLE',
    duration: '6 Months',
    fee: 'PKR 50,000',
    feeIncludes: '6 month access to online lectures along with Mentorship',
    shortDesc:
      'A complete USMLE Step 1 preparation course combining a high-yield First Aid Lecture Series with personalized mentorship, designed to take you from the beginning of your preparation to exam day with the right concepts, strategy, and guidance.',
    components: [
      {
        name: 'Component 1: First Aid Lecture Series',
        description:
          'A complete, system-wise First Aid for the USMLE Step 1 lecture series delivered in less than 150 hours. Designed to serve as your primary learning resource, minimizing the need for multiple video resources throughout your preparation.',
        features: [
          'Concepts made simple: Taught from very basics to advanced using clear explanations, illustrations, diagrams, and visual learning techniques without unnecessary memorization.',
          'Integrated with high-yield clinical scenarios and concepts frequently tested on USMLE Step 1, NBMEs, and UWorld.',
          'Includes detailed discussion of common mistakes, distractors, and the clinical reasoning behind USMLE-style questions.',
          'High-yield prioritization: Guidance on high-yield vs low-yield First Aid sections to avoid wasting study time.',
        ],
        outcome:
          'Complete the lecture series while reading First Aid alongside it (typically 1–3 months). You will then be ready to begin UWorld with confidence and a strong conceptual foundation.',
      },
      {
        name: 'Component 2: Mentorship',
        description:
          'Personalized guidance to help you know what to study, when to study it, how to study it, and how to make the most of every resource from Day 1 until exam day.',
      },
    ],
    questionsAnswered: [
      'How should I start my USMLE Step 1 preparation from scratch?',
      'How should I study First Aid effectively? Should I annotate it, and how much time should I spend on each chapter?',
      'When should I start UWorld, how should I approach it, what performance is expected at each stage, and what should I do if my UWorld scores stop improving?',
      'When, how, and why should I use additional resources such as Pathoma, Randy Neil, Dirty Medicine, Mehlman PDFs, and Anki flashcards?',
      'When should I take my first NBME? How should I interpret my scores, when should I take the next one, and what should I do if my NBME scores aren’t improving?',
      'Most importantly, when am I truly ready to take the USMLE Step 1 examination?',
    ],
    whatYouWillReceive: [
      'A personalized study plan tailored to your schedule, current level, and target timeline.',
      'Step-by-step mentorship from Day 1 until exam day.',
      'Continuous monitoring of your study progress, UWorld performance, NBME scores, and concept retention.',
      'Personalized recommendations on what to study next, when to progress, and how to overcome weak areas.',
      'Practical strategies to improve retention, UWorld performance, and NBME scores.',
      'Comprehensive exam-day guidance, including test-taking strategies, time management, block-by-block strategy, stress management, and final week planning.',
    ],
    whyDifferent:
      'Most free online advice is general. Our mentorship is built around you. We continuously evaluate your study progress, UWorld performance, NBME scores, concept retention, strengths, and areas for improvement, then adapt your study plan accordingly.',
    ourGoal:
      'To remove uncertainty and stress from your USMLE Step 1 journey, helping you follow a clear and efficient preparation pathway, avoid unnecessary delays, save valuable time, and approach the exam with confidence.',
  },
  {
    id: 'fcps-part1',
    icon: Brain,
    title: 'FCPS Part 1 Comprehensive Preparation Course',
    tag: 'FCPS',
    duration: '4 Months',
    fee: 'PKR 28,500',
    feeIncludes: '4 month access to online Lectures + Mentorship',
    shortDesc:
      'A structured 4-month preparation pathway that takes you from building a strong conceptual foundation with First Aid to effectively using Radiant Notes FCPS Pearls by Dr. Rafi Ullah and past papers in the right sequence.',
    whyThisCourse:
      'The FCPS Part 1 examination has a consistently low pass rate, and many candidates require multiple attempts before succeeding. Relying solely on one-line notes and past papers without First Aid leads to knowledge gaps and repeated mistakes. Our course provides a structured preparation pathway to help you pass on your first attempt.',
    components: [
      {
        name: 'Component 1: First Aid Lecture Series',
        description:
          'A complete, system-wise First Aid for the USMLE Step 1 lecture series delivered in less than 150 hours, serving as your primary learning resource for FCPS Part 1 concepts.',
        features: [
          'Concepts made simple using visual learning techniques, diagrams, and clear explanations.',
          'Integrated with high-yield clinical scenarios frequently tested in FCPS Part 1.',
          'Detailed discussion of common mistakes, distractors, and clinical reasoning behind exam questions.',
          'High-yield prioritization to focus on what truly matters for FCPS Part 1.',
        ],
        outcome:
          'Complete FA lectures in 1–3 months, then transition to Radiant Notes FCPS Pearls by Dr. Rafi Ullah and past papers (Mediverse App or SK) with a strong conceptual foundation (typically <1 month required for final phase).',
      },
      {
        name: 'Component 2: Mentorship',
        description:
          'Step-by-step guidance on resource sequence, First Aid annotation for FCPS, past paper timing, and mock test evaluation.',
      },
    ],
    questionsAnswered: [
      'How should I start my FCPS Part 1 preparation from scratch?',
      'How should I study First Aid effectively for FCPS? Which topics can I safely skip and which are essential?',
      'When should I start Radiant Notes FCPS Pearls by Dr. Rafi Ullah and past papers (Mediverse App or SK)?',
      'When, how, and why should I use additional resources such as BRS Physiology, BRS Anatomy, Dr. Irfan Masood’s Medicine, Snell’s Anatomy, and Dogar’s Surgery?',
      'How should I approach mock tests and interpret my scores?',
      'Most importantly, when am I truly ready to take the FCPS Part 1 examination?',
    ],
    whatYouWillReceive: [
      'Personalized study plan tailored to your schedule and target timeline.',
      'Step-by-step mentorship from Day 1 until exam day.',
      'Continuous monitoring of study progress, mock test performance, and concept retention.',
      'Personalized recommendations on next steps and overcoming weak areas.',
      'Practical exam strategies and comprehensive final-week preparation plan.',
    ],
    ourGoal:
      'Provide a complete, structured preparation pathway—from your very first lecture until exam day—to help you pass FCPS Part 1 on your first attempt and break the low pass rate trend.',
  },
  {
    id: 'mbbs-third',
    icon: Dna,
    title: 'MBBS Third Year Comprehensive Course',
    tag: 'MBBS',
    duration: '75 Days',
    fee: 'PKR 14,500',
    feeIncludes: '75 Days access to online lectures',
    shortDesc:
      'A comprehensive Third Year MBBS course built around a high-yield 75-hour First Aid Lecture Series, covering essential modules like Pathology, Pharma, Micro, and Immunology while preparing for future exams (FCPS, USMLE, PLAB).',
    whyThisCourse:
      'Third year MBBS builds the foundation of clinical medicine. Relying on rote memorization leads to weak concepts and declining GPAs in final year. Studying First Aid alongside third-year modules reinforces your textbook learning rather than taking extra time.',
    modulesCovered: [
      'Immunology',
      'General Pharmacology',
      'General Pathology',
      'Microbiology',
      'Hematology',
      'GIT',
      'Locomotor System',
      'Respiratory System',
      'CVS (Cardiovascular System)',
    ],
    keyFeatures: [
      '75-hour First Aid Lecture Series (approx. 50% of First Aid).',
      'Concepts Made Simple: Basics to advanced concepts using visual diagrams and illustrations.',
      'Clinical Integration: Integrated with high-yield clinical scenarios and BCQs relevant to 3rd year Profs.',
      'Exam-Focused Learning: Common mistakes, distractors, and clinical reasoning behind questions.',
      'High-Yield Prioritization: Focus on essential topics without wasting study time.',
    ],
    targetOutcome:
      'Prepared for Third Year MBBS professional examinations and future postgraduate entrance exams (FCPS, USMLE, PLAB, AMC, MRCP, MO exams) in just 2 months.',
  },
  {
    id: 'mbbs-fourth',
    icon: Microscope,
    title: 'MBBS Fourth Year Comprehensive Course',
    tag: 'MBBS',
    duration: '75 Days',
    fee: 'PKR 14,500',
    feeIncludes: '75 Days access to online lectures',
    shortDesc:
      'A comprehensive Fourth Year MBBS course built around a high-yield 75-hour First Aid Lecture Series, covering essential organ system modules while building a strong conceptual foundation for future licensing exams.',
    whyThisCourse:
      'Fourth year MBBS covers vital organ systems (CNS, Renal, Repro, Endocrine). Integrating First Aid with your curriculum ensures deep understanding, better exam retention, and effortless preparation for future postgraduate exams.',
    modulesCovered: [
      'CNS (including Eye & ENT)',
      'Dermatology',
      'Psychiatry',
      'Reproductive System',
      'Renal System',
      'Endocrinology',
      'Biochemistry',
    ],
    keyFeatures: [
      '75-hour First Aid Lecture Series.',
      'Concepts Made Simple: Clear explanations, flowcharts, and visual learning techniques.',
      'Clinical Integration: High-yield clinical presentations, BCQs, and professional exam scenarios.',
      'Exam-Focused Learning: Analysis of common distractors and clinical reasoning.',
      'High-Yield Prioritization: Strategic guidance on core topics versus low-yield details.',
    ],
    targetOutcome:
      'Prepared for Fourth Year MBBS professional examinations and future postgraduate entrance exams (FCPS, USMLE, PLAB, AMC, MRCP, MO exams) in just 2 months.',
  },
  {
    id: 'mbbs-final',
    icon: ClipboardList,
    title: 'MBBS Final Year Comprehensive Course',
    tag: 'MBBS',
    duration: '5 Months',
    fee: 'PKR 28,500',
    feeIncludes: '5 month access to online lectures',
    shortDesc:
      'A comprehensive Final Year MBBS course built around a high-yield 150-hour First Aid Lecture Series, strengthening Medicine, Surgery, Pediatrics, and ObGyn pathophysiology, pharmacology, and management.',
    whyThisCourse:
      'Final year is the bridge between medical school and clinical practice. Studying First Aid alongside Medicine, Surgery, Pediatrics, and ObGyn textbooks provides immediate clarity on pathophysiology, first-line investigations, and management, saving hundreds of study hours.',
    keyFeatures: [
      '150-hour First Aid Lecture Series.',
      'Concepts made simple: Core principles to advanced clinical management.',
      'Integrated with high-yield clinical scenarios, BCQs, and Final Prof exam questions.',
      'Exam-focused learning: Detailed breakdown of question distractors and clinical reasoning.',
      'High-yield prioritization: Maximum focus on essential exam sections.',
    ],
    targetOutcome:
      'Excel in Final Year MBBS professional examinations while building the exact conceptual foundation needed for FCPS Part 1, USMLE, PLAB, AMC, MRCP, and Medical Officer induction tests.',
  },
];

export const marqueeItems = [
  'USMLE Step 1',
  'FCPS Part I',
  'NRE',
  'MBBS Professional',
  'First Aid Framework',
  'Clinical Correlation',
  'High-Yield Preparation',
  'Concept-Based Learning',
];

export const methodology = [
  {
    icon: GraduationCap,
    title: 'Comprehensive Recorded Lectures',
    desc: 'Systematically structured lectures covering the curriculum in a logical sequence, providing students with a complete and organized learning pathway.',
  },
  {
    icon: Brain,
    title: 'Concepts From Basics to Advanced',
    desc: 'Every topic begins with fundamental principles and progresses toward more advanced concepts, ensuring genuine understanding rather than dependence on rote memorization.',
  },
  {
    icon: Microscope,
    title: 'Illustration & Visual-Based Learning',
    desc: 'Complex medical concepts are explained using illustrations, diagrams, flowcharts, pathways, and tables to improve comprehension and long-term retention.',
  },
  {
    icon: ClipboardList,
    title: 'First Aid–Integrated Learning',
    desc: 'The First Aid framework serves as a core academic foundation, with important concepts systematically explained and integrated throughout the curriculum.',
  },
  {
    icon: Stethoscope,
    title: 'Clinical Correlation',
    desc: 'Basic medical sciences are continuously connected with clinical presentations, pathophysiology, investigations, diagnosis, and management, establishing a clear connection between concepts and clinical practice.',
  },
  {
    icon: Activity,
    title: 'High-Yield Clinical Integration',
    desc: 'Important clinical associations and examination-relevant concepts are incorporated throughout the lectures, helping students recognize the practical significance of what they study.',
  },
  {
    icon: Pill,
    title: 'Question-Oriented Learning',
    desc: 'Relevant concepts are connected with examination-style questions where appropriate, helping students understand how knowledge is applied and tested in their respective examinations.',
  },
  {
    icon: Syringe,
    title: 'Common Mistakes & Conceptual Pitfalls',
    desc: 'Frequently misunderstood concepts, common mistakes, confusing associations, and important distinctions are highlighted to help students avoid errors during examinations.',
  },
  {
    icon: Dna,
    title: 'High-Yield Prioritization',
    desc: 'Students are guided toward the topics and concepts that deserve greater attention, allowing them to prioritize their preparation without losing sight of the underlying medical knowledge.',
  },
  {
    icon: HeartPulse,
    title: 'Integrated Medical Learning',
    desc: 'Related concepts are connected across disciplines rather than being treated as isolated areas of knowledge, creating a more cohesive understanding of medicine.',
  },
];

export const whyChooseUs = [
  {
    icon: ClipboardList,
    title: 'Complete First Aid in Just 150 Hours',
    desc: 'A complete, system-wise First Aid for the USMLE Step 1 lecture series delivered in just 150 hours, designed to serve as a primary learning resource and minimize dependence on multiple video resources.',
  },
  {
    icon: GraduationCap,
    title: 'One Curriculum. Multiple Examination Pathways.',
    desc: 'A strong foundation in core medical sciences structured to support preparation for MBBS, USMLE, FCPS, and NRE, with course-specific emphasis according to the requirements of each examination.',
  },
  {
    icon: Stethoscope,
    title: 'From Fundamentals to Clinical Application',
    desc: 'The curriculum progresses from basic concepts to clinical application, helping students understand the underlying principles behind disease mechanisms, clinical presentations, investigations, and management.',
  },
  {
    icon: Brain,
    title: 'High-Yield Without Losing the Concepts',
    desc: 'Essential concepts are explained thoroughly while maintaining a clear focus on high-yield and examination-relevant information, allowing students to prioritize their preparation effectively.',
  },
  {
    icon: Activity,
    title: 'A Structured Learning Pathway',
    desc: 'Each program follows a defined curriculum and duration, providing students with a clear academic pathway rather than an unstructured collection of learning resources.',
  },
  {
    icon: HeartPulse,
    title: 'Personalized Mentorship Where Included',
    desc: 'Selected programs include individualized academic mentorship, providing study planning, progress monitoring, performance assessment, and examination guidance.',
  },
  {
    icon: Dna,
    title: 'A Strong Foundation for Multiple Examinations',
    desc: 'A comprehensive understanding of core medical concepts can support students across different stages of medical education and multiple examination pathways.',
  },
];
