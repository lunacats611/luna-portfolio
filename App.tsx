
import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Mail, MapPin, GraduationCap, Briefcase, 
  Code, Award, ShieldCheck, ChevronRight, MessageSquare, 
  Send, Sparkles, X, Globe, MousePointer2, Terminal, Cpu, Database, Clock, ExternalLink, Github
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { 
  PERSONAL_INFO, 
  WORK_HISTORY, 
  EDUCATION, 
  SKILLS, 
  CERTIFICATIONS, 
  ACCOMPLISHMENTS 
} from './constants';

const App: React.FC = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const calculateExperience = () => {
    const now = new Date();
    const startYear = 2019;
    const startMonth = 7; 
    let years = now.getFullYear() - startYear;
    if (now.getMonth() < startMonth) {
      years--;
    }
    return years;
  };

  const experienceYears = calculateExperience();
  const dynamicSummary = PERSONAL_INFO.summary.replace(/6 years/g, `${experienceYears} years`);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    ['about', 'experience', 'skills', 'education'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue("");
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = `
        You are a helpful AI assistant representing Luna Xu, a professional Computer Science Teacher.
        Background Summary: ${dynamicSummary}
        Work History: ${JSON.stringify(WORK_HISTORY)}
        Education: ${JSON.stringify(EDUCATION)}
        Skills: ${JSON.stringify(SKILLS)}
        Answer questions professionally. Keep answers concise.
      `;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `${context}\n\nUser Question: ${userMsg}`,
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const navLinks = [
    { name: 'About', id: 'about', icon: <Terminal size={20} /> },
    { name: 'Exp.', id: 'experience', icon: <Cpu size={20} /> },
    { name: 'Skills', id: 'skills', icon: <Code size={20} /> },
    { name: 'Edu.', id: 'education', icon: <Database size={20} /> },
  ];

  const highlightKeywords = (text: string) => {
    const linkableKeywords: Record<string, string> = {
      "Logic Gates": "https://lunacats611.github.io/logic_gate/",
      "CS vocabulary flashcards": "https://lunacats611.github.io/AS_CS_Vocabularies_Flashcards/"
    };

    const keywords = [
      "88% A/A*", "Java", "Python", "LLM", "PBL", "IGCSE", "A-Level", 
      `${experienceYears} years`, "1st prize", "Outstanding Coach", "M.Sc. in EdTech", 
      "AI-integrated pedagogy", "Computer Science Teacher", "EdTech",
      "CS Educator", "Prompt Engineering", "Logic Gates", "CS vocabulary flashcards"
    ];

    let parts: (string | React.ReactNode)[] = [text];
    const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);

    sortedKeywords.forEach(keyword => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach(part => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }
        const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const split = part.split(regex);
        newParts.push(...split);
      });
      parts = newParts;
    });

    return parts.map((part, i) => {
      if (typeof part !== 'string') return part;
      const foundKeyword = keywords.find(k => k.toLowerCase() === part.toLowerCase());
      if (foundKeyword) {
        const linkKey = Object.keys(linkableKeywords).find(k => k.toLowerCase() === foundKeyword.toLowerCase());
        if (linkKey) {
          return (
            <a 
              key={i} 
              href={linkableKeywords[linkKey]} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-indigo-600 font-bold border-b-2 border-indigo-200 hover:bg-indigo-50 transition-colors"
            >
              {part}
              <ExternalLink size={12} className="opacity-60" />
            </a>
          );
        }
        return <span key={i} className="text-indigo-600 font-bold border-b-2 border-indigo-100">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen relative pb-20 overflow-x-hidden bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>

      <nav className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 border-2 ${
                isActive 
                  ? 'bg-slate-900 text-emerald-400 border-slate-900 shadow-2xl scale-110' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {link.icon}
              <span className="absolute right-full mr-4 px-2 py-1 bg-slate-900 text-white text-[9px] font-black tracking-widest uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {link.name}
              </span>
            </a>
          );
        })}
      </nav>

      <header id="about" className="relative pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24 z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900 text-emerald-400 rounded-lg text-[10px] font-black tracking-[0.2em] uppercase shadow-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              System.status: Professional_Mode
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-tight tracking-tighter">
                Luna <span className="text-indigo-600 relative inline-block">
                  Xu.
                  <div className="absolute -bottom-2 left-0 w-full h-2 bg-emerald-400/30 -z-10"></div>
                </span>
              </h1>
              <div className="flex items-center gap-4 text-xl md:text-2xl uppercase tracking-tighter">
                <span className="text-indigo-600 font-black tracking-tight">// CS Educator</span>
                <span className="w-8 h-px bg-slate-200"></span>
                <span className="text-slate-300 font-bold">EdTech Architect</span>
              </div>
            </div>

            <div className="relative p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-sm max-w-2xl group overflow-hidden">
              <p className="text-lg text-slate-600 leading-relaxed font-medium relative z-10">
                {highlightKeywords(dynamicSummary)}
              </p>
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Deployment Location</span>
                <span className="font-bold text-slate-700 flex items-center gap-2"><MapPin size={16} className="text-indigo-500"/>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Direct Interface</span>
                <span className="font-bold text-slate-700 flex items-center gap-2"><Mail size={16} className="text-indigo-500"/>{PERSONAL_INFO.email}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square">
              <div className="absolute inset-0 bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white rotate-2 group cursor-pointer hover:rotate-0 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Technology" 
                  className="w-full h-full object-cover opacity-60 mix-blend-screen"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Cpu size={80} className="text-emerald-400/80" />
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-36 h-36 bg-indigo-600 rounded-3xl shadow-xl flex items-center justify-center p-4 text-white -rotate-6 z-10">
                <div className="text-center">
                  <div className="text-5xl font-black tracking-tighter leading-none">88%</div>
                  <div className="text-[14px] font-black uppercase mt-3 tracking-tighter">A/A* Rate</div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-4 w-36 h-36 bg-white rounded-3xl shadow-2xl border border-slate-100 flex items-center justify-center p-4 text-slate-900 rotate-3 z-10">
                <div className="text-center">
                   <div className="text-indigo-600 mb-2 flex justify-center"><Clock size={28} /></div>
                   <div className="text-3xl font-black tracking-tighter leading-none">{experienceYears}Y+</div>
                   <div className="text-[10px] font-black uppercase mt-1 tracking-widest text-slate-400">Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="experience" className="bg-slate-900 py-32 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-20 flex items-center justify-between border-b border-white/10 pb-8">
            <div>
              <span className="text-emerald-400 font-bold tracking-[0.4em] uppercase text-[9px]">Log_Files</span>
              <h2 className="text-4xl font-bold text-white mt-2">Professional Runtime</h2>
            </div>
          </div>

          <div className="grid gap-12">
            {WORK_HISTORY.map((job, idx) => (
              <div key={idx} className="group relative">
                <div className="flex flex-col md:grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-4">
                    <span className="text-xs font-black text-white/30 tracking-widest uppercase mb-4 block">[{job.period}]</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">{job.title}</h3>
                    <p className="text-indigo-400 font-bold mt-1 opacity-80">{job.company}</p>
                  </div>
                  <div className="md:col-span-8 space-y-6">
                    <div className="grid gap-4">
                      {job.description.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-4 text-white/50 text-sm leading-relaxed font-medium">
                          <span className="text-emerald-500/50 font-black mt-0.5 text-[10px]">0{pIdx + 1}</span>
                          <p className="group-hover:text-white/80 transition-colors">{highlightKeywords(point)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-24">
          <div className="lg:w-1/2 space-y-16">
            <div>
              <span className="text-indigo-600 font-bold tracking-[0.4em] uppercase text-[10px]">Technology_Arsenal</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2">Core Competencies</h2>
            </div>
            <div className="space-y-12">
              {SKILLS.map((cat, idx) => (
                <div key={idx} className="relative">
                  <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-slate-200"></span>
                    {cat.category}
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {cat.items.map((skill, sIdx) => (
                      <div key={sIdx} className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 shadow-sm hover:bg-slate-900 hover:text-emerald-400 hover:border-slate-900 transition-all cursor-default group">
                        <span className="opacity-40 mr-2 font-normal">#</span>{skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-12">
              <div>
                <span className="text-emerald-600 font-bold tracking-[0.4em] uppercase text-[10px]">Verification_Nodes</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-2">Certification & Honors</h2>
              </div>
              <div className="space-y-6">
                {ACCOMPLISHMENTS.map((award, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-5 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                      <Award size={28} />
                    </div>
                    <span className="text-slate-800 font-black text-sm">{award.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="bg-white py-32 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-emerald-400 shadow-2xl">
                <GraduationCap size={40} />
              </div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tight">Academic <br/>Infrastructure</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
                Master of Science specializing in how emerging technologies reshape modern learning environments.
              </p>
            </div>
            <div className="grid gap-6">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="p-10 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <p className="text-indigo-600 font-black mb-4 uppercase text-[10px] tracking-[0.3em]">{edu.year}</p>
                  <h3 className="text-2xl font-black mb-2 text-slate-900">{edu.degree}</h3>
                  <p className="text-slate-400 font-bold flex items-center gap-2">
                    <MapPin size={12} />
                    {edu.institution} | {edu.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-slate-100 bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="p-3 bg-slate-900 text-white rounded-xl hover:scale-110 transition-transform">
              <Mail size={24} />
            </a>
            <a href="https://github.com/lunacats611" target="_blank" className="p-3 bg-slate-900 text-white rounded-xl hover:scale-110 transition-transform">
              <Github size={24} />
            </a>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} LUNA XU. CRAFTED FOR THE FUTURE OF EDUCATION.
          </p>
        </div>
      </footer>

      {isAiOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAiOpen(false)}></div>
          <div className="w-full max-w-md bg-white h-full relative shadow-2xl flex flex-col animate-slide-in-right overflow-hidden border-l border-slate-100">
            <div className="p-8 bg-slate-900 text-white flex justify-between items-center relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-900">
                  <Terminal size={24} />
                </div>
                <div>
                  <h3 className="font-black text-lg tracking-tight">AI.Assistant</h3>
                </div>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-all">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-2xl text-xs font-bold leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-slate-900 text-emerald-400 rounded-tr-none' 
                      : 'bg-white text-slate-600 rounded-tl-none border border-slate-100'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-5 rounded-2xl rounded-tl-none flex items-center gap-2 border border-slate-100">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t border-slate-100 bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-6 pr-14 text-xs font-black focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-3 top-2 bg-slate-900 text-emerald-400 p-2.5 rounded-lg hover:bg-black disabled:bg-slate-100 disabled:text-slate-300 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-slate-900 text-emerald-400 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[60] border-4 border-white group"
      >
        <Sparkles size={28} />
      </button>
    </div>
  );
};

export default App;
