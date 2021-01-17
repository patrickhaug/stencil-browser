function loadStencilCompiler(doc = document) {
  const s = doc.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/@stencil/core@latest/compiler/stencil.min.js";
  return new Promise((resolve, reject) => {
    s.onload = () => resolve(window.stencil.transpile);
    s.onerror = reject;
    doc.body.appendChild(s);
  });
}

const h = "import { h } from 'https://cdn.skypack.dev/@stencil/core';\n";

export async function compileStencil(source, doc = document) {
  if (!source) {
    throw new Error("no source code provided to compile");
  }
  const transpile = await loadStencilCompiler(doc);
  const { code } = await transpile(h + source, { sourceMap: false });
  return code;
}

export async function runStencil(source, doc = document) {
  if (!source) {
    throw new Error("no source code provided to compile");
  }
  const code = await compileStencil(source, doc);

  const s = doc.createElement("script");
  s.type = "module"
  s.innerHTML = code.replace(
  "@stencil/core/internal/client",
  "https://cdn.skypack.dev/@stencil/core/internal/client"
  );

  doc.body.appendChild(s);
}
