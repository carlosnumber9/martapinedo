import sanitize from "sanitize-html";

export const getCleanPostBody = (html: string): string => sanitize(html, {
    allowedTags: sanitize.defaults.allowedTags.concat([
        'img',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
    ]),
    allowedAttributes: {
        ...sanitize.defaults.allowedAttributes,
        '*': ['class', 'id'],
        'img': ['src', 'alt', 'title', 'width', 'height'],
        'a': ['href', 'target', 'rel']
    },
    allowedClasses: {
        '*': ['*']
    }
});