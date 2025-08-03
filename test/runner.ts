/*
 * import all modules in this dir that have 'test' in filename
 * place into array
 * trycatch array
 * in try print out table row of module name and check emoji
 * in catch print out table row of module name and red x emoji, also increment failed counter
 * outside of loop print either All Passed or X Failed
*/
import { readdirSync } from 'fs';
import { join, parse } from 'path';

// LOAD ALL the export default functions from files in a directory
async function loadAllDefaults<T = any>(dir: string) {
  const entries = readdirSync(dir).filter(f => /\.(j|t)sx?$/.test(f));

  const imports = entries.map(async file => {
    const mod = await import(join(dir, file));
    const name = parse(file).name;      // <-- strip any extension
    return [name, mod.default] as const;
  });

  return Object.fromEntries(await Promise.all(imports)) as Record<string, T>;
}

// Loop through the tests in this directory and log the results
export default async function runTests() {
  const tests = await loadAllDefaults(__dirname);
  // const tests = {john: ()=>console.log("hi")}

  let failCount = 0;
  let testResults = {}

  for (const name in tests) {
    const test = tests[name];
    try {
      test();
      testResults[name] = "✅"
    } catch (error) {
      failCount++
      testResults[name] = "⛔"
    }
  }

  console.table(testResults);

  if(failCount > 0) {
    console.log(failCount, "tests FAILED!");
  } else {
    console.log("All tests succeeded : )");
    console.log("fails",failCount)
  }

  return failCount;
}

runTests()
