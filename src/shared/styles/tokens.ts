type ColorMap = {
  danger: string;
  muted: string;
  defaultText: string;
  link: string;
  black: string;
  white: string;
  gray: string;
  red: string;
  green: string;
};

const colors: ColorMap = {
  danger: "#dc3545",
  muted: "rgba(237, 237, 237, 0.78)",
  defaultText: "#ededed",
  link: "#0088cc",
  black: "#000",
  white: "#fff",
  gray: "#ccc",
  red: "#f01f4b",
  green: "rgba(145, 236, 102, 0.91)"
};

const generateColorClass = (color: string) => {
  const className = "c" + Math.random().toString(36).substring(2, 8);

  if (!document.getElementById(className)) {
    const style = document.createElement("style");
    style.id = className;
    style.innerHTML = `.${className} { color: ${color}; }`;
    document.head.appendChild(style);
  }

  return className;
};

export const Color = Object.fromEntries(
  Object.entries(colors).map(([key, value]) => [key, () => generateColorClass(value)])
) as { [K in keyof ColorMap]: () => string };

export default Color;