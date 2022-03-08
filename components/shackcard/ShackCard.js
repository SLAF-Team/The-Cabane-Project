import Link from "next/link";
import Image from 'next/image'


const ShackCard = ({ shack }) => {
  return (
      <div>
        <h3>{shack.title}</h3>
        <p>{shack.description}</p>
      </div>
  );
}

export default ShackCard