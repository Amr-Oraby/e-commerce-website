import fs from 'fs';
import path from 'path';
import os from 'os';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const homeDir = os.homedir();
const outputDir = path.resolve(process.cwd(), 'downloaded_extensions');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Extension manifests locations
const manifestPaths = [
  path.join(homeDir, '.vscode', 'extensions', 'extensions.json'),
  path.join(homeDir, '.antigravity-ide', 'extensions', 'extensions.json'),
  path.join(homeDir, '.cursor', 'extensions', 'extensions.json'),
];

// Extension folders locations
const extensionFolders = [
  path.join(homeDir, '.vscode', 'extensions'),
  path.join(homeDir, '.antigravity-ide', 'extensions'),
  path.join(homeDir, '.cursor', 'extensions'),
];

const extensionsMap = new Map();

// 1. Read JSON manifests
for (const mPath of manifestPaths) {
  if (fs.existsSync(mPath)) {
    try {
      const content = fs.readFileSync(mPath, 'utf8');
      const list = JSON.parse(content);
      for (const item of list) {
        const id = item.identifier?.id;
        if (!id) continue;
        const parts = id.split('.');
        if (parts.length < 2) continue;
        const publisher = parts[0];
        const extensionName = parts.slice(1).join('.');
        const version = item.version || 'latest';
        const targetPlatform = item.metadata?.targetPlatform;
        let location = item.location?.path || item.location?.fsPath;
        if (location) {
          // Normalize Windows paths like /c:/Users/... -> C:\Users\...
          if (location.startsWith('/c:') || location.startsWith('/C:')) {
            location = location.substring(1).replace(/\//g, '\\');
          }
        }

        const key = `${id.toLowerCase()}@${version}`;
        if (!extensionsMap.has(key)) {
          extensionsMap.set(key, {
            id,
            publisher,
            extensionName,
            version,
            targetPlatform,
            location,
            sourceManifest: mPath
          });
        }
      }
    } catch (e) {
      console.error(`Error reading ${mPath}:`, e.message);
    }
  }
}

// 2. Scan folders for installed extensions if not in manifest
for (const folder of extensionFolders) {
  if (fs.existsSync(folder)) {
    const entries = fs.readdirSync(folder, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        // e.g. esbenp.prettier-vscode-12.4.0
        const fullPath = path.join(folder, entry.name);
        const packageJsonPath = path.join(fullPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            const publisher = pkg.publisher;
            const name = pkg.name;
            const version = pkg.version;
            if (publisher && name) {
              const id = `${publisher}.${name}`;
              const key = `${id.toLowerCase()}@${version}`;
              if (!extensionsMap.has(key)) {
                extensionsMap.set(key, {
                  id,
                  publisher,
                  extensionName: name,
                  version,
                  location: fullPath
                });
              }
            }
          } catch (e) { }
        }
      }
    }
  }
}

console.log(`Found ${extensionsMap.size} unique extensions. Starting download...\n`);

const results = [];

for (const [key, ext] of extensionsMap.entries()) {
  const vsixFileName = `${ext.publisher}.${ext.extensionName}-${ext.version}.vsix`;
  const vsixFilePath = path.join(outputDir, vsixFileName);

  console.log(`[Processing] ${ext.id} (v${ext.version})...`);

  if (fs.existsSync(vsixFilePath)) {
    const size = fs.statSync(vsixFilePath).size;
    console.log(`  -> Already downloaded (${(size / 1024 / 1024).toFixed(2)} MB)`);
    results.push({
      id: ext.id,
      version: ext.version,
      file: vsixFileName,
      sizeBytes: size,
      status: 'Downloaded VSIX',
      method: 'Marketplace VSIX (Cached)'
    });
    continue;
  }

  // Construct marketplace download URLs
  const urlsToTry = [];
  if (ext.targetPlatform && ext.targetPlatform !== 'undefined' && ext.targetPlatform !== 'universal') {
    urlsToTry.push(`https://${ext.publisher}.gallery.vsassets.io/_apis/public/gallery/publisher/${ext.publisher}/extension/${ext.extensionName}/${ext.version}/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage?targetPlatform=${ext.targetPlatform}`);
  }
  urlsToTry.push(`https://${ext.publisher}.gallery.vsassets.io/_apis/public/gallery/publisher/${ext.publisher}/extension/${ext.extensionName}/${ext.version}/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage`);

  let downloaded = false;
  let downloadedSize = 0;

  for (const url of urlsToTry) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const fileStream = fs.createWriteStream(vsixFilePath);
        await pipeline(Readable.fromWeb(res.body), fileStream);
        downloaded = true;
        downloadedSize = fs.statSync(vsixFilePath).size;
        console.log(`  -> Successfully downloaded VSIX (${(downloadedSize / 1024 / 1024).toFixed(2)} MB)`);
        break;
      }
    } catch (err) {
      // Continue to next attempt
    }
  }

  if (downloaded) {
    results.push({
      id: ext.id,
      version: ext.version,
      file: vsixFileName,
      sizeBytes: downloadedSize,
      status: 'Downloaded VSIX',
      method: 'Marketplace VSIX'
    });
  } else {
    console.log(`  -> Online download failed. Attempting local copy/archive...`);
    // Fallback: If local folder exists, copy folder
    if (ext.location && fs.existsSync(ext.location)) {
      const targetFolder = path.join(outputDir, `${ext.publisher}.${ext.extensionName}-${ext.version}`);
      try {
        fs.cpSync(ext.location, targetFolder, { recursive: true });
        const folderSize = getDirSize(targetFolder);
        console.log(`  -> Copied local extension folder (${(folderSize / 1024 / 1024).toFixed(2)} MB)`);
        results.push({
          id: ext.id,
          version: ext.version,
          file: `${ext.publisher}.${ext.extensionName}-${ext.version}`,
          sizeBytes: folderSize,
          status: 'Copied Local Folder',
          method: 'Local Folder'
        });
      } catch (copyErr) {
        console.error(`  -> Failed to copy local folder:`, copyErr.message);
        results.push({
          id: ext.id,
          version: ext.version,
          status: 'Failed',
          error: copyErr.message
        });
      }
    } else {
      console.error(`  -> Failed: Could not download VSIX online and no local folder found.`);
      results.push({
        id: ext.id,
        version: ext.version,
        status: 'Failed',
        error: 'Not found online or locally'
      });
    }
  }
}

function getDirSize(dirPath) {
  let size = 0;
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const file of files) {
    const fp = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      size += getDirSize(fp);
    } else if (file.isFile()) {
      size += fs.statSync(fp).size;
    }
  }
  return size;
}

const manifestFilePath = path.join(outputDir, 'extensions_manifest.json');
fs.writeFileSync(manifestFilePath, JSON.stringify(results, null, 2));

console.log(`\n========================================`);
console.log(`Finished processing ${results.length} extensions.`);
console.log(`Saved files to: ${outputDir}`);
console.log(`Manifest created: ${manifestFilePath}`);
