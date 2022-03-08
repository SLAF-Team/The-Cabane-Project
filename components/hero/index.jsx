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
        height="180"
        alt="dreamy lodge"
        objectFit="cover"
        filter="grayscale(100%)"
        priority
      />
      <h1 className={classes.centeredtitle}>The Cabane Project</h1>
      <div className="px-4 py-5 my-5 text-center">
        <div className="col-lg-6 mx-auto">
          <div className="lead mb-4">Trouvez la bicoque de vos rêves !</div>
          {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button>
        </div> */}
        </div>
      </div>
    </div>
  );
}
