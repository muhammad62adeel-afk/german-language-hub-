/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GlobalTickerBanner } from './components/GlobalTickerBanner';
import { TopSponsorBanner } from './components/TopSponsorBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RegistrationForm } from './components/RegistrationForm';
import { GermanyRoadmapSection } from './components/GermanyRoadmapSection';
import { SponsorMessage } from './components/SponsorMessage';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { PlacementQuizModal } from './components/PlacementQuizModal';
import { AIChatBot } from './components/AIChatBot';
import { ActiveAnnouncementBanner } from './components/ActiveAnnouncementBanner';
import { OfficialGroupsSection } from './components/OfficialGroupsSection';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { GermanLevel } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });
  const [selectedLevel, setSelectedLevel] = useState<GermanLevel>('A1');
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const scrollToRegistration = (level?: GermanLevel) => {
    if (currentPath !== '/') {
      navigateTo('/');
      setTimeout(() => {
        if (level) setSelectedLevel(level);
        const elem = document.getElementById('registration');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (level) {
      setSelectedLevel(level);
    }
    const elem = document.getElementById('registration');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If path is /admin, render the full protected Admin Dashboard Page
  if (currentPath === '/admin') {
    return <AdminDashboardPage onNavigateHome={() => navigateTo('/')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-400 selection:text-stone-950 font-sans">
      
      {/* Running Global Announcement Ticker: Anyone from any country can learn German A1, A2, B1, B2 for free */}
      <GlobalTickerBanner />

      {/* 1. Website Header: Sponsor display at the very top (with discreet secret admin lock) */}
      <TopSponsorBanner onOpenAdmin={() => navigateTo('/admin')} />

      {/* Main Navigation */}
      <Navbar
        onRegisterClick={() => scrollToRegistration()}
        onOpenAdmin={() => navigateTo('/admin')}
      />

      {/* Active Batch & Admission Notice Banner (Managed inside Admin Dashboard Lock) */}
      <ActiveAnnouncementBanner onRegisterClick={() => scrollToRegistration()} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onRegisterClick={() => scrollToRegistration()}
          onOpenQuiz={() => setQuizModalOpen(true)}
        />

        {/* 3. Registration Form */}
        <RegistrationForm
          selectedLevel={selectedLevel}
          onLevelChange={(lvl) => setSelectedLevel(lvl)}
        />

        {/* 4. Official WhatsApp & Community Groups (Admin Uploadable) */}
        <OfficialGroupsSection
          onRegisterClick={() => scrollToRegistration()}
        />

        {/* Roadmap to Germany */}
        <GermanyRoadmapSection />

        {/* Sponsor Profile: Ahmed Rajput */}
        <SponsorMessage />

        {/* Student Reviews & Feedback (553 Reviews) */}
        <ReviewsSection />

        {/* FAQs */}
        <FAQSection />
      </main>

      {/* Footer (discreet safe admin access inside footer) */}
      <Footer onOpenAdmin={() => navigateTo('/admin')} />

      {/* Interactive Level Placement Quiz Modal */}
      <PlacementQuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        onSelectRecommendedLevel={(lvl) => scrollToRegistration(lvl)}
      />

      {/* Floating Bottom-Right German Learning AI Assistant ChatBot */}
      <AIChatBot onRegisterClick={() => scrollToRegistration()} />

    </div>
  );
}
