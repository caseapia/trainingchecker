import Link from "next/link";
import React from "react";

const urlRegex = /(\b(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/\S*)?\b)/gi;
const testRegex = new RegExp(urlRegex.source, "i");

const renderTextWithLinks = (text: string) => {
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    const isLink = testRegex.test(part);

    if (isLink) {
      const hasProtocol = part.startsWith("http://") || part.startsWith("https://");
      const href = hasProtocol ? part : `https://${part}`;

      return (
        <Link key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer">
          {part}
        </Link>
      );
    }

    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

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
            style={{ color: formattedColor }}>
            {renderTextWithLinks(nextText)}
          </span>
        );
        i++;
      }
    } else if (parts[i]) {
      elements.push(<React.Fragment key={i}>{renderTextWithLinks(parts[i])}</React.Fragment>);
    }
  }

  return elements;
};

export default textFormatter;
