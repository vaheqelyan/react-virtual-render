// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";
export default [
  {
    input: "./src/VirtualList/index.js",
    name: "RVRVirtualList",
    output: {
      file: "build/rvr-virtual-list.js",
      format: "umd"
    },
    plugins: [
      babel({ exclude: "node_modules/**" }),
      resolve({
        jsnext: true,
        main: true
      }),
      commonjs({
        include: "node_modules/**"
      }),
      alias({
        react: "./node_modules/react/umd/react.development.js"
      })
    ],
    external: ["react"],
    globals: {
      react: "React"
    }
  },
  /* HorizontalList */
  {
    input: "./src/HorizontalList/index.js",
    name: "RVRHorizontalList",
    output: {
      file: "build/rvr-virtual-list.js",
      format: "umd"
    },
    plugins: [
      babel({ exclude: "node_modules/**" }),
      resolve({
        jsnext: true,
        main: true
      }),
      commonjs({
        include: "node_modules/**"
      }),
      alias({
        react: "./node_modules/react/umd/react.development.js"
      })
    ],
    external: ["react"],
    globals: {
      react: "React"
    }
  }
];
