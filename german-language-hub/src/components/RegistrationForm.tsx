import React, { useState, useEffect } from 'react';
import { GermanLevel, CurrentLevel, Gender, LearningReason, ClassTimeSlot, StudentRegistration, HighestEducation } from '../types';
import { LEARNING_REASONS } from '../data/coursesData';
import { ASIAN_COUNTRIES, CITIES_BY_COUNTRY, DEFAULT_ASIAN_CITIES } from '../data/asianLocationsData';
import { CheckCircle2, AlertCircle, ArrowRight, Phone, MessageSquare, User, Calendar, MapPin, Globe, Sparkles, Copy, Check, Video, Sun, Moon, Clock, GraduationCap } from 'lucide-react';

const HIGHEST_EDUCATION_OPTIONS: HighestEducation[] = [
  'Matric',
  'Intermediate',
  'Diploma',
  'Bachelor',
  'Master',
  'Other'
];

interface RegistrationFormProps {
  selectedLevel: GermanLevel;
  onLevelChange: (level: GermanLevel) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  selectedLevel,
  onLevelChange
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<Gender>('Male');
  const [countryCode, setCountryCode] = useState('+92');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [city, setCity] = useState('Lahore');
  const [customCity, setCustomCity] = useState('');
  const [highestEducation, setHighestEducation] = useState<HighestEducation | string>('Intermediate');
  const [customEducation, setCustomEducation] = useState('');
  const [currentLevel, setCurrentLevel] = useState<CurrentLevel>('No German / Beginner');
  const [targetLevel, setTargetLevel] = useState<GermanLevel>(selectedLevel);
  const [classTimeSlot, setClassTimeSlot] = useState<ClassTimeSlot>(
    'Morning Batch (10:00 AM – 11:00 AM)'
  );
  const [learningReason, setLearningReason] = useState<LearningReason>(
    'Study in Germany (Bachelor / Master Degree)'
  );

  // Validation & Submit State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<StudentRegistration | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Sync targetLevel if selectedLevel changes from external cards
  useEffect(() => {
    setTargetLevel(selectedLevel);
  }, [selectedLevel]);

  const handleCountryChange = (selectedCountryName: string) => {
    setCountry(selectedCountryName);
    const found = ASIAN_COUNTRIES.find((c) => c.name === selectedCountryName);
    if (found) {
      setCountryCode(found.code);
    }
    const cities = CITIES_BY_COUNTRY[selectedCountryName] || DEFAULT_ASIAN_CITIES;
    setCity(cities[0] || 'Other City');
    setCustomCity('');
  };

