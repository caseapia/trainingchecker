import React, { FC } from "react";
import ContentLoader from "react-content-loader";

import BootstrapTooltip from "@/components/styles/TooltipStyles";

interface Interface {
  loadingText?: string;
}

const PlayerLoader: FC<Interface> = ({ loadingText }) => {

  return (
    <BootstrapTooltip title={loadingText ?? "Loading..."}>
      <ContentLoader
        speed={1}
        backgroundColor="#1a1717"
        foregroundColor="#a6a6a6"
      >
        {/* Заголовок */}
        <rect x="20"
          y="20"
          rx="3"
          ry="3"
          width="200"
          height="24"/>

        {/* ID и Ник */}
        <rect x="20"
          y="60"
          rx="3"
          ry="3"
          width="100"
          height="14"/>
        <rect x="130"
          y="60"
          rx="3"
          ry="3"
          width="120"
          height="14"/>

        {/* Должность */}
        <rect x="20"
          y="90"
          rx="3"
          ry="3"
          width="80"
          height="14"/>
        <rect x="110"
          y="90"
          rx="3"
          ry="3"
          width="60"
          height="14"/>

        {/* Верификация */}
        <rect x="20"
          y="120"
          rx="3"
          ry="3"
          width="100"
          height="14"/>
        <rect x="130"
          y="120"
          rx="3"
          ry="3"
          width="150"
          height="14"/>

        {/* Текст верификации */}
        <rect x="20"
          y="150"
          rx="3"
          ry="3"
          width="120"
          height="14"/>
        <rect x="150"
          y="150"
          rx="3"
          ry="3"
          width="200"
          height="14"/>

        {/* Время мута */}
        <rect x="20"
          y="180"
          rx="3"
          ry="3"
          width="100"
          height="14"/>
        <rect x="130"
          y="180"
          rx="3"
          ry="3"
          width="40"
          height="14"/>

        {/* Даты */}
        <rect x="20"
          y="210"
          rx="3"
          ry="3"
          width="140"
          height="14"/>
        <rect x="170"
          y="210"
          rx="3"
          ry="3"
          width="180"
          height="14"/>

        <rect x="20"
          y="240"
          rx="3"
          ry="3"
          width="160"
          height="14"/>
        <rect x="190"
          y="240"
          rx="3"
          ry="3"
          width="200"
          height="14"/>

        {/* Разделитель */}
        <rect x="20"
          y="280"
          rx="3"
          ry="3"
          width="560"
          height="1"/>

        {/* Значки */}
        <rect x="20"
          y="300"
          rx="3"
          ry="3"
          width="100"
          height="18"/>

        <circle cx="30"
          cy="340"
          r="8"/>
        <rect x="45"
          y="335"
          rx="3"
          ry="3"
          width="100"
          height="12"/>

        <circle cx="30"
          cy="370"
          r="8"/>
        <rect x="45"
          y="365"
          rx="3"
          ry="3"
          width="100"
          height="12"/>
      </ContentLoader>
    </BootstrapTooltip>
  );
};

export default PlayerLoader;