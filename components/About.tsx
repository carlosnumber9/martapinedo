import { useTranslations } from "next-intl";
import { forwardRef } from "react";

export const About = forwardRef<HTMLDivElement>((_, ref) => {
  const t = useTranslations('about');
  return (
    <div className="flex flex-col w-screen lg:w-1/2 xl:w-1/3 relative p-5 sm:p-15 lg:bg-gradient-to-r lg:from-transparent lg:to-darkSecondary justify-center" ref={ref}>
      <h2 className="text-3xl mt-5 ml-5 self-start font-subtitle">{t('title')}</h2>
      <hr className="ml-5 mr-5 self-stretch border-white/20" />
      <p className="w-11/12 sm:w-3/4 ml-5 sm:mx-0 sm:self-end mt-5 font-body text-xl">
        {t('description')}
      </p>
    </div>
  )
});
