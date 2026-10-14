"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("theme-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("theme-change", onChange);
  };
}

function getStoredTheme() {
  return localStorage.getItem("theme") === "dark" ? "dark" : "light";
}

function getServerTheme() {
  return null;
}

function setDark(dark: boolean) {
  localStorage.setItem("theme", dark ? "dark" : "light");
  window.dispatchEvent(new Event("theme-change"));
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = ref.current?.querySelectorAll(".fade-in");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useHeroScroll() {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 500);
      const scale = 1 - scrollY * 0.0002;
      ref.current.style.opacity = String(opacity);
      ref.current.style.transform = `scale(${Math.max(0.9, scale)})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return ref;
}

export default function Home() {
  const theme = useSyncExternalStore<string | null>(
    subscribeToTheme,
    getStoredTheme,
    getServerTheme
  );
  const dark = theme === "dark";
  const mounted = theme !== null;
  const containerRef = useFadeIn();
  const heroRef = useHeroScroll();

  const d = (light: string, darkClass: string) => (dark ? darkClass : light);

  const projects = [
    {
      title: "个人主页",
      desc: "你正在浏览的这个网站。使用 Next.js + Tailwind CSS 构建，Apple 风格设计，支持深色模式与响应式布局。",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      image: d(
        "from-[#e8e8ed] via-[#d2d2d7] to-[#c7c7cc]",
        "from-[#1c1c1e] via-[#2c2c2e] to-[#3a3a3c]"
      ),
    },
    {
      title: "项目二",
      desc: "在这里添加你的第二个项目描述，介绍项目的功能、技术栈和你的贡献。",
      tags: ["Python", "Django"],
      image: d(
        "from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd]",
        "from-[#0c1929] via-[#162d50] to-[#1e3a5f]"
      ),
    },
    {
      title: "项目三",
      desc: "在这里添加你的第三个项目描述，展示你的技术深度和解决问题的能力。",
      tags: ["Java", "Spring Boot"],
      image: d(
        "from-[#dcfce7] via-[#bbf7d0] to-[#86efac]",
        "from-[#052e16] via-[#14532d] to-[#166534]"
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${d("bg-[#fbfbfd] text-[#1d1d1f]", "bg-black text-[#f5f5f7]")} ${mounted ? "" : "invisible"}`}
    >
      {/* 导航栏 */}
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-colors ${d("bg-[#fbfbfd]/80 border-black/10", "bg-black/80 border-white/10")}`}
      >
        <div className="max-w-6xl mx-auto px-8 h-12 flex items-center justify-between">
          <a href="#" className="text-base font-semibold tracking-tight">
            Chenglintao
          </a>
          <div className="flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#about" className={`link-underline transition-colors ${d("text-[#6e6e73] hover:text-[#1d1d1f]", "text-[#86868b] hover:text-[#f5f5f7]")}`}>关于</a>
            <a href="#projects" className={`link-underline transition-colors ${d("text-[#6e6e73] hover:text-[#1d1d1f]", "text-[#86868b] hover:text-[#f5f5f7]")}`}>作品</a>
            <a href="#contact" className={`link-underline transition-colors ${d("text-[#6e6e73] hover:text-[#1d1d1f]", "text-[#86868b] hover:text-[#f5f5f7]")}`}>联系</a>
            <button
              onClick={() => setDark(!dark)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${d("bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]", "bg-[#1d1d1f] text-[#f5f5f7] hover:bg-[#2d2d2f]")}`}
            >
              {dark ? "☀" : "☾"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        <div className="fade-in">
          <p className="text-sm font-medium tracking-widest uppercase mb-6 text-[#0071e3]">
            Welcome
          </p>
        </div>
        <div ref={heroRef} className="fade-in fade-in-delay-1 hero-title">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            我是 Chenglintao
          </h1>
        </div>
        <div className="fade-in fade-in-delay-2">
          <p className={`mt-8 text-xl sm:text-2xl font-light max-w-xl leading-relaxed ${d("text-[#6e6e73]", "text-[#86868b]")}`}>
            全栈开发者，热衷于创造简洁、优雅的数字体验。
          </p>
        </div>
        <div className="fade-in fade-in-delay-3 mt-12 flex flex-col sm:flex-row gap-4">
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full text-sm font-medium bg-[#0071e3] text-white hover:bg-[#0077ED] transition-colors"
          >
            探索作品
          </a>
          <a
            href="#contact"
            className={`px-8 py-3.5 rounded-full text-sm font-medium border transition-colors ${d("border-[#d2d2d7] text-[#0071e3] hover:bg-[#f5f5f7]", "border-[#424245] text-[#2997ff] hover:bg-[#1d1d1f]")}`}
          >
            联系我
          </a>
        </div>

        {/* 滚动指示器 */}
        <div className={`absolute bottom-10 scroll-indicator ${d("text-[#c7c7cc]", "text-[#424245]")}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* 关于 */}
      <section id="about" className={`py-32 px-6 ${d("bg-[#f5f5f7]", "bg-[#161617]")}`}>
        <div className="max-w-4xl mx-auto">
          <div className="fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">
              关于我
            </h2>
          </div>
          <div className={`fade-in fade-in-delay-1 mt-12 text-lg sm:text-xl leading-relaxed text-center max-w-2xl mx-auto ${d("text-[#6e6e73]", "text-[#a1a1a6]")}`}>
            <p>
              我是一名开发者，擅长 Python 和 Java，正在探索前端开发的世界。
              我相信好的技术应该像 Apple 的产品一样——简洁、优雅、直觉化。
              目前专注于构建现代化的 Web 应用，对用户体验设计和交互动画充满热情。
            </p>
          </div>
          <div className="fade-in fade-in-delay-2 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Python", desc: "后端开发" },
              { label: "Java", desc: "企业应用" },
              { label: "TypeScript", desc: "前端开发" },
              { label: "Next.js", desc: "全栈框架" },
            ].map((skill) => (
              <div
                key={skill.label}
                className={`rounded-2xl p-6 text-center transition-colors ${d("bg-[#fbfbfd] shadow-sm", "bg-[#1c1c1e]")}`}
              >
                <div className="text-2xl font-bold tracking-tight">{skill.label}</div>
                <div className={`text-sm mt-2 ${d("text-[#6e6e73]", "text-[#86868b]")}`}>{skill.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 作品集 */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="fade-in text-center">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">作品集</h2>
            <p className={`text-lg mt-4 ${d("text-[#6e6e73]", "text-[#86868b]")}`}>精选项目展示</p>
          </div>
          <div className="mt-20 space-y-16">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className={`fade-in flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* 项目截图 */}
                <div className="w-full md:w-1/2 project-image">
                  <div className={`aspect-[16/10] rounded-2xl bg-gradient-to-br ${project.image} flex items-center justify-center`}>
                    <span className={`text-4xl font-bold ${d("text-white/60", "text-white/10")}`}>{project.title}</span>
                  </div>
                </div>
                {/* 项目信息 */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{project.title}</h3>
                  <p className={`mt-4 text-lg leading-relaxed ${d("text-[#6e6e73]", "text-[#a1a1a6]")}`}>{project.desc}</p>
                  <div className="mt-6 flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${d("bg-[#f5f5f7] text-[#6e6e73]", "bg-[#1c1c1e] text-[#86868b]")}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系 */}
      <section id="contact" className={`py-32 px-6 ${d("bg-[#f5f5f7]", "bg-[#161617]")}`}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              联系我
            </h2>
          </div>
          <div className="fade-in fade-in-delay-1">
            <p className={`text-lg sm:text-xl mt-6 ${d("text-[#6e6e73]", "text-[#86868b]")}`}>
              有合作想法或想聊聊？随时联系我。
            </p>
          </div>
          <div className="fade-in fade-in-delay-2 mt-10">
            <a
              href="mailto:chenglintao@whut.edu.cn"
              className="inline-block px-10 py-4 rounded-full text-base font-medium bg-[#0071e3] text-white hover:bg-[#0077ED] transition-colors"
            >
              发送邮件
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 border-t ${d("border-black/10", "border-white/10")}`}>
        <div className={`max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${d("text-[#6e6e73]", "text-[#86868b]")}`}>
          <span>&copy; 2026 Chenglintao. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="https://github.com/OrangeChengcc" className="link-underline hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="link-underline hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="link-underline hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
