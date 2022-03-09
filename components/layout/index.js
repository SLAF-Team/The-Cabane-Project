import Footer from "../footer";
import Navbar from "../navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
  
}
