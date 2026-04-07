'use client';
import { type ChangeEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useGetContactInfoQuery, useSubmitBookingMutation } from '@/app/features/api/homestayApi';

import SectionError from './ui/SectionError';

import type { BookingRequest } from '@/app/features/api/mockData';

const emptyForm: BookingRequest = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  roomType: '',
  message: '',
};

export default function Contact() {
  const { t } = useTranslation();
  const {
    data: info,
    isLoading: infoLoading,
    isError: infoError,
    refetch,
  } = useGetContactInfoQuery();
  const [
    submitBooking,
    { isLoading: submitting, isSuccess, isError: submitError, error: rawError, reset },
  ] = useSubmitBookingMutation();

  const [form, setForm] = useState<BookingRequest>(emptyForm);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    const result = await submitBooking(form);
    if ('data' in result) {
      setForm(emptyForm);
    }
  };

  const submitErrorMsg = rawError
    ? 'error' in rawError
      ? (rawError.error as string)
      : 'data' in rawError
        ? ((rawError.data as { message?: string })?.message ?? t('contact.submit_error'))
        : t('contact.submit_error')
    : t('contact.submit_error');

  const inputClass =
    'border border-stone-200 dark:border-stone-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition w-full bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500';

  return (
    <section id="contact" className="py-20 px-6 bg-amber-50 dark:bg-stone-800">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* ── Contact info side ─────────────────────────────────────────── */}
        <div>
          <span className="text-amber-600 dark:text-amber-400 text-sm font-semibold tracking-widest uppercase">
            {t('contact.eyebrow')}
          </span>
          <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mt-2 mb-4">{t('contact.heading')}</h2>
          <p className="text-stone-500 dark:text-stone-400 leading-relaxed mb-8">
            {t('contact.body')}
          </p>

          {infoLoading && (
            <div className="flex flex-col gap-4 animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-stone-200 rounded-full" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-3 bg-stone-200 rounded-xl w-1/3" />
                    <div className="h-4 bg-stone-200 rounded-xl w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {infoError && <SectionError message={t('contact.error_info')} onRetry={refetch} />}

          {info && (
            <div className="flex flex-col gap-4 text-stone-700 dark:text-stone-300">
              {[
                { icon: '📞', label: t('contact.phone_label'), value: info.phone },
                { icon: '✉️', label: t('contact.email_label'), value: info.email },
                { icon: '📍', label: t('contact.location_label'), value: info.address },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Booking form side ─────────────────────────────────────────── */}

        {/* Success confirmation */}
        {isSuccess && (
          <div className="bg-white dark:bg-stone-700 rounded-2xl p-8 shadow-sm flex flex-col items-center gap-4 text-center">
            <span className="text-5xl">🎉</span>
            <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">{t('contact.success_heading')}</h3>
            <p className="text-stone-500 dark:text-stone-300 text-sm leading-relaxed">
              {t('contact.success_body')}
            </p>
            <button
              onClick={reset}
              className="mt-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              {t('contact.send_another')}
            </button>
          </div>
        )}

        {!isSuccess && (
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-stone-700 rounded-2xl p-8 shadow-sm flex flex-col gap-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-200">
                  {t('contact.first_name')} <span className="text-amber-600">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Anand"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-200">
                  {t('contact.last_name')} <span className="text-amber-600">*</span>
                </label>
                <input
                  name="lastName"
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Gautam"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-200">
                  {t('contact.email')} <span className="text-amber-600">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-200">{t('contact.phone')}</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-200">
                  {t('contact.check_in')} <span className="text-amber-600">*</span>
                </label>
                <input
                  name="checkIn"
                  type="date"
                  required
                  value={form.checkIn}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-200">
                  {t('contact.check_out')} <span className="text-amber-600">*</span>
                </label>
                <input
                  name="checkOut"
                  type="date"
                  required
                  value={form.checkOut}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-200">
                {t('contact.room_type')} <span className="text-amber-600">*</span>
              </label>
              <select
                name="roomType"
                required
                value={form.roomType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">{t('contact.select_room')}</option>
                <option value="Standard Room">{t('contact.room_standard')}</option>
                <option value="Deluxe Room">{t('contact.room_deluxe')}</option>
                <option value="Family Suite">{t('contact.room_family')}</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-200">{t('contact.message')}</label>
              <textarea
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder={t('contact.message_placeholder')}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submission error */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {submitErrorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold py-4 rounded-xl transition-colors text-base"
            >
              {submitting ? t('contact.submitting') : t('contact.submit')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
