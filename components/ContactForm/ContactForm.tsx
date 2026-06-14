'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import type { SendingState } from 'app/types';
import { Heading } from 'components/Heading';
import { TransitionLink } from 'components/TransitionLink';
import { useTranslations } from 'next-intl';
import { useActionState, useState } from 'react';
import { submitContactFormAction } from './actions';
import { ContactSubmitButton } from './ContactSubmitButton';

export const ContactForm = () => {
  const t = useTranslations('contact');
  const [legalsAreAccepted, setLegalsAreAccepted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [sendingState, formAction, isPending] = useActionState<SendingState, FormData>(
    submitContactFormAction,
    'IDLE'
  );

  return (
    <div
      className="w-full max-w-lg flex flex-col items-center justify-center cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <Heading variant="contactTitle">
        {t('title')}
      </Heading>
      <form
        className="w-full max-w-md space-y-4 flex-col items-center justify-center"
        action={formAction}
      >
        <input
          type="text"
          placeholder={t('placeholders.name')}
          className="w-full p-2 text-white bg-transparent border-b-2 border-white/30 focus:outline-none focus:border-white/80 transition-colors ease-in-out duration-300 autofill:!bg-transparent"
          required
          name="name"
        />
        <input
          type="email"
          placeholder={t('placeholders.email')}
          className="w-full p-2 text-white bg-transparent border-b-2 border-white/30 focus:outline-none focus:border-white/80 transition-colors ease-in-out duration-300"
          required
          name="email"
        />
        <input
          type="text"
          placeholder={t('placeholders.subject')}
          className="w-full p-2 text-white bg-transparent border-b-2 border-white/30 focus:outline-none focus:border-white/80 transition-colors ease-in-out duration-300"
          name="subject"
        />
        <textarea
          placeholder={t('placeholders.message')}
          rows={4}
          className="w-full border border-none focus:outline-none p-2 text-white bg-gray-800/50 focus:bg-white/20 transition-colors ease-in-out duration-300"
          required
          name="message"
        />
        <input type="hidden" name="captchaToken" value={captchaToken || ''} />
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
            name="legalsAccepted"
            value="true"
            className="mt-5 mr-5 w-5 h-5"
            onChange={(e) => setLegalsAreAccepted(e.target.checked)}
          />
          {t.rich('legalsCheckbox', {
            legalsInfo: (chunks) => (
              <TransitionLink href="/legal" className="text-blueSecondary cursor-pointer underline">
                {chunks}
              </TransitionLink>
            ),
          })}
        </label>
        <ContactSubmitButton
          captchaToken={captchaToken}
          isPending={isPending}
          legalsAreAccepted={legalsAreAccepted}
          sendingState={sendingState}
          t={t}
        />
      </form>
    </div>
  );
};
