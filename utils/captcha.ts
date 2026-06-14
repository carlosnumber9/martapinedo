import 'server-only';

const TURNSTILE_SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type TurnstileVerificationResponse = {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
};

const getTurnstileSecretKey = () => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('Turnstile secret key is missing');
  }

  return secretKey;
};

export const verifyTurnstileToken = async (token: string) => {
  const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: getTurnstileSecretKey(),
      response: token,
    }),
  });

  if (!response.ok) {
    throw new Error(`Turnstile verification failed with status ${response.status}`);
  }

  const verification = (await response.json()) as TurnstileVerificationResponse;

  if (!verification.success) {
    throw new Error(
      `Turnstile verification rejected token: ${verification['error-codes']?.join(', ') || 'unknown error'}`
    );
  }

  return verification;
};
