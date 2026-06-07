'use client';

import type { MouseEvent } from 'react';
import { useEffect, useRef } from 'react';
import { fadeInUp, prefersReducedMotion } from 'utils/animations';
import {
  addCaseCardScaleTicker,
  createCaseCardStates,
  resetCaseCardScales,
  updateCaseCardProximity,
} from './animations';

type UseTimelineCardsOptions = {
  isDisabled: boolean;
};

export const useTimelineCards = ({ isDisabled }: UseTimelineCardsOptions) => {
  const listRef = useRef<HTMLOListElement>(null);
  const cardStatesRef = useRef(createCaseCardStates([]));

  useEffect(() => {
    if (isDisabled || !listRef.current) return;

    const items = listRef.current.querySelectorAll('.case-timeline-item');
    const animation = fadeInUp(items, {
      delay: 0.15,
      duration: 0.7,
      y: 18,
    });

    return () => {
      animation?.kill();
    };
  }, [isDisabled]);

  useEffect(() => {
    if (isDisabled || !listRef.current) return;

    const cards = Array.from(
      listRef.current.querySelectorAll<HTMLElement>('.case-timeline-card-scale')
    );

    if (!cards.length || prefersReducedMotion()) return;

    cardStatesRef.current = createCaseCardStates(cards);
    const resetScales = () => resetCaseCardScales(cardStatesRef.current);
    const removeTicker = addCaseCardScaleTicker(cardStatesRef.current);

    document.addEventListener('mouseleave', resetScales);
    window.addEventListener('blur', resetScales);

    return () => {
      removeTicker();
      document.removeEventListener('mouseleave', resetScales);
      window.removeEventListener('blur', resetScales);
      resetScales();
      cardStatesRef.current = createCaseCardStates([]);
    };
  }, [isDisabled]);

  const updateCardProximity = (event: MouseEvent<HTMLElement>) => {
    if (isDisabled) return;

    updateCaseCardProximity(cardStatesRef.current, event);
  };

  const resetCardProximity = () => {
    resetCaseCardScales(cardStatesRef.current);
  };

  return {
    listRef,
    resetCardProximity,
    updateCardProximity,
  };
};
