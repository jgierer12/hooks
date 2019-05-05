import fs from "fs";
import path from "path";

test(`index.js exports all hooks`, () => {
  const indexRes = require(`../index`);
  const indexExports = Object.keys(indexRes);

  const files = fs.readdirSync(path.resolve(__dirname, `..`));
  const hookFiles = files.filter(file => /^use-.+\.js$/.test(file));
  const hookExports = hookFiles.reduce((acc, file) => {
    const res = require(`../${file}`);
    return [...acc, ...Object.keys(res)];
  }, []);

  hookExports.forEach(hookExport => {
    expect(indexExports).toContain(hookExport);
  });
  indexExports.forEach(indexExport => {
    expect(hookExports).toContain(indexExport);
  });
});
