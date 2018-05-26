// rollup.config.js
// import resolve from "rollup-plugin-node-resolve";
// import babel from "rollup-plugin-babel";
// import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";
import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./build/react-virtual-render.js",
      format: "umd",
      name: "ReactVirtualRender"
    },

    plugins: [
      typescript(/*{ plugin options }*/),
      alias({
        react: "node_modules/react/umd/react.development.js"
      })
    ],
    external: ["react"],
    globals: {
      react: "React"
    }
  }
];
