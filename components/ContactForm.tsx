'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import classNames from 'classnames';
import { Loader } from 'components';
import { useEmail } from 'hooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const getSubmitButtonContent = (state: string, t: (key: string) => string) => {
  switch (state) {
    case 'IDLE':
      return t('button.idle');
    case 'SENDING':
      return <Loader />;
    case 'SENT':
      return t('button.sent');
    case 'ERROR':
      return t('button.error');
    default:
      return t('button.idle');
  }
};

export const ContactForm = () => {
  const t = useTranslations('contact');
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  });
  const [legalsAreAccepted, setLegalsAreAccepted] = useState(false);
  const { sendingState, sendEmail } = useEmail();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendEmail(formValues, captchaToken);
  };

  return (
    <div
      className="w-full max-w-md flex flex-col items-center justify-center px-6 py-5 cursor-default mt-20"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-semibold mb-4">{t('title')}</h2>
      <form
        className="w-full space-y-4 flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={t('placeholders.name')}
          className="w-full p-2 text-white bg-transparent border-b-2 border-white/30 focus:outline-none focus:border-white/80 transition-colors ease-in-out duration-300 autofill:!bg-transparent"
          required
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          value={formValues.name}
          name="name"
        />
        <input
          type="email"
          placeholder={t('placeholders.email')}
          className="w-full p-2 text-white bg-transparent border-b-2 border-white/30 focus:outline-none focus:border-white/80 transition-colors ease-in-out duration-300"
          required
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
          value={formValues.email}
          name="email"
        />
        <input
          type="text"
          placeholder={t('placeholders.subject')}
          className="w-full p-2 text-white bg-transparent border-b-2 border-white/30 focus:outline-none focus:border-white/80 transition-colors ease-in-out duration-300"
          onChange={(e) => setFormValues({ ...formValues, subject: e.target.value })}
          value={formValues.subject}
          name="subject"
        />
        <textarea
          placeholder={t('placeholders.message')}
          rows={4}
          className="w-full border border-none focus:outline-none p-2 text-white bg-gray-800/50 focus:bg-white/20 transition-colors ease-in-out duration-300"
          required
          onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
          value={formValues.message}
          name="message"
        />
        <div className="overflow-hidden w-full h-[65px] flex items-center justify-center">
          <div className="w-[300px] h-[65px] flex items-center justify-center animate-pulse-bg">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
              onSuccess={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
            />
          </div>
        </div>
        <label>
          <input
            type="checkbox"
            required
            className="mt-5 mr-5 w-5 h-5"
            onChange={(e) => setLegalsAreAccepted(e.target.checked)}
          />
          {t.rich('legalsCheckbox', {
            legalsInfo: (chunks) => (
              <a href="/legal" className="text-blueSecondary cursor-pointer underline">
                {chunks}
              </a>
            ),
          })}
        </label>
        <button
          type="submit"
          disabled={
            !captchaToken ||
            sendingState === 'SENDING' ||
            sendingState === 'SENT' ||
            !legalsAreAccepted
          }
          className={classNames(
            'bg-darkPrimary hover:bg-darkSecondary text-white font-semibold py-2 px-4 w-full transition',
            sendingState === 'SENT' && 'bg-green-500 hover:bg-green-600',
            sendingState === 'ERROR' && 'bg-red-500 hover:bg-red-600',
            sendingState === 'SENDING' && 'bg-bluePrimary/50 cursor-not-allowed'
          )}
        >
          {getSubmitButtonContent(sendingState, t)}
        </button>
      </form>
    </div>
  );
};
