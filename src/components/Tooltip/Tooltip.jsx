import useVisibilityToggle from "../../hooks/useVisibilityToggle";

function Tooltip({ children, text = "Tooltip" }) {
  const { isShowing, toggle } = useVisibilityToggle();

  return (
    <div
      className="tooltip--children"
      onMouseEnter={toggle}
      onMouseLeave={toggle}
    >
      {isShowing && <div className="tooltip">{text}</div>}
      {children}
    </div>
  );
}

export default Tooltip;
