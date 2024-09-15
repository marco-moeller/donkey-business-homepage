import { useState } from "react";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";

function Tooltip({ children, text = "Tooltip" }) {
  const { isShowing, toggle } = useVisibilityToggle();
  const [position, setPosition] = useState([0, 0]);

  const setTooltipPosition = (event) => {
    setPosition([event.pageX - window.scrollX, event.pageY - window.scrollY]);
  };

  return (
    <div
      className="tooltip--children"
      onMouseEnter={toggle}
      onMouseLeave={toggle}
      onMouseMove={setTooltipPosition}
    >
      {isShowing && (
        <div
          className="tooltip"
          style={{
            left: position[0],
            top: position[1]
          }}
        >
          {text}
        </div>
      )}
      {children}
    </div>
  );
}

export default Tooltip;
