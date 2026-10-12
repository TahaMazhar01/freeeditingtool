import fs from 'node:fs/promises';
import Jimp from 'jimp';

const assets = [
  [
    'compress-images',
    'Mountain_lake_in_Grand_Teton_National_Park_(Unsplash).jpg',
    'Alexandre Chambon',
    'CC0 1.0',
    'https://creativecommons.org/publicdomain/zero/1.0/'
  ],
  [
    'image-formats',
    'Camera_(Unsplash).jpg',
    'Alexander Wang',
    'CC0 1.0',
    'https://creativecommons.org/publicdomain/zero/1.0/'
  ],
  [
    'resize-images',
    'Camera_Lens_Reflections_(Unsplash).jpg',
    'Jakob Owens',
    'CC0 1.0',
    'https://creativecommons.org/publicdomain/zero/1.0/'
  ],
  [
    'compress-pdf',
    'FileStack.jpg',
    'Niklas Bildhauer',
    'CC BY SA 2.0',
    'https://creativecommons.org/licenses/by-sa/2.0/'
  ],
  [
    'image-to-text',
    'Open_book_(Unsplash).jpg',
    'Ben White',
    'CC0 1.0',
    'https://creativecommons.org/publicdomain/zero/1.0/'
  ],
  [
    'csv-to-json',
    'Laptop_on_a_desk.jpg',
    'Radek Grzybowski',
    'CC0 1.0',
    'https://creativecommons.org/publicdomain/zero/1.0/'
  ]
];
await fs.mkdir('public/blog', { recursive: true });
const manifest = [];
const originals = [
  '3/33/Mountain_lake_in_Grand_Teton_National_Park_%28Unsplash%29.jpg',
  '6/67/Camera_%28Unsplash%29.jpg',
  'c/cf/Camera_Lens_Reflections_%28Unsplash%29.jpg',
  '7/7d/FileStack.jpg',
  'c/c1/Open_book_%28Unsplash%29.jpg',
  '6/61/Laptop_on_a_desk.jpg'
];
const originalSizes = [
  [5184, 2916],
  [4592, 3056],
  [5062, 3648],
  [2592, 1944],
  [4288, 2848],
  [3165, 2334]
];
for (const [slug, filename, author, license, licenseUrl] of assets) {
  const source = `https://commons.wikimedia.org/wiki/File:${filename}`;
  const index = assets.findIndex((asset) => asset[0] === slug);
  const original = `https://upload.wikimedia.org/wikipedia/commons/${originals[index]}`;
  const credit = {
    slug,
    source,
    original,
    author,
    license,
    licenseUrl,
    originalDimensions: {
      width: originalSizes[index][0],
      height: originalSizes[index][1]
    },
    changes: 'Resized and JPEG optimized. Display crops depend on viewport.',
    verifiedOn: '2026-10-12'
  };
  manifest.push(credit);
  if (
    await fs.access(`public/blog/${slug}.jpg`).then(
      () => true,
      () => false
    )
  )
    continue;
  const imageResponse = await fetch(original, {
    headers: { 'User-Agent': 'FreeEditingToolsLocalBlog/1.0' }
  });
  if (!imageResponse.ok)
    throw new Error(`${original}: ${imageResponse.status}`);
  const image = await Jimp.read(Buffer.from(await imageResponse.arrayBuffer()));
  const dimensions = { width: image.bitmap.width, height: image.bitmap.height };
  await image
    .clone()
    .resize(1920, Jimp.AUTO)
    .quality(88)
    .writeAsync(`public/blog/${slug}.jpg`);
  await image
    .clone()
    .resize(768, Jimp.AUTO)
    .quality(85)
    .writeAsync(`public/blog/${slug}-small.jpg`);
  console.log(`${slug}: ${dimensions.width} x ${dimensions.height}`);
}
await fs.writeFile(
  'public/blog/image-credits.json',
  JSON.stringify(manifest, null, 2) + '\n'
);
