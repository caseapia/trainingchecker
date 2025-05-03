export const textFormatter = (text: string) => {
  const regex = /{(.*?)}/g;
  const parts = text.split(regex);
  const elements = [];

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      const color = parts[i].trim();
      const formattedColor = color.startsWith("#") ? color : `#${color}`;
      const nextText = parts[i + 1];
      if (nextText) {
        elements.push(
          <span key={i}
            style={{ color: formattedColor }}>{nextText}</span>
        );
        i++;
      }
    } else if (parts[i]) {
      elements.push(parts[i]);
    }
  }
  return elements;
};

export default textFormatter;