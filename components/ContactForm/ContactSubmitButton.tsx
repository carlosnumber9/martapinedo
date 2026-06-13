import classNames from 'classnames';
import type { SendingState } from 'app/types';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';

type ContactSubmitButtonProps = {
  captchaToken: string | null;
  isPending: boolean;
  legalsAreAccepted: boolean;
  sendingState: SendingState;
  t: (key: string) => string;
};

const getSubmitButtonContent = (state: SendingState, t: (key: string) => string) => {
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

export const ContactSubmitButton = ({
  captchaToken,
  isPending,
  legalsAreAccepted,
  sendingState,
  t,
}: ContactSubmitButtonProps) => {
  const submitButtonState = isPending ? 'SENDING' : sendingState;

  return (
    <Button
      type="submit"
      disabled={!captchaToken || isPending || sendingState === 'SENT' || !legalsAreAccepted}
      variant="surface"
      fullWidth
      className={classNames(
        submitButtonState === 'SENT' && 'bg-green-500 hover:bg-green-600',
        submitButtonState === 'ERROR' && 'bg-red-500 hover:bg-red-600',
        submitButtonState === 'SENDING' && 'bg-bluePrimary/50 cursor-not-allowed'
      )}
    >
      {getSubmitButtonContent(submitButtonState, t)}
    </Button>
  );
};
