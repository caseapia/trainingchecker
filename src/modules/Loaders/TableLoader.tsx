import React, { FC, Fragment } from "react";
import ContentLoader from "react-content-loader";
import BootstrapTooltip from "@/components/styles/TooltipStyles";

interface Interface {
  rows: number;
  columns: number;
  columnWidth?: number;
  gap?: number;
  loadingText: string;
}

const TableLoader: FC<Interface> = ({ rows = 5, columns = 5, columnWidth = 219, gap = 35, loadingText }) => {
  // Overall params
  const rowHeight = 24;
  const borderRadius = 10;
  const headerY = 24;
  const contentStartY = 60;

  // Positions for columns
  const calculateXPosition = (colIndex: number) => {
    return 19 + colIndex * (columnWidth + gap);
  };

  return (
    <BootstrapTooltip title={loadingText}>
      <ContentLoader
        speed={1}
        width={columns * (columnWidth + gap) + 19}
        height={contentStartY + rows * 32}
        viewBox={`0 0 ${columns * (columnWidth + gap) + 19} ${contentStartY + rows * 32}`}
        backgroundColor="#1a1717"
        foregroundColor="#a6a6a6"
        title="Загрузка..."
      >
        {/* Headers */}
        {[...Array(columns)].map((_, colIndex) => (
          <rect
            key={`header-${colIndex}`}
            x={calculateXPosition(colIndex)}
            y={headerY}
            rx={borderRadius}
            ry={borderRadius}
            width={columnWidth}
            height={rowHeight}
          />
        ))}

        {/* Rows */}
        {[...Array(rows)].map((_, rowIndex) => {
          const y = contentStartY + rowIndex * 32;

          return (
            <Fragment key={`row-${rowIndex}`}>
              {[...Array(columns)].map((_, colIndex) => (
                <rect
                  key={`cell-${rowIndex}-${colIndex}`}
                  x={calculateXPosition(colIndex)}
                  y={y}
                  rx={borderRadius}
                  ry={borderRadius}
                  width={columnWidth}
                  height={rowHeight}
                />
              ))}
            </Fragment>
          );
        })}
      </ContentLoader>
    </BootstrapTooltip>
  );
};

export default TableLoader;