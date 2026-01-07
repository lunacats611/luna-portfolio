
import { WorkExperience, Education, SkillCategory, Certification, Award } from './types';

export const PERSONAL_INFO = {
  name: "Luna Xu",
  title: "Computer Science Educator & Education Technologist",
  location: "Nanjing, Jiangsu",
  phone: "+86 157 2062 276",
  email: "826205920@qq.com",
  summary: "Dedicated Computer Science Educator (M.Sc. in EdTech) with 6 years of experience and a 88% A/A* rate in recent A-Level examinations. Expert in Java, Python, and AI-integrated pedagogy, with specialized expertise in Project-Based Learning (PBL). Recently pioneered the integration of LLM tools in student app development, culminating in a successful AI App Showcase.",
};

export const WORK_HISTORY: WorkExperience[] = [
  {
    title: "Computer Science Teacher",
    company: "Nanjing Hankai Academy",
    period: "08/2019 - Current",
    description: [
      "Taught IGCSE and A-Level computer science curriculums for students in grades 9 to 12 for 6 years.",
      "Achieved 88% A/A* rate for IGCSE and A-Level students (June 2025 results).",
      "Designed and programmed custom learning modules for complex topics (Logic Gates, OSI Model, CPU Architecture, CS vocabulary flashcards).",
      "Designed and implemented Project-Based Learning (PBL) curricula using Java and Python.",
      "Coached students for ACSL, OUCC, and CCC competitions (Team Gold, Individual High Score Awards).",
      "Coached 'Odyssey of the Mind' (OM) team to 1st prize in China and 21st in the world.",
      "Leveraged EdTech tools like Code.org and CodeHS to gamify lessons."
    ]
  },
  {
    title: "Education Technologist",
    company: "Nanjing Hankai Academy",
    period: "06/2023 - Current",
    description: [
      "Managed and implemented QuickSchools Student Information System (SIS).",
      "Conducted professional development workshops for teachers on data collection and progress monitoring.",
      "Trained school leaders on incorporating SIS into school workflow.",
      "Supported implementation of Classin Learning Management System (LMS)."
    ]
  },
  {
    title: "Social Media Manager",
    company: "Education Science Institute of NNU School",
    period: "09/2017 - 09/2018",
    description: [
      "Coordinated between technical, editorial, and art departments for public WeChat account content.",
      "Organized activities and created plans for department goals."
    ]
  },
  {
    title: "Teaching Intern",
    company: "Nanjing Youth Maker Center",
    period: "07/2018 - 08/2018",
    description: [
      "Taught students EV3 robot programming with Scratch.",
      "Coached students for Jiangsu Provincial Trials of the 1st International Robot Competition (won Design and Creativity Awards)."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Master of Science: Education Technology",
    institution: "Nanjing Normal University",
    year: "06/2019",
    location: "Jiangsu, China"
  },
  {
    degree: "Bachelor of Science: Education Technology",
    institution: "Nanjing Normal University",
    year: "06/2016",
    location: "Jiangsu, China"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Technical",
    items: ["Python", "Java", "C#", "HTML/CSS", "MySQL", "LLM Prompt Engineering", "Unity 3D"]
  },
  {
    category: "Pedagogy",
    items: ["Project-Based Learning (PBL)", "IGCSE/A-Level", "Competition Coaching (ACSL/CCC)", "AI-Integrated Pedagogy"]
  },
  {
    category: "Platforms",
    items: ["SIS (QuickSchools)", "LMS (Google Classroom/Classin)", "AI Teaching Tools"]
  },
  {
    category: "Interests",
    items: ["Photography", "Digital Arts"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "AI-Integrated Pedagogy Training", year: "2025" },
  { name: "Cambridge A Level Computer Science Training", year: "2024" },
  { name: "Cambridge IGCSE Computer Science Training", year: "2020" },
  { name: "High School IT Teacher License", year: "2018" },
  { name: "CET 6 Certificate", year: "" }
];

export const ACCOMPLISHMENTS: Award[] = [
  { title: "ACSL Competition Outstanding Coach certificate" },
  { title: "OM Competition Outstanding Coach award" },
  { title: "Excellent Technology Instructor in Jiangsu (2020-2022)" },
  { title: "Excellent Lesson Preparation Award at Hankai (2022)" }
];
