import React from "react";
import classes from "./dashboard.module.css";

const ItemCard = (props) => {
  const { title, image, onClick, color, showBadge, number } = props;

  const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

  return (
    <div
      className={classes.cardContainer}
      style={{ backgroundColor: color }}
      id="btn"
      onClick={() => {
        onClick();
        audio.play();
      }}
    >
      {showBadge && <span className={classes.badge}> {number} </span>}
      <img src={image} className={classes.cardImage} alt={title} />
      <strong> {title} </strong>
    </div>
  );
};

export default ItemCard;
