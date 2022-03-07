import Image from "next/image";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <Image
        src="/lodge.jpeg"
        layout="responsive"
        className="d-block mx-lg-auto img-fluid"
        width="700"
        height="500"
        alt="dreamy lodge"
      />
      <h1 className="display-5 fw-bold">The Cabane Project</h1>
      <div className="col-lg-6 mx-auto">
        <div className="lead mb-4">Trouvez la bicoque de vos rêves !</div>
        {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
        <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button>
      </div> */}
      </div>
    </div>
  );
}
