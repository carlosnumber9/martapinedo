import { IndexHeading } from 'app/types';
import sanitize from 'sanitize-html';

export const getHeadingID = (text: string): string => {
  return text
    .replace(/<br\s*\/?>/gi, ' ')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const addIDsToHeadings = (html: string): string => {
  return html.replace(/<(h[1-6])>(.*?)<\/\1>/g, (match, tag, content) => {
    const id = getHeadingID(content);
    return `<${tag} id="${id}">${content}</${tag}>`;
  });
};

export const getCleanPostBody = (html: string): string =>
  sanitize(addIDsToHeadings(html), {
    allowedTags: sanitize.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    allowedAttributes: {
      ...sanitize.defaults.allowedAttributes,
      '*': ['class', 'id'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      a: ['href', 'target', 'rel'],
    },
    allowedClasses: {
      '*': ['*'],
    },
  });

export const extractHeadings = (
  postRef: React.RefObject<HTMLDivElement | null>
): IndexHeading[] => {
  if (!postRef || !postRef.current) {
    return [];
  }

  const allHeadings: NodeListOf<HTMLHeadingElement> = postRef?.current?.querySelectorAll('h2, h3');

  if (!allHeadings || allHeadings.length === 0) {
    return [];
  }

  return Array.from(allHeadings).map((heading) => {
    return {
      title: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
      id: getHeadingID(heading.textContent || ''),
    };
  });
};
