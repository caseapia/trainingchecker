import React, { useEffect, useState } from "react";
import Props from "./types";
import styles from "./styles/Badge.module.scss";
import types from "./styles/Types.module.scss";
import sizes from "./styles/Sizes.module.scss";
import Lottie from "lottie-react";
import LoadingIcon from "@/icons/LoadingIcon.json";
import { BootstrapTooltip } from "../tooltip/TooltipStyles";
import { clsx } from "clsx";

const Badge = ({
  handler,
  content,
  additionalClass = "",
  type = "default",
  isLoading,
  size = "small",
}: Props) => {
  const [handlerContent, setHandlerContent] = useState("");

  const changeHandlerContent = () => {
    setHandlerContent(`${handler}`);
  };

  useEffect(() => {
    changeHandlerContent();
  }, [handler]);

  return (
    <div className={clsx(styles.Badge, types[type], sizes[size], additionalClass)}>
      <BootstrapTooltip title={isLoading && "Загрузка..."}>
        <span>
					{!isLoading && (
            <>
              {content && content}
              {handler && handlerContent}
            </>
          )}
          {isLoading && (
            <Lottie
              animationData={LoadingIcon}
              className={styles.loading}
              width={16}
              height={16}
            />
          )}
				</span>
      </BootstrapTooltip>
    </div>
  );
};

export default Badge;
