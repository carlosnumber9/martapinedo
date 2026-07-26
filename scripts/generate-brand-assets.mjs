import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(scriptDirectory, '..');
const publicDirectory = path.join(rootDirectory, 'public');
const appDirectory = path.join(rootDirectory, 'app');
const darkPrimary = '#1c0f13';

const logoPath = path.join(publicDirectory, 'brand/logo-mark.svg');
const maskableLogoPath = path.join(publicDirectory, 'brand/logo-mark-maskable.svg');
const faviconSvgPath = path.join(publicDirectory, 'favicon.svg');

const ensureParentDirectory = async (filePath) => {
  await mkdir(path.dirname(filePath), { recursive: true });
};

const renderSvg = async (sourcePath, outputPath, size) => {
  await ensureParentDirectory(outputPath);
  await sharp(sourcePath).resize(size, size).png().toFile(outputPath);
};

const renderOnBackground = async ({
  logo = logoPath,
  outputPath,
  size,
}) => {
  await ensureParentDirectory(outputPath);
  const mark = await sharp(logo).resize(size, size).png().toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: darkPrimary,
    },
  })
    .composite([{ input: mark }])
    .flatten({ background: darkPrimary })
    .removeAlpha()
    .png()
    .toFile(outputPath);
};

const createIco = async (entries, outputPath) => {
  const pngBuffers = await Promise.all(entries.map(({ filePath }) => readFile(filePath)));
  const headerSize = 6;
  const directoryEntrySize = 16;
  const directorySize = entries.length * directoryEntrySize;
  let imageOffset = headerSize + directorySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(directorySize);

  entries.forEach(({ size }, index) => {
    const entryOffset = index * directoryEntrySize;
    const png = pngBuffers[index];

    directory.writeUInt8(size >= 256 ? 0 : size, entryOffset);
    directory.writeUInt8(size >= 256 ? 0 : size, entryOffset + 1);
    directory.writeUInt8(0, entryOffset + 2);
    directory.writeUInt8(0, entryOffset + 3);
    directory.writeUInt16LE(1, entryOffset + 4);
    directory.writeUInt16LE(32, entryOffset + 6);
    directory.writeUInt32LE(png.length, entryOffset + 8);
    directory.writeUInt32LE(imageOffset, entryOffset + 12);
    imageOffset += png.length;
  });

  await ensureParentDirectory(outputPath);
  await writeFile(outputPath, Buffer.concat([header, directory, ...pngBuffers]));
};

const generate = async () => {
  await renderSvg(
    logoPath,
    path.join(publicDirectory, 'brand/logo-mark-4096.png'),
    4096
  );

  const faviconSizes = [16, 32, 48, 64];
  const faviconEntries = [];

  for (const size of faviconSizes) {
    const filePath = path.join(publicDirectory, `icons/favicon-${size}.png`);
    await renderSvg(faviconSvgPath, filePath, size);
    faviconEntries.push({ size, filePath });
  }

  await createIco(faviconEntries, path.join(publicDirectory, 'favicon.ico'));
  await createIco(faviconEntries, path.join(appDirectory, 'favicon.ico'));

  await renderOnBackground({
    outputPath: path.join(appDirectory, 'apple-icon.png'),
    size: 180,
  });
  await renderOnBackground({
    outputPath: path.join(publicDirectory, 'icons/apple-touch-icon-180.png'),
    size: 180,
  });

  for (const size of [192, 512]) {
    await renderOnBackground({
      outputPath: path.join(publicDirectory, `icon-${size}.png`),
      size,
    });
    await renderOnBackground({
      logo: maskableLogoPath,
      outputPath: path.join(publicDirectory, `icon-maskable-${size}.png`),
      size,
    });
  }
};

await generate();
