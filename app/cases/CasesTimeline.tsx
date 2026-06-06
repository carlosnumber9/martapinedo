'use client';

import { useGSAP } from '@gsap/react';
import type { Case, SupportedLocale } from 'app/types';
import { Button, Heading } from 'components';
import gsap from 'gsap';
import { usePathname, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { CaseDetailArea } from './CaseDetailArea';
import { CaseDetailContent } from './CaseDetailContent';
import { CaseItem } from './CaseItem';
import { Timeline } from './TimelineLine';

gsap.registerPlugin(useGSAP);

interface Props {
  backLabel: string;
  cases: Case[];
  cta: string;
  locale: SupportedLocale;
  title: string;
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => void;
};

const PROXIMITY_RADIUS = 250;
const MAX_SCALE_OFFSET = 0.18;
const SCALE_LERP = 0.12;

const getCaseIdFromPath = () => {
  const match = window.location.pathname.match(/^\/cases\/([^/]+)$/);

  return match?.[1];
};

const shouldUseDefaultNavigation = (event: MouseEvent<HTMLAnchorElement>) =>
  event.defaultPrevented ||
  event.button !== 0 ||
  event.metaKey ||
  event.altKey ||
  event.ctrlKey ||
  event.shiftKey;

export const CasesTimeline: React.FC<Props> = ({ backLabel, cases, cta, locale, title }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const cardStatesRef = useRef<Array<{ element: HTMLElement; scale: number; targetScale: number }>>([]);

  useGSAP(
    () => {
      if (selectedCase || !listRef.current) return;

      const items = listRef.current.querySelectorAll('.case-timeline-item');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.2,
          delay: 0.15,
        }
      );
    },
    { dependencies: [cases.length, selectedCase], scope: listRef }
  );

  useEffect(() => {
    const syncSelectedCaseWithPath = () => {
      const caseId = getCaseIdFromPath();
      setSelectedCase(cases.find((caseItem) => caseItem.id === caseId) ?? null);
    };

    window.addEventListener('popstate', syncSelectedCaseWithPath);

    return () => window.removeEventListener('popstate', syncSelectedCaseWithPath);
  }, [cases]);

  useEffect(() => {
    if (pathname === '/cases') {
      setSelectedCase(null);
      return;
    }

    const caseId = pathname.startsWith('/cases/') ? pathname.replace('/cases/', '') : null;

    if (caseId) {
      setSelectedCase(cases.find((caseItem) => caseItem.id === caseId) ?? null);
    }
  }, [cases, pathname]);

  useEffect(() => {
    if (selectedCase || !listRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(listRef.current.querySelectorAll<HTMLElement>('.case-timeline-card-scale'));

    if (!cards.length || prefersReducedMotion) return;

    cardStatesRef.current = cards.map((element) => ({ element, scale: 1, targetScale: 1 }));

    const resetScales = () => {
      cardStatesRef.current.forEach((cardState) => {
        cardState.targetScale = 1;
        cardState.element.style.zIndex = '0';
      });
    };

    const tick = () => {
      cardStatesRef.current.forEach((cardState) => {
        cardState.scale += (cardState.targetScale - cardState.scale) * SCALE_LERP;
        cardState.element.style.scale = cardState.scale.toFixed(4);
      });
    };

    gsap.ticker.add(tick);
    document.addEventListener('mouseleave', resetScales);
    window.addEventListener('blur', resetScales);

    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener('mouseleave', resetScales);
      window.removeEventListener('blur', resetScales);
      resetScales();
      cardStatesRef.current = [];
    };
  }, [selectedCase]);

  const updateCardProximity = (event: MouseEvent<HTMLElement>) => {
    if (selectedCase) return;

    let closestCard: HTMLElement | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardStatesRef.current.forEach((cardState) => {
      const rect = cardState.element.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const distance = Math.hypot(event.clientX - cardCenterX, event.clientY - cardCenterY);
      const proximity = Math.max(0, 1 - distance / PROXIMITY_RADIUS);

      cardState.targetScale = 1 + proximity * MAX_SCALE_OFFSET;

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = cardState.element;
      }
    });

    cardStatesRef.current.forEach((cardState) => {
      cardState.element.style.zIndex = cardState.element === closestCard ? '20' : '0';
    });
  };

  const resetCardProximity = () => {
    cardStatesRef.current.forEach((cardState) => {
      cardState.targetScale = 1;
      cardState.element.style.zIndex = '0';
    });
  };

  const openCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    router.push(`/cases/${caseItem.id}`, { scroll: false });
    window.scrollTo(0, 0);
  };

  const closeCase = () => {
    setSelectedCase(null);
    router.push('/cases', { scroll: false });
    window.scrollTo(0, 0);
  };

  const handleSelectCase = (event: MouseEvent<HTMLAnchorElement>, caseItem: Case) => {
    if (shouldUseDefaultNavigation(event)) return;

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const transitionDocument = document as ViewTransitionDocument;

    if (!transitionDocument.startViewTransition || prefersReducedMotion) {
      openCase(caseItem);
      return;
    }

    transitionDocument.startViewTransition(() => {
      flushSync(() => openCase(caseItem));
    });
  };

  if (selectedCase) {
    return (
      <CaseDetailArea onBack={closeCase}>
        <CaseDetailContent
          backLabel={backLabel}
          caseItem={selectedCase}
          cleanDescription={selectedCase.description.html}
          locale={locale}
          onBack={closeCase}
        />
      </CaseDetailArea>
    );
  }

  return (
    <section
      className="relative min-h-screen w-full overflow-x-hidden bg-darkPrimary pt-20"
      onMouseLeave={resetCardProximity}
      onMouseMove={updateCardProximity}
    >
      <Timeline />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-36 pt-24 text-center sm:pb-44">
        <Heading variant="caseTimelineTitle">
          {title}
        </Heading>
      </div>
      <ol ref={listRef} className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-28 px-6 pb-28">
        {cases.map((caseItem, index) => (
          <CaseItem
            key={caseItem.id}
            caseItem={caseItem}
            index={index}
            locale={locale}
            onSelect={handleSelectCase}
          />
        ))}
      </ol>
      <div className="relative z-10 flex w-full justify-center px-6 pb-28">
        <Button href="/contact" variant="secondary" size="lg" className="font-subtitle">
          {cta}
        </Button>
      </div>
    </section>
  );
};