  const isCustomCityActive = city.toLowerCase().includes('other');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (at least 3 characters)';
    }

    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum < 12 || ageNum > 80) {
      newErrors.age = 'Please enter a valid age between 12 and 80';
    }

    const cleanedNumber = whatsappNumber.replace(/\D/g, '');
    if (!whatsappNumber.trim() || cleanedNumber.length < 8) {
      newErrors.whatsappNumber = 'Please enter a valid mobile number';
    }

    if (!country.trim()) {
      newErrors.country = 'Please select your country';
    }

    const effectiveCity = isCustomCityActive ? customCity.trim() : (customCity.trim() || city);
    if (!effectiveCity) {
      newErrors.city = 'Please specify or enter your city';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const effectiveCity = isCustomCityActive ? customCity.trim() : (customCity.trim() || city);
    const effectiveEducation = highestEducation === 'Other'
      ? (customEducation.trim() || 'Other')
      : highestEducation;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const regId = `DE-${new Date().getFullYear()}-${randomDigits}`;

    const newRegistration: StudentRegistration = {
      id: regId,
      fullName: fullName.trim(),
      age: parseInt(age, 10),
      gender,
      whatsappNumber: `${countryCode} ${whatsappNumber.trim()}`,
      country: country.trim(),
      city: effectiveCity,
      highestEducation: effectiveEducation,
      currentLevel,
      targetLevel,
      learningReason,
      classTimeSlot,
      createdAt: new Date().toISOString(),
      paymentStatus: 'pending'
    };

    try {
      const tgRes = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newRegistration,
          fullName: fullName.trim(),
          whatsapp: `${countryCode} ${whatsappNumber.trim()}`,
          city: effectiveCity,
          level: targetLevel,
          batch: classTimeSlot,
          purpose: learningReason,
        }),
      });
      if (!tgRes.ok) console.error('Telegram not sent');

      // Store in localStorage for persistence (accessible via secret lock 0062)
      try {
        const existing = localStorage.getItem('german_registrations');
        const list = existing ? JSON.parse(existing) : [];
        list.unshift(newRegistration);
        localStorage.setItem('german_registrations', JSON.stringify(list));
        window.dispatchEvent(new Event('registration_updated'));
      } catch {
        // Fallback
      }

      // Show success screen / Registration ID UI
      setSubmittedData(newRegistration);
    } catch (err: any) {
      setSubmitError(
        err?.message || 'Unable to submit registration. Please check your internet connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <section id="registration" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exact Header and Intro requested */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>Admissions Desk 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
            Student Registration Form
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Please fill in your correct information. After submitting the form, our team will review your registration and contact you.
          </p>
        </div>

        {/* Success Confirmation Card or Form */}
        {submittedData ? (
          <div className="bg-stone-50 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-lg animate-in fade-in zoom-in-95">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Application Submitted Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 mt-2">
                Willkommen! You are registered.
              </h3>
              <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
                Your application has been logged into the admissions system. Please save your Registration ID.
              </p>
            </div>

            {/* Registration ID Banner */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-xs text-stone-500 uppercase font-bold tracking-wider">Your Student Registration ID</span>
                <div className="text-2xl font-black text-stone-950 tracking-wide mt-0.5">
                  {submittedData.id}
                </div>
              </div>
              <button
                onClick={() => handleCopyId(submittedData.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
              >
                {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId ? 'Copied to Clipboard' : 'Copy Reg ID'}</span>
              </button>
            </div>

            {/* Summary Details */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-5 rounded-2xl border border-stone-200">
              <div>
                <span className="text-stone-500">Student Name:</span>
                <p className="font-bold text-stone-900 text-sm">{submittedData.fullName}</p>
              </div>
              <div>
                <span className="text-stone-500">Mobile / Contact Number:</span>
                <p className="font-bold text-stone-900 text-sm">{submittedData.whatsappNumber}</p>
              </div>
              <div>
                <span className="text-stone-500">Target Level:</span>
                <p className="font-bold text-red-600 text-sm">German Level {submittedData.targetLevel}</p>
              </div>
              <div>
                <span className="text-stone-500">Location:</span>
                <p className="font-bold text-stone-900 text-sm">{submittedData.city}, {submittedData.country}</p>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-stone-500">Highest Education:</span>
                  <p className="font-bold text-stone-900 text-sm flex items-center gap-1.5 mt-0.5">
                    <GraduationCap className="w-4 h-4 text-stone-700" />
                    <span>{submittedData.highestEducation || 'Not Specified'}</span>
                  </p>
                </div>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-stone-100">
                <span className="text-stone-500">Zoom Live Batch Timing:</span>
                <p className="font-bold text-blue-700 text-sm flex items-center gap-1.5 mt-0.5">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>{submittedData.classTimeSlot} (Zoom App Live)</span>
                </p>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-stone-100">
                <span className="text-stone-500">Learning Purpose:</span>
                <p className="font-semibold text-stone-800">{submittedData.learningReason}</p>
              </div>
            </div>

            {/* Next Step Info without WhatsApp or Payment button */}
            <div className="mt-8 space-y-3">
              <div className="p-4 sm:p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-center space-y-1.5">
                <div className="text-sm sm:text-base font-extrabold text-emerald-950">
                  Application Under Review by Admissions Team
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                  Aapki registration successfully submit ho chuki hai. Hamari team aapke contact number par review ke baad rabta karegi.
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setSubmittedData(null)}
                  className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Submit Another Registration / Register Another Student
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xs"
          >
            <div className="space-y-6">

              {/* Row 1: Full Name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Muhammad Hamza"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-xl bg-white border ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                      } text-stone-900 placeholder:text-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-950 focus:border-stone-950 transition-all`}
                    />
                    <User className="w-4 h-4 text-stone-400 absolute right-4 top-4 pointer-events-none" />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Age <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="e.g. 24"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min={12}
                      max={85}
                      className={`w-full px-4 py-3.5 rounded-xl bg-white border ${
                        errors.age ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                      } text-stone-900 placeholder:text-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-950 focus:border-stone-950 transition-all`}
                    />
                    <Calendar className="w-4 h-4 text-stone-400 absolute right-4 top-4 pointer-events-none" />
                  </div>
                  {errors.age && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.age}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Gender Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                  Gender <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Male', 'Female', 'Prefer not to say'] as Gender[]).map((g) => (
                    <label
                      key={g}
                      className={`flex items-center justify-center p-3 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${
                        gender === g
                          ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400 hover:bg-stone-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={gender === g}
                        onChange={() => setGender(g)}
                        className="sr-only"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 3: Mobile / Contact Number with All Asian Country Codes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                  Mobile / Contact Number (Rabta Number) <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="w-36 sm:w-48 shrink-0">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full px-2.5 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-stone-950 truncate"
                      title="Select Country Calling Code"
                    >
                      {ASIAN_COUNTRIES.map((c) => (
                        <option key={`cc-${c.name}-${c.code}`} value={c.code}>
                          {c.flag} {c.code} ({c.name})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      placeholder="300 1234567"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-xl bg-white border ${
                        errors.whatsappNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                      } text-stone-900 placeholder:text-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-950 focus:border-stone-950 transition-all`}
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute right-4 top-4 pointer-events-none" />
                  </div>
                </div>
                <p className="mt-1 text-[11px] text-stone-500">
                  Asia ke kisi bhi mulk ka active number enter karein taake selection par confirmation mil sake.
                </p>
                {errors.whatsappNumber && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>

              {/* Row 4: Country & City (All Asian Countries & Every City Option) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Country (Mulk) <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-950 appearance-none pr-10"
                    >
                      <optgroup label="Main">
                        <option value="Pakistan">🇵🇰 Pakistan</option>
                      </optgroup>
                      <optgroup label="Middle East / Gulf (Khaleej)">
                        {ASIAN_COUNTRIES.filter((c) => c.region === 'Middle East').map((c) => (
                          <option key={`country-${c.name}`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="South Asia">
                        {ASIAN_COUNTRIES.filter((c) => c.region === 'South Asia' && c.name !== 'Pakistan').map((c) => (
                          <option key={`country-${c.name}`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Southeast Asia">
                        {ASIAN_COUNTRIES.filter((c) => c.region === 'Southeast Asia').map((c) => (
                          <option key={`country-${c.name}`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="East Asia">
                        {ASIAN_COUNTRIES.filter((c) => c.region === 'East Asia').map((c) => (
                          <option key={`country-${c.name}`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Central Asia">
                        {ASIAN_COUNTRIES.filter((c) => c.region === 'Central Asia').map((c) => (
                          <option key={`country-${c.name}`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Other / Worldwide">
                        <option value="Other Country (Worldwide)">🌐 Other Country (Worldwide)</option>
                      </optgroup>
                    </select>
                    <Globe className="w-4 h-4 text-stone-400 absolute right-4 top-4 pointer-events-none" />
                  </div>
                  {errors.country && (
                    <p className="mt-1 text-xs text-red-600">{errors.country}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    City (Shehar) <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (!e.target.value.toLowerCase().includes('other')) {
                          setCustomCity('');
                        }
                      }}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-950 appearance-none pr-10"
                    >
                      {(CITIES_BY_COUNTRY[country] || DEFAULT_ASIAN_CITIES).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                      {!(CITIES_BY_COUNTRY[country] || DEFAULT_ASIAN_CITIES).some((c) => c.toLowerCase().includes('other')) && (
                        <option value="Other City">Other City / Town</option>
                      )}
                    </select>
                    <MapPin className="w-4 h-4 text-stone-400 absolute right-4 top-4 pointer-events-none" />
                  </div>

                  {/* Dynamic City Input for "Her city ka option" */}
                  {(isCustomCityActive || city.toLowerCase().includes('other')) && (
                    <div className="mt-2.5">
                      <input
                        type="text"
                        placeholder="Apna shehar, tehsil ya gaon yahan likhein (Type any city)..."
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-amber-300 ring-1 ring-amber-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-950"
                      />
                      <p className="mt-1 text-[11px] text-stone-500">
                        ✍️ Aap kisi bhi shehar ya ilaqay ka naam type kar sakte hain.
                      </p>
                    </div>
                  )}
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                  )}
                </div>
              </div>

              {/* Row: Highest Education (Matric, Intermediate, Diploma, Bachelor, Master, Other) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                    Highest Education <span className="text-red-600">*</span>
                  </label>
                  <span className="text-[11px] text-stone-500 font-medium">Aakhri Taleem</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {HIGHEST_EDUCATION_OPTIONS.map((edu) => (
                    <button
                      key={edu}
                      type="button"
                      onClick={() => setHighestEducation(edu)}
                      className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                        highestEducation === edu
                          ? 'bg-stone-950 text-white border-stone-950 shadow-xs ring-2 ring-stone-950'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400 hover:bg-stone-50'
                      }`}
                    >
                      <GraduationCap className={`w-3.5 h-3.5 ${highestEducation === edu ? 'text-amber-400' : 'text-stone-400'}`} />
                      <span>{edu}</span>
                    </button>
                  ))}
                </div>

                {highestEducation === 'Other' && (
                  <div className="mt-2.5 animate-in fade-in">
                    <input
                      type="text"
                      placeholder="Apni taleem yahan likhein (e.g. MPhil, PhD, DAE, Islamic Scholar, etc.)..."
                      value={customEducation}
                      onChange={(e) => setCustomEducation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-950"
                    />
                  </div>
                )}
              </div>

              {/* Row 5: Current German Language Level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                  Current German Language Level <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {(['No German / Beginner', 'A1', 'A2', 'B1', 'B2'] as CurrentLevel[]).map((lvl) => (
                    <label
                      key={lvl}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer text-center transition-all ${
                        currentLevel === lvl
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="currentLevel"
                        value={lvl}
                        checked={currentLevel === lvl}
                        onChange={() => setCurrentLevel(lvl)}
                        className="sr-only"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 6: Which German level do you want to learn? */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                  Which German level do you want to learn? <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['A1', 'A2', 'B1', 'B2'] as GermanLevel[]).map((lvl) => (
                    <label
                      key={lvl}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        targetLevel === lvl
                          ? 'bg-amber-500/10 border-amber-600 text-stone-950 font-extrabold shadow-sm'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 font-semibold'
                      }`}
                    >
                      <input
                        type="radio"
                        name="targetLevel"
                        value={lvl}
                        checked={targetLevel === lvl}
                        onChange={() => {
                          setTargetLevel(lvl);
                          onLevelChange(lvl);
                        }}
                        className="sr-only"
                      />
                      <span className="text-lg">Level {lvl}</span>
                      <span className="text-[11px] text-stone-500 font-normal mt-0.5">
                        {lvl === 'A1' ? 'Beginner' : lvl === 'A2' ? 'Elementary' : lvl === 'B1' ? 'Intermediate' : 'Upper Int.'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row: Classes on Zoom App — Two Timings (Koi 1 Select Karein) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 via-sky-50/60 to-white border-2 border-blue-300/80 shadow-xs">
                <div className="flex items-start sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-black text-blue-950 uppercase tracking-wide">
                          Classes Zoom App Perr Ho Gee (Live Online)
                        </h4>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">
                          Zoom App
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-blue-900 mt-0.5">
                        Class k 2 time hain — apni sahulat ke mutabiq koi 1 select karein: <span className="text-red-600 font-bold">*</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {/* Option 1: Morning 10:00 AM to 11:00 AM */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      classTimeSlot === 'Morning Batch (10:00 AM – 11:00 AM)'
                        ? 'bg-white border-blue-600 ring-3 ring-blue-500/20 shadow-sm'
                        : 'bg-white/80 border-stone-300 hover:border-blue-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="classTimeSlot"
                      value="Morning Batch (10:00 AM – 11:00 AM)"
                      checked={classTimeSlot === 'Morning Batch (10:00 AM – 11:00 AM)'}
                      onChange={() => setClassTimeSlot('Morning Batch (10:00 AM – 11:00 AM)')}
                      className="sr-only"
                    />
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Sun className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">Suba Batch (Morning)</span>
                        {classTimeSlot === 'Morning Batch (10:00 AM – 11:00 AM)' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <div className="text-base font-black text-blue-950 mt-0.5">
                        10:00 AM to 11:00 AM
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">Daily 1 Hour • Live on Zoom</span>
                    </div>
                  </label>

                  {/* Option 2: Night 9:00 PM to 10:00 PM */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      classTimeSlot === 'Night Batch (9:00 PM – 10:00 PM)'
                        ? 'bg-white border-blue-600 ring-3 ring-blue-500/20 shadow-sm'
                        : 'bg-white/80 border-stone-300 hover:border-blue-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="classTimeSlot"
                      value="Night Batch (9:00 PM – 10:00 PM)"
                      checked={classTimeSlot === 'Night Batch (9:00 PM – 10:00 PM)'}
                      onChange={() => setClassTimeSlot('Night Batch (9:00 PM – 10:00 PM)')}
                      className="sr-only"
                    />
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Moon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">Raat Batch (Night)</span>
                        {classTimeSlot === 'Night Batch (9:00 PM – 10:00 PM)' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <div className="text-base font-black text-blue-950 mt-0.5">
                        09:00 PM to 10:00 PM
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">Daily 1 Hour • Live on Zoom</span>
                    </div>
                  </label>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-900 font-medium bg-blue-100/70 p-2.5 rounded-xl">
                  <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>
                    <strong>Note:</strong> Zoom meeting link & class joining password will be shared in your WhatsApp batch group.
                  </span>
                </div>
              </div>

              {/* Row 7: Exact Question requested: Aap German zuban kyun seekhna chahte hain? */}
              <div>
                <label className="block text-sm font-bold text-stone-950 mb-1.5">
                  Aap German zuban kyun seekhna chahte hain? <span className="text-red-600">*</span>
                </label>
                <p className="text-xs text-stone-500 mb-2">
                  Please select your primary reason for learning German so we can guide your visa or academic roadmap:
                </p>
                <div className="relative">
                  <select
                    value={learningReason}
                    onChange={(e) => setLearningReason(e.target.value as LearningReason)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-stone-950"
                  >
                    {LEARNING_REASONS.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Note confirmation before button with exact Roman Urdu */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-400/50 text-stone-900 shadow-2xs">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-sm sm:text-base text-stone-950 block">
                      Registration Fee: PKR 5,000 (5K) — One Time Only
                    </span>
                    <p className="text-xs sm:text-sm text-stone-800 font-semibold mt-1 leading-relaxed">
                      📢 <strong>Zaroori Note:</strong> Agar aap select huay aur aap ko seat mili to aap ko <strong>5K registration fee one time</strong> deni hogi, yeh show karwane ke liye ke aap <strong>serious student</strong> hain.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submission Error Banner if Telegram API or network fails */}
              {submitError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-red-900">Submission Error</p>
                    <p className="mt-0.5 text-stone-700">{submitError}</p>
                    <p className="mt-1 text-[11px] text-stone-500">Please check your internet connection and click the submit button again.</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg bg-stone-950 hover:bg-stone-900 text-white shadow-lg hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2.5">
                    <span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <span>Sending Registration to Admissions...</span>
                  </span>
                ) : (
                  <>
                    <span>Submit Student Registration</span>
                    <ArrowRight className="w-5 h-5 text-amber-400" />
                  </>
                )}
              </button>

            </div>
          </form>
        )}

      </div>
    </section>
  );
};
