"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Network } from "lucide-react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { solutionsData } from "@/data/content/solutions";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// ═══════════════════════════════════════════════
// 3D INTERACTIVE ECOSYSTEM (Replaces Card Grid)
// ═══════════════════════════════════════════════
const EcosystemNodes = ({ activeNode, onNodeClick }: { activeNode: number | null, onNodeClick: (i: number) => void }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  const nodes = solutionsData.solutions.map((_, i) => {
    const angle = (i / solutionsData.solutions.length) * Math.PI * 2;
    const radius = 3.5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return new THREE.Vector3(x, y, 0);
  });

  return (
    <group ref={groupRef}>
      {/* Central Hub */}
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial color="#00C2C7" emissive="#00C2C7" emissiveIntensity={0.5} wireframe />
      </Sphere>
      <Sphere args={[0.4, 32, 32]}>
        <meshStandardMaterial color="#00C2C7" />
      </Sphere>

      {/* Nodes & Connections */}
      {nodes.map((pos, i) => {
        const isActive = activeNode === i || activeNode === null;
        const color = i % 2 === 0 ? "#00C2C7" : "#FFD28A";
        
        return (
          <group key={i}>
            <Line
              points={[[0, 0, 0], [pos.x, pos.y, pos.z]]}
              color={color}
              lineWidth={isActive ? 2 : 1}
              transparent
              opacity={isActive ? 0.6 : 0.1}
            />
            <mesh position={pos} onClick={() => onNodeClick(i)}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial 
                color={color} 
                transparent 
                opacity={isActive ? 0.9 : 0.3} 
              />
              {isActive && (
                <Html position={[0, -0.6, 0]} center style={{ pointerEvents: 'none' }}>
                  <div className="bg-slate/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                    <span className="text-sand font-headline text-[10px] tracking-wider uppercase font-bold">
                      {solutionsData.solutions[i].title}
                    </span>
                  </div>
                </Html>
              )}
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default function SolutionsPageClient() {
  const { hero, growthSystem, solutions, problemMatcher, connectedGrowth, finalCta } = solutionsData;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  
  const prefersReducedMotion = useReducedMotion();
  const [activeDomain, setActiveDomain] = useState<number | null>(0);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // 1. Hero Parallax
        gsap.to(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 100,
          opacity: 0,
        });

        // 2. Ecosystem Pinning
        const domainsContainer = domainsRef.current;
        if (domainsContainer && ecosystemRef.current) {
          // Pin the 3D ecosystem on the left while domains scroll on the right
          ScrollTrigger.create({
            trigger: domainsContainer,
            start: "top top",
            end: "bottom bottom",
            pin: ecosystemRef.current,
            pinSpacing: false,
          });

          // Trigger active domains as they scroll past
          const articles = domainsContainer.querySelectorAll("article");
          articles.forEach((article, i) => {
            ScrollTrigger.create({
              trigger: article,
              start: "top center",
              end: "bottom center",
              onEnter: () => setActiveDomain(i),
              onEnterBack: () => setActiveDomain(i),
              onLeave: () => { if (i === articles.length - 1) setActiveDomain(articles.length - 1); },
              onLeaveBack: () => { if (i === 0) setActiveDomain(0); }
            });
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="bg-sand text-slate w-full overflow-x-clip selection:bg-brand-coral selection:text-sand">
      
      {/* 1. HERO - Editorial Opening */}
      <section ref={heroRef} className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 max-w-screen-2xl mx-auto border-b border-brand-coral/20 z-10">
        <div className="inline-block mb-8 px-4 py-1.5 border border-brand-coral/30 rounded-full bg-brand-coral/5 text-brand-coral font-label text-xs uppercase tracking-widest font-semibold self-start">
          {hero.badge}
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black uppercase tracking-tighter leading-[0.85] mb-8 max-w-6xl">
          {hero.headline.replace(/\.$/, '').split('.').map((part, i, arr) => (
            <React.Fragment key={i}>
              {i === arr.length - 1 ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-gold">
                  {part}.
                </span>
              ) : (
                <>{part}.<br/></>
              )}
            </React.Fragment>
          ))}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <p className="text-xl md:text-2xl font-body font-light text-slate/80 leading-relaxed max-w-xl">
            {hero.intro}
          </p>
          <div className="flex flex-col gap-4 border-l-2 border-brand-coral pl-6 justify-center">
            <span className="text-sm font-label font-bold uppercase tracking-widest text-slate">{hero.statementPrimary}</span>
            <span className="text-sm font-label font-bold uppercase tracking-widest text-brand-coral">{hero.statementSecondary}</span>
          </div>
        </div>
      </section>

      {/* 2. THE GROWTH SYSTEM (Replacing the 6 white cards) */}
      <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-slate/10">
        <SectionMasthead badge={growthSystem.badge} descriptor={growthSystem.title} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tight text-slate">
              {growthSystem.subtitle}
            </h2>
            <div className="flex flex-col gap-4 pl-6 border-l-2 border-brand-coral/30">
              {growthSystem.needStatements.map((statement, idx) => (
                <p key={idx} className="text-lg font-body text-slate/70">
                  {statement}
                </p>
              ))}
            </div>
            <p className="text-xl font-body font-medium text-slate bg-brand-coral/5 p-6 rounded-r-2xl border-l-4 border-brand-coral">
              {growthSystem.conclusion}
            </p>
          </div>
          
          <div className="relative h-[500px] bg-slate rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center group">
             {/* Simple static network visualization for mobile / fallback */}
             <div className="absolute inset-0 z-0">
               <Canvas camera={{ position: [0, 0, 8] }}>
                 <ambientLight intensity={0.5} />
                 <pointLight position={[10, 10, 10]} intensity={1} color="#00C2C7" />
                 <EcosystemNodes activeNode={null} onNodeClick={() => {}} />
                 <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
               </Canvas>
             </div>
             <div className="absolute top-6 left-6 z-10 pointer-events-none">
               <span className="text-sand/50 font-label text-[10px] uppercase tracking-widest">
                 Live Architecture View
               </span>
             </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITY EXPLORER (Split Screen: 3D left, Scroll right) */}
      <section className="relative w-full bg-slate text-sand">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          
          {/* LEFT: Pinned 3D View */}
          <div ref={ecosystemRef} className="hidden lg:flex flex-col h-screen border-r border-white/10 p-12 bg-slate overflow-hidden">
            <div className="mb-8">
              <span className="text-brand-coral font-mono text-sm uppercase tracking-widest mb-2 block">System Map</span>
              <h3 className="text-3xl font-headline font-bold uppercase">Interconnected Capabilities</h3>
            </div>
            <div className="flex-1 relative -mx-12">
               <Canvas camera={{ position: [0, 0, 8] }}>
                 <ambientLight intensity={0.5} />
                 <pointLight position={[10, 10, 10]} intensity={1} color="#00C2C7" />
                 <EcosystemNodes activeNode={activeDomain} onNodeClick={setActiveDomain} />
               </Canvas>
            </div>
          </div>

          {/* RIGHT: Scrolling Content */}
          <div ref={domainsRef} className="flex flex-col w-full relative z-10 bg-slate">
            {solutions.map((domain, i) => (
              <article 
                key={domain.id} 
                className="min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 border-b border-white/5 transition-opacity duration-500"
                style={{ opacity: activeDomain === null || activeDomain === i ? 1 : 0.5 }}
              >
                <div className="text-brand-coral font-mono text-sm font-bold tracking-widest mb-4">
                  {domain.number}{" // CAPABILITY"}
                </div>
                <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tight mb-6">
                  {domain.title}
                </h2>
                <h3 className="text-xl md:text-2xl text-gold font-body mb-8">
                  {domain.tagline}
                </h3>
                
                <div className="flex flex-col gap-6 mb-12 border-l-2 border-white/10 pl-6">
                  {domain.descriptions.map((desc, idx) => (
                    <p key={idx} className="text-lg font-body text-sand/80 leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h4 className="text-sm font-label font-bold uppercase tracking-widest text-white/50 mb-6">
                      What We Build
                    </h4>
                    <ul className="flex flex-col gap-4">
                      {domain.helpWith.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brand-coral shrink-0" />
                          <span className="text-sand/90 font-body">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-label font-bold uppercase tracking-widest text-white/50 mb-6">
                      Best For Businesses That...
                    </h4>
                    <ul className="flex flex-col gap-4">
                      {domain.bestFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sand/70 font-body">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <Button
                    variant="outline"
                    asLink
                    href={domain.cta.href}
                    className="border-brand-coral text-brand-coral hover:bg-brand-coral hover:border-brand-coral hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-slate group w-full sm:w-auto"
                  >
                    {domain.cta.label}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DIAGNOSTIC MATCHER */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-block mb-6 px-4 py-1.5 border border-slate/20 rounded-full bg-slate/5 text-slate font-label text-xs uppercase tracking-widest font-semibold">
            {problemMatcher.badge}
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold uppercase tracking-tight text-slate mb-6">
            {problemMatcher.title}
          </h2>
          <p className="text-xl text-slate/70 font-body max-w-2xl">
            {problemMatcher.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full max-w-4xl mx-auto">
          {problemMatcher.items.map((item, i) => (
            <Link key={i} href={item.href} className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 bg-white rounded-2xl border border-slate/10 hover:border-brand-coral transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="text-lg font-body font-medium text-slate mb-4 md:mb-0">
                {item.problem}
              </span>
              <div className="flex items-center gap-4 text-brand-coral">
                <span className="font-headline font-bold uppercase tracking-wider text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  {item.recommendation}
                </span>
                <div className="w-10 h-10 rounded-full bg-brand-coral/10 flex items-center justify-center group-hover:bg-brand-coral group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <Link href={problemMatcher.cta.href}>
            <Button className="bg-slate text-sand hover:bg-brand-coral transition-colors">
              {problemMatcher.cta.label}
            </Button>
          </Link>
        </div>
      </section>

      {/* 5. CONNECTED GROWTH PHILOSOPHY */}
      <section className="py-24 px-6 md:px-12 bg-slate text-sand text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <Network className="w-12 h-12 text-gold mb-8" />
          <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tight mb-8">
            {connectedGrowth.title}
          </h2>
          <p className="text-2xl text-sand/80 font-body mb-16">
            {connectedGrowth.subtitle}
          </p>
          
          <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 w-full text-left">
            <p className="text-lg font-label uppercase tracking-widest text-brand-coral mb-8">
              {connectedGrowth.lead}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {connectedGrowth.nodes.map((node, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 font-mono text-xs mt-1">
                    {i + 1}
                  </span>
                  <p className="text-sand font-body text-lg">
                    <strong className="font-headline text-white">{node.name}</strong> {node.purpose}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-2">
              <strong className="text-xl font-headline text-brand-coral uppercase tracking-wide">
                {connectedGrowth.approachPrimary}
              </strong>
              <p className="text-lg text-sand/70 font-body">
                {connectedGrowth.approachSecondary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-32 px-6 md:px-12 text-center bg-sand">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter text-slate mb-8">
            {finalCta.headline}
          </h2>
          <div className="flex flex-col gap-4 mb-12">
            {finalCta.paragraphs.map((p, i) => (
              <p key={i} className="text-xl font-body text-slate/70">
                {p}
              </p>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href={finalCta.primaryCta.href}>
              <Button size="lg" className="bg-brand-navy text-white hover:bg-brand-coral hover:text-brand-navy w-full sm:w-auto">
                {finalCta.primaryCta.label}
              </Button>
            </Link>
            <Link href={finalCta.secondaryCta.href}>
              <Button size="lg" variant="outline" className="border-slate text-slate hover:bg-slate hover:text-sand w-full sm:w-auto">
                {finalCta.secondaryCta.label}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
