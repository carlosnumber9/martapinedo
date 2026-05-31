import { IndexHeading } from 'app/types';
import sanitize from 'sanitize-html';

const getPlainText = (html: string): string =>
  sanitize(html.replace(/<br\s*\/?>/gi, ' '), {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, ' ')
    .trim();

export const getHeadingID = (text: string): string => {
  return getPlainText(text)
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
  return html.replace(/<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attributes, content) => {
    const id = getHeadingID(content);
    const attributesWithoutID = attributes.replace(/\s+id=(["']).*?\1/i, '');

    return `<${tag}${attributesWithoutID} id="${id}">${content}</${tag}>`;
  });
};

export const getCleanPostBody = (html: string): string =>
  sanitize(addIDsToHeadings(html), {
    allowedTags: sanitize.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    allowedAttributes: {
      ...sanitize.defaults.allowedAttributes,
      '*': ['class', 'id'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
      a: ['href', 'target', 'rel'],
    },
    allowedClasses: {
      '*': ['*'],
    },
    transformTags: {
      img: sanitize.simpleTransform(
        'img',
        {
          loading: 'lazy',
          decoding: 'async',
        },
        true
      ),
    },
  });

export const extractHeadingsFromHTML = (html: string): IndexHeading[] =>
  Array.from(html.matchAll(/<h([23])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/gi)).map(
    ([, level, content]) => {
      const title = getPlainText(content);

      return {
        title,
        level: Number(level),
        id: getHeadingID(title),
      };
    }
  );
