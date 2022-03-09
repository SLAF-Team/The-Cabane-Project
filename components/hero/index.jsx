import Image from "next/image";
import classes from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={classes.herobanner}>
      <Image
        src="/shacks.gif"
        layout="responsive"
        className={classes.heroimage}
        width="700"
        height="200"
        alt="dreamy lodge"
        objectFit="cover"
        filter="grayscale(100%)"
        priority
      />
      <h1 className={classes.centeredtitle}>The Cabane Project</h1>
    </div>
  );
}
