import React from "react";
import ContentLoader from "react-content-loader";

const PageSkeleton = () => (
  <ContentLoader
    speed={1}
    width={600}
    height={400}
    viewBox="0 0 600 400"
    backgroundColor="#1a1717"
    foregroundColor="#a6a6a6"
    title="Загрузка..."
  >
    {/* Первый абзац */}
    <rect x="20" y="20" rx="3" ry="3" width="500" height="15"/>
    <rect x="20" y="45" rx="3" ry="3" width="450" height="15"/>

    {/* Второй абзац */}
    <rect x="20" y="80" rx="3" ry="3" width="300" height="15"/>

    {/* Третий абзац */}
    <rect x="20" y="115" rx="3" ry="3" width="550" height="15"/>
    <rect x="20" y="140" rx="3" ry="3" width="400" height="15"/>

    {/* Дата обновления */}
    <rect x="20" y="175" rx="3" ry="3" width="250" height="15"/>

    {/* Поле ввода */}
    <rect x="20" y="220" rx="3" ry="3" width="200" height="15"/>
    <rect x="20" y="250" rx="5" ry="5" width="300" height="40"/>
  </ContentLoader>
);

export default PageSkeleton;