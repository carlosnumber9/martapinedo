import assert from 'node:assert/strict';
import test from 'node:test';
import { extractHeadingsFromHTML, getCleanPostBody, getHeadingID } from '../utils/posts.ts';

test('removes executable markup, event handlers, and javascript links', () => {
  const cleanHTML = getCleanPostBody(
    '<p>Texto</p><script>alert(1)</script><img src="/foto.jpg" onerror="alert(1)"><a href="javascript:alert(1)">Abrir</a>'
  );

  assert.doesNotMatch(cleanHTML, /<script\b/i);
  assert.doesNotMatch(cleanHTML, /\bonerror\s*=/i);
  assert.doesNotMatch(cleanHTML, /href=["']?\s*javascript:/i);
  assert.match(cleanHTML, /<p>Texto<\/p>/);
});

test('removes iframe and SVG elements', () => {
  const cleanHTML = getCleanPostBody(
    '<iframe src="https://example.com"><p>frame</p></iframe><svg onload="alert(1)"><circle /></svg>'
  );

  assert.doesNotMatch(cleanHTML, /<\/?(?:iframe|svg|circle)\b/i);
  assert.doesNotMatch(cleanHTML, /\bonload\s*=/i);
});

test('preserves image dimensions and adds lazy asynchronous loading', () => {
  const cleanHTML = getCleanPostBody(
    '<img src="https://example.com/foto.jpg" alt="Retrato" width="640" height="480" onerror="alert(1)">'
  );
  const imageTag = cleanHTML.match(/<img\b[^>]*>/i)?.[0];

  assert.ok(imageTag, 'expected sanitized image');
  assert.match(imageTag, /\bwidth="640"/);
  assert.match(imageTag, /\bheight="480"/);
  assert.match(imageTag, /\bloading="lazy"/);
  assert.match(imageTag, /\bdecoding="async"/);
  assert.doesNotMatch(imageTag, /\bonerror\s*=/i);
});

test('builds stable accent-insensitive heading IDs and matching table of contents', () => {
  const cleanHTML = getCleanPostBody(
    '<h2>¿Qué es la acción?</h2><h3>Revisión del <em>caso</em></h3>'
  );

  assert.equal(getHeadingID('¿Qué es la acción?'), 'que-es-la-accion');
  assert.match(cleanHTML, /<h2 id="que-es-la-accion">/);
  assert.match(cleanHTML, /<h3 id="revision-del-caso">/);
  assert.deepEqual(extractHeadingsFromHTML(cleanHTML), [
    { title: '¿Qué es la acción?', level: 2, id: 'que-es-la-accion' },
    { title: 'Revisión del caso', level: 3, id: 'revision-del-caso' },
  ]);
});

test('keeps the GHSA textarea solidus payload inert under the post allowlist', () => {
  const payload = '<textarea></textarea/><img src=x onerror="alert(document.domain)">';
  const cleanHTML = getCleanPostBody(payload);

  assert.doesNotMatch(cleanHTML, /\bonerror\s*=/i);
});
