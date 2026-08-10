'use client';

import { useState } from 'react';
import { Play, Youtube, ArrowRight, Clock } from 'lucide-react';

interface DemoVideo {
  id: string;
  youtubeId: string;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
}

const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: 'demo-hernia',
    youtubeId: 'IbMvOpZj7W8',
    title: 'Inguinal Hernia Made Easy: Anatomy + Direct vs Indirect vs Femoral',
    duration: '21 min',
    description: 'Master the complex anatomy of the inguinal canal, abdominal wall layers, deep & superficial rings, and memory mnemonics to differentiate direct, indirect, and femoral hernias effortlessly.',
    thumbnail: 'https://img.youtube.com/vi/IbMvOpZj7W8/hqdefault.jpg',
  },
  {
    id: 'demo-pneumonia',
    youtubeId: '8ZDy07H9j-4',
    title: 'Pneumonia Masterclass: High-Yield MCQs & Pathology Concepts',
    duration: 'Masterclass',
    description: 'A high-yield breakdown of lobar pneumonia, bronchopneumonia, atypical pathogens, chest X-ray findings, and exam-tested MCQs for USMLE Step 1, FCPS Part 1, and MBBS.',
    thumbnail: 'https://img.youtube.com/vi/8ZDy07H9j-4/hqdefault.jpg',
  },
  {
    id: 'demo-xray',
    youtubeId: 'KSUbT4e1GMQ',
    title: 'Chest X-Ray Interpretation Made Easy: Systematic 5-Step Approach',
    duration: 'Masterclass',
    description: 'Learn a foolproof 5-step systematic approach to reading chest X-rays, identifying consolidation, pneumothorax, pleural effusion, cardiomegaly, and emergency radiological signs.',
    thumbnail: 'https://img.youtube.com/vi/KSUbT4e1GMQ/hqdefault.jpg',
  },
];

export function DemoLecture() {
  const [activeVideo, setActiveVideo] = useState<DemoVideo>(DEMO_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleSelectVideo = (video: DemoVideo) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  return (
    <section id="demo" className="py-20 sm:py-28 bg-[#F8FAFC] border-y border-[#D8E9F1]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="reveal text-sm font-bold uppercase tracking-widest text-[#2D939F]">
            Interactive Lecture Experience
          </p>
          <h2 className="reveal mt-3 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
            Watch Demo Lectures
          </h2>
          <p className="reveal mt-4 text-lg text-[#5A6E82]">
            Experience our concept-first teaching methodology before enrolling. Select any lecture topic below to play directly.
          </p>
        </div>

        {/* Video Player & Playlist Gallery Grid */}
        <div className="reveal mt-12 grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Active Video Player (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-[#D8E9F1] bg-white p-4 sm:p-6 shadow-md">
            
            {/* Embed Video Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="relative h-full w-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
                  <img
                    src={activeVideo.thumbnail}
                    alt={activeVideo.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center">
                    <button
                      aria-label="Play video"
                      className="grid place-items-center w-20 h-20 rounded-full bg-[#2D939F] text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#257B85]"
                    >
                      <Play className="w-9 h-9 fill-current translate-x-0.5" />
                    </button>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-black/70 px-3.5 py-1 text-xs font-medium text-white backdrop-blur flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#2D939F]" />
                      {activeVideo.duration}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Active Video Info */}
            <div className="mt-6 p-2">
              <h3 className="font-display text-2xl font-semibold text-[#1A3B5E] leading-snug">
                {activeVideo.title}
              </h3>
              
              <p className="mt-3 text-base text-[#5A6E82] leading-relaxed">
                {activeVideo.description}
              </p>
            </div>

          </div>

          {/* Playlist Selector Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#D8E9F1]">
              <h4 className="font-display text-lg font-bold text-[#1A3B5E]">
                Select Demo Lecture
              </h4>
              <span className="text-xs font-semibold text-[#5A6E82]">
                {DEMO_VIDEOS.length} Lectures
              </span>
            </div>

            <div className="space-y-3.5">
              {DEMO_VIDEOS.map((video) => {
                const isActive = activeVideo.id === video.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex gap-3.5 items-center ${
                      isActive
                        ? 'border-[#2D939F] bg-[#E0F4F6] shadow-sm'
                        : 'border-[#D8E9F1] bg-white hover:border-[#2D939F]/50 hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {/* Mini Thumbnail */}
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className={`grid place-items-center w-7 h-7 rounded-full ${isActive ? 'bg-[#2D939F] text-white' : 'bg-white/80 text-[#1A3B5E]'}`}>
                          <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A3B5E] line-clamp-2 leading-snug">
                        {video.title}
                      </p>
                      <span className="text-[11px] font-medium text-[#5A6E82] mt-1 inline-block">
                        Click to Play
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* YouTube Link Banner */}
            <div className="mt-6 rounded-2xl border border-[#D8E9F1] bg-white p-5 text-center shadow-sm">
              <p className="text-xs font-semibold text-[#5A6E82]">
                Want to explore more full-length lectures?
              </p>
              <a
                href="https://www.youtube.com/@conceptstoclinics"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#2D939F] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#257B85]"
              >
                <Youtube className="w-4 h-4" />
                Visit Official YouTube Channel
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
