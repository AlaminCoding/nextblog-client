import { useDispatch } from "react-redux";
import Banner from "components/blocks/Banner";
import GsapTest from "components/blocks/GsapTest";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <>
      <Banner />
      <GsapTest />
    </>
  );
}
