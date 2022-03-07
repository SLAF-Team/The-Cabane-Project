import {Link, Image} from "next/link";
import styles from "./hero.module.css";

export default function Hero() {
  // const myLoader = ({ src, width, quality }) => {
  //   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  // };

  return (
    <div className="px-4 py-5 my-5 text-center">
      {/* <Image className="d-block mx-auto mb-4" src="https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.nidperche.com%2Fcabane-details%2Fcabane-hobbit.html&psig=AOvVaw3jDVSE0IrS93ZrnT8i_7p-&ust=1646752343552000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIDK7dektPYCFQAAAAAdAAAAABAD" alt="" width="72" height="57"/> */}
      {/* <Image
        loader={myLoader}
        src="https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.nidperche.com%2Fcabane-details%2Fcabane-hobbit.html&psig=AOvVaw3jDVSE0IrS93ZrnT8i_7p-&ust=1646752343552000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIDK7dektPYCFQAAAAAdAAAAABAD"
        alt="Cabane"
        width={72}
        height={57}
      /> */}
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
