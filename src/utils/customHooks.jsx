import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const useSpinner = () => {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setloading(true);
    }, 1500);
  }, []);

  return <div>{!loading && <Spinner />}</div>;
};

export { useSpinner };