'use client';

import type { Case } from 'app/types';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const getCaseIdFromPath = () => {
  const match = window.location.pathname.match(/^\/cases\/([^/]+)$/);

  return match?.[1];
};

export const useCaseSelectionRoute = (cases: Case[]) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

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

  return {
    closeCase,
    openCase,
    selectedCase,
  };
};
