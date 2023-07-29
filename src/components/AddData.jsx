import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddData = () => {
  const navigate = useNavigate();

  const myInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_API,
  });

  const [name, setName] = useState("");

  const TambahData = async (e) => {
    e.preventDefault();
    await myInstance.post("/works", {
      name: name,
    });
    return navigate("/");
  };

  return (
    <div className="w-full h-screen bg-zinc-950 flex justify-center items-center">
      <div className="w-[400px] h-[400px] px-3 md:px-0  mx-auto flex justify-center items-center text-white">
        <div className="w-full block mx-auto">
          <div className="leading-none">
            <p className="font-bold text-2xl">Nekoserve.</p>
            <p>@nekoserve</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="masukan text.."
              className="bg-zinc-900  border border-zinc-700 w-full rounded-md h-[50px]  my-5 px-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-white text-black font-bold  border border-zinc-700 w-full rounded-md h-[50px]"
              onClick={TambahData}
            >
              Add Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddData;
