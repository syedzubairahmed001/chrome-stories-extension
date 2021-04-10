import React from "react";

import styles from "./bgColorChanger.module.css";
import storyColors from "../../../constants/storyColors";

const BgColorChanger = (props) => {
  const { currentColorId, ...remainingProps } = props || {};
//   const {themeId, setThemeId} = React.useState(0);
//   React.useEffect(() => {
//     if(currentColorId){
//         setThemeId(currentColorId === 5 ? 0 : currentColorId)
//     }
//   }, []);

  return (
    <div
      className={` ${styles.container} ${
        "storyColor" + currentColorId
      } cursor-pointer click-effect`}
      {...remainingProps}
    ></div>
  );
};

export default BgColorChanger;
