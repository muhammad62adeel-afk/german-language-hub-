import React, { useState, useEffect } from 'react';
import { GermanLevel, CurrentLevel, Gender, LearningReason, ClassTimeSlot, StudentRegistration, HighestEducation } from '../types';
import { LEARNING_REASONS } from '../data/coursesData';
import { ASIAN_COUNTRIES, CITIES_BY_COUNTRY, DEFAULT_ASIAN_CITIES } from '../data/asianLocationsData';
import { REFERRAL_OPTIONS } from '../constants/referrals';
import { CheckCircle2, AlertCircle, ArrowRight, Phone, MessageSquare, User, Calendar, MapPin, Globe, Sparkles, Copy, Check, Video, Sun, Moon, Clock, GraduationCap, Compass } from 'lucide-react';

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
  const [referralSource, setReferralSource] = useState<string>('Friend or Family');
  const [referralNote, setReferralNote] = useState<string>('');

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
    const countryCities = CITIES_BY_COUNTRY[selectedCountryName] || DEFAULT_ASIAN_CITIES;
    if (countryCities.length > 0) {
      setCity(countryCities[0]);
      setCustomCity('');
    }
  };

  const isCustomCityActive = city === 'Other City' || city.toLowerCase().includes('other');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum < 12 || ageNum > 85) {
      newErrors.age = 'Enter a valid age (12 - 85 years)';
    }

    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    if (!cleanNumber) {
      newErrors.whatsappNumber = 'Please enter contact number';
    } else if (cleanNumber.length < 7 || cleanNumber.length > 15) {
      newErrors.whatsappNumber = 'Enter a valid contact number (7-15 digits)';
    }

    if (!country.trim()) {
      newErrors.country = 'Please select your country';
    }

    if (isCustomCityActive && !customCity.trim()) {
      newErrors.city = 'Please type your city or town name';
    }

    if (highestEducation === 'Other' && !customEducation.trim()) {
      newErrors.highestEducation = 'Please specify your education';
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

    const fullContactNumber = `${countryCode} ${whatsappNumber.trim()}`;
    const finalCity = isCustomCityActive ? customCity.trim() : city;
    const finalEducation = highestEducation === 'Other' ? (customEducation.trim() || 'Other') : highestEducation;
    const registrationId = `DE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const registrationPayload: StudentRegistration = {
      id: registrationId,
      fullName: fullName.trim(),
      age: parseInt(age, 10) || 20,
      gender,
      whatsappNumber: fullContactNumber,
      country,
      city: finalCity,
      highestEducation: finalEducation,
      currentLevel,
      targetLevel,
      classTimeSlot,
      learningReason,
      referralSource: referralNote.trim() ? `${referralSource} (${referralNote.trim()})` : referralSource,
      createdAt: new Date().toISOString(),
      paymentStatus: 'pending'
    };

    try {
      // POST to secure /api/telegram backend endpoint (tokens are kept strictly server-side)
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationPayload)
      });

      if (!response.ok) {
        // Fallback to /api/notify if /api/telegram is unavailable
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationPayload)
        });
      }

      // Also persist to localStorage backup
      try {
        const stored = localStorage.getItem('german_registrations');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(registrationPayload);
        localStorage.setItem('german_registrations', JSON.stringify(list));
      } catch (storageErr) {
        console.warn('LocalStorage save warning:', storageErr);
      }

      setSubmittedData(registrationPayload);
    } catch (err: any) {
      console.warn('Submission network notice:', err?.message);
      // Fallback local save so user registration is NEVER lost
      try {
        const stored = localStorage.getItem('german_registrations');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(registrationPayload);
        localStorage.setItem('german_registrations', JSON.stringify(list));
        setSubmittedData(registrationPayload);
      } catch (localErr) {
        setSubmitError('Unable to submit registration. Please check your internet connection and try again.');
      }
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
    <section id="registration" className="py-16 sm:py-24 bg-stone-100/70 border-b border-stone-200 text-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header and Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast & Free Online Registration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
            Student Registration Form
          </h2>

          <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
            Please fill in your correct information. After submitting the form, our team will review your registration and contact you.
          </p>
        </div>

        {/* Success Confirmation Card or Clean White Form */}
        {submittedData ? (
          <div className="bg-white border border-emerald-300 rounded-3xl p-6 sm:p-10 shadow-md animate-in fade-in zoom-in-95">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Application Successfully Logged
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-stone-950 mt-3">
                Willkommen! You are registered.
              </h3>
              <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
                Your application has been logged into the admissions system. Please save your Registration ID.
              </p>
            </div>

            {/* Registration ID Banner */}
            <div className="mt-8 p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <span className="text-xs text-stone-500 uppercase font-mono font-bold tracking-wider">Your Student Registration ID</span>
                <div className="text-3xl font-black text-stone-950 tracking-wide font-mono mt-1">
                  {submittedData.id}
                </div>
              </div>
              <button
                onClick={() => handleCopyId(submittedData.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-stone-950 hover:bg-stone-900 text-white transition-colors cursor-pointer shadow-sm"
              >
                {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId ? 'Copied to Clipboard' : 'Copy Reg ID'}</span>
              </button>
            </div>

            {/* Summary Details */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <div>
                <span className="text-stone-500 font-mono">Student Name:</span>
                <p className="font-bold text-stone-950 text-sm mt-0.5">{submittedData.fullName}</p>
              </div>
              <div>
                <span className="text-stone-500 font-mono">Mobile / Contact Number:</span>
                <p className="font-bold text-stone-950 text-sm mt-0.5">{submittedData.whatsappNumber}</p>
              </div>
              <div>
                <span className="text-stone-500 font-mono">Target Level:</span>
                <p className="font-bold text-stone-950 text-sm mt-0.5">German Level {submittedData.targetLevel}</p>
              </div>
              <div>
                <span className="text-stone-500 font-mono">Location:</span>
                <p className="font-bold text-stone-950 text-sm mt-0.5">{submittedData.city}, {submittedData.country}</p>
              </div>
              <div className="sm:col-span-2 pt-3 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-stone-500 font-mono">Highest Education:</span>
                  <p className="font-bold text-stone-950 text-sm flex items-center gap-1.5 mt-0.5">
                    <GraduationCap className="w-4 h-4 text-stone-700" />
                    <span>{submittedData.highestEducation || 'Not Specified'}</span>
                  </p>
                </div>
              </div>
              <div className="sm:col-span-2 pt-3 border-t border-stone-200">
                <span className="text-stone-500 font-mono">Zoom Class Slot:</span>
                <p className="font-bold text-stone-950 text-sm mt-0.5">{submittedData.classTimeSlot}</p>
              </div>
              <div className="sm:col-span-2 pt-3 border-t border-stone-200">
                <span className="text-stone-500 font-mono">Learning Purpose:</span>
                <p className="font-semibold text-stone-900 mt-0.5">{submittedData.learningReason}</p>
              </div>
              {submittedData.referralSource && (
                <div className="sm:col-span-2 pt-3 border-t border-stone-200">
                  <span className="text-stone-500 font-mono">Heard About Us From:</span>
                  <p className="font-semibold text-stone-900 mt-0.5">{submittedData.referralSource}</p>
                </div>
              )}
            </div>

            {/* Next Step Info */}
            <div className="mt-8 space-y-4">
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <div className="text-sm sm:text-base font-bold text-emerald-950">
                  Application Under Review by Admissions Team
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  Aapki registration successfully submit ho chuki hai. Hamari admissions team aapke WhatsApp / contact number par <strong>5,000 PKR registration fee confirmation</strong> aur official Zoom batch group joining details ke sath rabta karegi.
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setSubmittedData(null)}
                  className="px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition-colors cursor-pointer border border-stone-300"
                >
                  Submit Another Registration / Register Another Student
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* PURE WHITE FORM CONTAINER WITH BLACK TEXT AND DATA */
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-lg text-stone-950"
          >
            <div className="space-y-6">

              {/* Row 1: Full Name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
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
                      } text-stone-950 font-medium placeholder:text-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all`}
                    />
                    <User className="w-4 h-4 text-stone-400 absolute right-4 top-4 pointer-events-none" />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
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
                      } text-stone-950 font-medium placeholder:text-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all`}
                    />
                    <Calendar className="w-4 h-4 text-stone-400 absolute right-4 top-4 pointer-events-none" />
                  </div>
                  {errors.age && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.age}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Gender Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-2 font-mono">
                  Gender <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Male', 'Female', 'Prefer not to say'] as Gender[]).map((g) => (
                    <label
                      key={g}
                      className={`flex items-center justify-center p-3 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${
                        gender === g
                          ? 'bg-stone-950 text-white font-bold border-stone-950 shadow-sm'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-100'
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

              {/* Row 3: Mobile / Contact Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
                  Mobile / Contact Number (Rabta Number) <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="w-36 sm:w-48 shrink-0">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full px-2.5 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-950 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 truncate"
                      title="Select Country Calling Code"
                    >
                      {ASIAN_COUNTRIES.map((c) => (
                        <option key={`cc-${c.name}-${c.code}`} value={c.code} className="bg-white text-stone-950">
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
                      } text-stone-950 font-medium placeholder:text-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all`}
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute right-4 top-4 pointer-events-none" />
                  </div>
                </div>
                <p className="mt-1.5 text-[11px] text-stone-500">
                  Asia ke kisi bhi mulk ka active number enter karein taake selection par confirmation mil sake.
                </p>
                {errors.whatsappNumber && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>

              {/* Row 4: Country & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
                    Country (Mulk) <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-950 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 appearance-none pr-10"
                    >
                      <optgroup label="Main" className="bg-white text-stone-950">
                        <option value="Pakistan">🇵🇰 Pakistan</option>
                      </optgroup>
                      <optgroup label="Middle East / Gulf (Khaleej)" className="bg-white text-stone-950">
                        {ASIAN_COUNTRIES.filter((c) => c.region === 'Middle East').map((c) => (
                          <option key={`country-${c.name}`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="South Asia" className="bg-white text-stone-950">
                        {ASIAN_COUNTRIES.filter((c) => c.region === 'South Asia' && c.name !== 'Pakistan').map((c) => (
                          <option key={`country-${c.name}`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Southeast Asia" className="bg-white text-stone-950">
                        {ASIAN_COUNTRIES.filter((c) => c.region === 'Southeast Asia').map((c) => (
                          <option key={`country-${c.name}`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="East Asia" className="bg-white text-stone-950">
                        {ASIAN_COUNTRIES.filter((c) => c.region === 'East Asia').map((c) => (
                          <option key={`country-${c.name}`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Central Asia" className="bg-white text-stone-950">
                        {ASIAN_COUNTRIES.filter((c) => c.region === 'Central Asia').map((c) => (
                          <option key={`country-${c.name}`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Other / Worldwide" className="bg-white text-stone-950">
                        <option value="Other Country (Worldwide)">🌐 Other Country (Worldwide)</option>
                      </optgroup>
                    </select>
                    <Globe className="w-4 h-4 text-stone-400 absolute right-4 top-4 pointer-events-none" />
                  </div>
                  {errors.country && (
                    <p className="mt-1 text-xs text-red-600 font-mono">{errors.country}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
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
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-950 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 appearance-none pr-10"
                    >
                      {(CITIES_BY_COUNTRY[country] || DEFAULT_ASIAN_CITIES).map((c) => (
                        <option key={c} value={c} className="bg-white text-stone-950">
                          {c}
                        </option>
                      ))}
                      {!(CITIES_BY_COUNTRY[country] || DEFAULT_ASIAN_CITIES).some((c) => c.toLowerCase().includes('other')) && (
                        <option value="Other City" className="bg-white text-stone-950">Other City / Town</option>
                      )}
                    </select>
                    <MapPin className="w-4 h-4 text-stone-400 absolute right-4 top-4 pointer-events-none" />
                  </div>

                  {/* Dynamic City Input */}
                  {(isCustomCityActive || city.toLowerCase().includes('other')) && (
                    <div className="mt-2.5">
                      <input
                        type="text"
                        placeholder="Apna shehar, tehsil ya gaon yahan likhein (Type any city)..."
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-950 text-sm placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900"
                      />
                      <p className="mt-1 text-[11px] text-stone-500 font-mono">
                        ✍️ Aap kisi bhi shehar ya ilaqay ka naam type kar sakte hain.
                      </p>
                    </div>
                  )}
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-600 font-mono">{errors.city}</p>
                  )}
                </div>
              </div>

              {/* Row: Highest Education */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
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
                          ? 'bg-stone-950 text-white font-bold border-stone-950 shadow-sm'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-100'
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
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-950 placeholder:text-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900"
                    />
                  </div>
                )}
              </div>

              {/* Row 5: Current German Language Level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
                  Current German Language Level <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {(['No German / Beginner', 'A1', 'A2', 'B1', 'B2'] as CurrentLevel[]).map((lvl) => (
                    <label
                      key={lvl}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer text-center transition-all ${
                        currentLevel === lvl
                          ? 'bg-stone-950 text-white font-bold border-stone-950 shadow-sm'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-100'
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
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
                  Which German level do you want to learn? <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['A1', 'A2', 'B1', 'B2'] as GermanLevel[]).map((lvl) => (
                    <label
                      key={lvl}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        targetLevel === lvl
                          ? 'bg-stone-50 border-stone-950 text-stone-950 font-black shadow-sm ring-1 ring-stone-950'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
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
                      <span className="text-lg font-black text-stone-950">Level {lvl}</span>
                      <span className="text-[11px] text-stone-500 font-medium mt-0.5 font-mono">
                        {lvl === 'A1' ? '2 Months • Beginner' : lvl === 'A2' ? '2 Months • Elementary' : lvl === 'B1' ? '3 Months • Inter.' : '3 Months • Upper'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row: Classes on Zoom App — Two Timings (Light Blue Box with White Cards & Black Text) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#f0f7ff]/80 border border-sky-200 shadow-2xs">
                <div className="flex items-start sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-black text-sky-950 uppercase tracking-wide">
                          Classes Will Be Held on Zoom App (Live Online)
                        </h4>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">
                          Zoom App
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-sky-800 mt-0.5">
                        There are 2 class timings — please select 1 according to your convenience: <span className="text-red-600 font-bold">*</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {/* Option 1: Morning 10:00 AM to 11:00 AM */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      classTimeSlot === 'Morning Batch (10:00 AM – 11:00 AM)'
                        ? 'bg-white border-amber-500 text-stone-950 shadow-sm ring-1 ring-amber-500/20'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
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
                      <Sun className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">Morning Batch</span>
                        {classTimeSlot === 'Morning Batch (10:00 AM – 11:00 AM)' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                        )}
                      </div>
                      <div className="text-base font-black text-stone-950 mt-0.5 font-mono">
                        10:00 AM to 11:00 AM
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">Daily 1 Hour • Live on Zoom</span>
                    </div>
                  </label>

                  {/* Option 2: Night 9:00 PM to 10:00 PM */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      classTimeSlot === 'Night Batch (9:00 PM – 10:00 PM)'
                        ? 'bg-white border-blue-600 text-stone-950 shadow-sm ring-1 ring-blue-600/20'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
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
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Moon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">Night Batch</span>
                        {classTimeSlot === 'Night Batch (9:00 PM – 10:00 PM)' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                        )}
                      </div>
                      <div className="text-base font-black text-stone-950 mt-0.5 font-mono">
                        09:00 PM to 10:00 PM
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">Daily 1 Hour • Live on Zoom</span>
                    </div>
                  </label>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-sky-800 font-medium bg-sky-100/60 p-2.5 rounded-xl border border-sky-200">
                  <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>
                    <strong>Note:</strong> Zoom meeting link & class joining password will be shared in your WhatsApp batch group.
                  </span>
                </div>
              </div>

              {/* Row 7: Why do you want to learn German language? */}
              <div>
                <label className="block text-sm font-bold text-stone-900 mb-1.5 font-mono">
                  Why do you want to learn German language? <span className="text-red-600">*</span>
                </label>
                <p className="text-xs text-stone-500 mb-2">
                  Please select your primary reason for learning German so we can guide your visa or academic roadmap:
                </p>
                <div className="relative">
                  <select
                    value={learningReason}
                    onChange={(e) => setLearningReason(e.target.value as LearningReason)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-950 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900"
                  >
                    {LEARNING_REASONS.map((reason) => (
                      <option key={reason} value={reason} className="bg-white text-stone-950">
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 8: How did you hear about us? (Friend, Google, YouTube, Facebook, TikTok, Twitter/X, Batch Student) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-bold text-stone-900 font-mono">
                    How did you hear about us? <span className="text-red-600">*</span>
                  </label>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Community Referral
                  </span>
                </div>
                <p className="text-xs text-stone-500 mb-3.5">
                  Select how you discovered the Ahmed Rajput German Language Program:
                </p>

                {/* Interactive Grid of Referral Options */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {REFERRAL_OPTIONS.map((item) => {
                    const isSelected = referralSource === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setReferralSource(item.id)}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-amber-400/20 border-amber-500 text-stone-950 ring-2 ring-amber-500/30 shadow-xs'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1.5">
                          <span className="text-base select-none">{item.icon}</span>
                          {item.badge ? (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-300/80 text-stone-950 uppercase">
                              {item.badge}
                            </span>
                          ) : (
                            isSelected && <span className="w-2 h-2 rounded-full bg-amber-500" />
                          )}
                        </div>
                        <span className="text-xs font-bold leading-tight block">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Additional context input for friends, batch students, or other */}
                <div className="mt-3">
                  <input
                    type="text"
                    value={referralNote}
                    onChange={(e) => setReferralNote(e.target.value)}
                    placeholder={
                      referralSource === 'Ahmed Rajput Batch Student'
                        ? 'Batch student name or batch number (Optional)'
                        : referralSource === 'Friend or Family'
                        ? 'Friend or family member name (Optional)'
                        : referralSource === 'Other Source'
                        ? 'Please specify where you found us'
                        : 'Any details or notes (Optional)'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Note confirmation before button: 5K Registration Fee Policy */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-stone-900 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-amber-900" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm sm:text-base text-stone-950">
                        Registration Fee: PKR 5,000 (One-Time Seat Confirmation)
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                        Strict Policy
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-800 font-semibold leading-relaxed">
                      📢 <strong>Zaroori Hidayat:</strong> Course ki registration fee <strong>5,000 PKR</strong> hai jo har student ke liye lazmi hai aur yeh <strong>kisi bhi student ko maaf (waive-off) nahi ki jayegi</strong>.
                    </p>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-0.5">
                      🎯 <strong>Is Fee Ka Maqsad:</strong> Ahmad Rajput aur unki team ki taraf se live Zoom classes aur certified teachers ka access bilkul muft hai (jiski market value Rs. 35,000 se 60,000+ hoti hai). Is 5,000 PKR registration fee ka wahid maqsad sirf aur sirf yeh check karna hai ke aap waqayi <strong>serious, dedicated aur committed</strong> hain, taake batch me mehnati students ko jagah mil sake aur kisi ghair-sanjeeda shakhs ki wajah se deserving student ki seat zaya na ho.
                    </p>

                    {/* Step-by-Step Payment Timing Notice */}
                    <div className="mt-3 pt-3 border-t border-amber-200/90 bg-white/80 p-3.5 rounded-xl border border-amber-200">
                      <p className="text-xs sm:text-sm text-stone-950 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span>Abhi Sirf Form Submit Karein (Fee Abhi Pay Nahi Karni):</span>
                      </p>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-1">
                        Abhi aapko koi fee ada nahi karni. Sirf neeche button par click karke apni <strong>Student Registration submit karein</strong>. Yeh fee sirf unhi students ne pay karni hogi <strong>jin ki application accept hogi aur jinhein hamari admissions team khud WhatsApp par message karegi</strong>. Jab aap select ho jayenge to team direct aapse rabta karke next process guide karegi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submission Error Banner */}
              {submitError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
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
                className="w-full py-4 sm:py-5 px-6 rounded-2xl font-black text-base sm:text-lg bg-red-600 hover:bg-red-700 text-white shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2.5">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Enrollment...</span>
                  </span>
                ) : (
                  <>
                    <span>SUBMIT STUDENT REGISTRATION</span>
                    <ArrowRight className="w-5 h-5 text-amber-200" />
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
