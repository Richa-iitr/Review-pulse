import { PiShieldStarFill } from "react-icons/pi";
const Star = ({ starId, rating, onMouseEnter, onMouseLeave, onClick }) => {
  let styleClass = "star-rating-blank";
  if (rating && rating >= starId) {
    styleClass = "star-rating-filled";
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={"star-wrapper"}
    >
      <PiShieldStarFill className={styleClass} size={30} />
    </div>
  );
};

export default Star;
