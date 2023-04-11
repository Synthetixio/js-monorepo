const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const os = require('os');
const cp = require('child_process');

async function createResizedImage(inputPath, outputPath, size) {
  try {
    await sharp(inputPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toFile(outputPath);
  } catch (err) {
    console.error(`Error resizing image to ${size}x${size}:`, err);
  }
}

async function icns(inputFile, outputDir) {
  const iconsetDir = `${os.tmpdir()}/icon.iconset`;
  await fs.promises.mkdir(iconsetDir, { recursive: true });
  for (const size of [16, 32, 128, 256, 512, 1024]) {
    await createResizedImage(inputFile, path.join(iconsetDir, `icon_${size}x${size}.png`), size);
    await createResizedImage(
      inputFile,
      path.join(iconsetDir, `icon_${size}x${size}@2.png`),
      size * 2
    );
  }
  const icnsFile = path.join(outputDir, 'icon.icns');
  await new Promise(
    (resolve, reject) =>
      cp.exec(`iconutil --convert icns --output ${icnsFile} ${iconsetDir}`, (err) =>
        err ? reject(err) : resolve()
      ),
    { stdio: 'inherit' }
  );
  await fs.promises.rm(iconsetDir, { recursive: true });
}

async function main(inputFile, outputDir) {
  await icns(inputFile, outputDir);
  await createResizedImage(inputFile, path.join(outputDir, 'icon.ico'), 256);
  await createResizedImage(inputFile, path.join(outputDir, 'icon.png'), 256);
  await createResizedImage(inputFile, path.join(outputDir, '32x32.png'), 32);
  await createResizedImage(inputFile, path.join(outputDir, '128x128.png'), 128);
  await createResizedImage(inputFile, path.join(outputDir, '128x128@2x.png'), 256);
  await createResizedImage(inputFile, path.join(outputDir, 'Square30x30Logo.png'), 30);
  await createResizedImage(inputFile, path.join(outputDir, 'Square44x44Logo.png'), 44);
  await createResizedImage(inputFile, path.join(outputDir, 'Square71x71Logo.png'), 71);
  await createResizedImage(inputFile, path.join(outputDir, 'Square89x89Logo.png'), 89);
  await createResizedImage(inputFile, path.join(outputDir, 'Square107x107Logo.png'), 107);
  await createResizedImage(inputFile, path.join(outputDir, 'Square142x142Logo.png'), 142);
  await createResizedImage(inputFile, path.join(outputDir, 'Square150x150Logo.png'), 150);
  await createResizedImage(inputFile, path.join(outputDir, 'Square284x284Logo.png'), 284);
  await createResizedImage(inputFile, path.join(outputDir, 'Square310x310Logo.png'), 310);
  await createResizedImage(inputFile, path.join(outputDir, 'StoreLogo.png'), 50);
}

const [inputFile, outputDir] = process.argv.slice(2);
main(path.resolve(inputFile), path.resolve(outputDir));
