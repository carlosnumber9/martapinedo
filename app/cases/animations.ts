'use client';

import gsap from 'gsap';
import { MouseEvent } from 'react';

export type CaseCardState = {
  element: HTMLElement;
  scale: number;
  targetScale: number;
};

const PROXIMITY_RADIUS = 250;
const MAX_SCALE_OFFSET = 0.18;
const SCALE_LERP = 0.12;

export const createCaseCardStates = (cards: HTMLElement[]): CaseCardState[] =>
  cards.map((element) => ({ element, scale: 1, targetScale: 1 }));

export const resetCaseCardScales = (cardStates: CaseCardState[]) => {
  cardStates.forEach((cardState) => {
    cardState.targetScale = 1;
    cardState.element.style.zIndex = '0';
  });
};

export const updateCaseCardProximity = (
  cardStates: CaseCardState[],
  event: MouseEvent<HTMLElement>
) => {
  let closestCard: HTMLElement | null = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  cardStates.forEach((cardState) => {
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

  cardStates.forEach((cardState) => {
    cardState.element.style.zIndex = cardState.element === closestCard ? '20' : '0';
  });
};

export const addCaseCardScaleTicker = (cardStates: CaseCardState[]) => {
  const tick = () => {
    cardStates.forEach((cardState) => {
      cardState.scale += (cardState.targetScale - cardState.scale) * SCALE_LERP;
      cardState.element.style.scale = cardState.scale.toFixed(4);
    });
  };

  gsap.ticker.add(tick);

  return () => gsap.ticker.remove(tick);
};
