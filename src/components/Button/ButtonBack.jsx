import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function ButtonBack() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)}>
        <IoArrowBack />
      </button>
    </>
  );
}
