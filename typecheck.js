const { TypeChecker } = require("esbuild-helpers");

const frontend = TypeChecker({
    basePath: "./",
    name: "typechecker",
    shortenFilenames: false,
    tsConfig: "./tsconfig.json"
});

frontend.printSettings();
frontend.inspectAndPrint();


