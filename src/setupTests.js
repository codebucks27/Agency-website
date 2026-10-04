// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

// jsdom provides no layout or scrolling APIs. Keep the real app, GSAP, and
// react-slick mounted while supplying the browser methods they depend on.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn(/** @param {string} media */ (media) => ({
    matches: false,
    media,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  })),
});

Object.defineProperty(window, "scrollTo", { writable: true, value: vi.fn() });
Object.defineProperty(Element.prototype, "scrollIntoView", {
  writable: true,
  value: vi.fn(),
});

// Browsers return a matrix for computed scale transforms; jsdom leaves scale()
// unevaluated. GSAP reads that matrix even in DOM-only content/navigation tests.
const getComputedStyle = window.getComputedStyle.bind(window);
window.getComputedStyle = (element, pseudoElement) => {
  const style = getComputedStyle(element, pseudoElement);
  const scale = /^scale\(([-\d.]+)(?:\s*,\s*([-\d.]+))?\)$/.exec(style.transform);
  if (!scale) return style;
  const transform = `matrix(${scale[1]}, 0, 0, ${scale[2] ?? scale[1]}, 0, 0)`;

  return new Proxy(style, {
    get(target, property) {
      if (property === "transform") return transform;
      if (property === "getPropertyValue") {
        return (/** @type {string} */ name) => name === "transform" ? transform : target.getPropertyValue(name);
      }
      const value = Reflect.get(target, property);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
};
