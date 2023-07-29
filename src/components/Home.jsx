import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenClip,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

const Home = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();

  const myInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_API,
  });

  const fetcher = async () => {
    const { data } = await myInstance.get("/works");
    return data;
  };

  const { data, error } = useSWR("works", fetcher);
  if (error)
    return (
      <div className="w-full h-screen flex justify-center items-center text-white bg-zinc-950 text-2xl">
        Failed Load Data🤯...
      </div>
    );
  if (!data)
    return (
      <div className="w-full h-screen flex justify-center items-center text-white bg-zinc-950 text-2xl">
        Loading😮‍💨...
      </div>
    );

  const DeleteData = async (id) => {
    await myInstance.delete(`/works/${id}`);
    mutate(`works`);
  };

  const EditData = (id) => {
    return navigate(`/edit/${id}`);
  };

  return (
    <div className="w-full h-screen bg-zinc-950 flex justify-center items-center">
      <div className="w-[600px] h-[500px] px-3 md:px-0  mx-auto flex justify-center items-center text-white">
        <div className="w-full">
          <div className="block">
            <div className="flex justify-start items-center mb-7">
              <div>
                <button
                  onClick={() => navigate("/add")}
                  className="px-[20px] py-[14px] bg-white text-xl text-black rounded-full me-5 hover:translate-x-1 transition-all duration-300 hover:bg-zinc-900 hover:text-white hover:border hover:border-zinc-500"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="leading-none">
                <p className="font-bold text-2xl">Nekoserve.</p>
                <p>@nekoserve</p>
              </div>
            </div>
            <div className="text-white">
              {data.map((datas) => {
                return (
                  <div
                    className="flex justify-between items-center p-5 bg-zinc-900 rounded-t-md border border-zinc-700 my-3"
                    key={datas.id}
                  >
                    <div className="pe-3">
                      <p>{datas.name}</p>
                    </div>
                    <div className="flex justify-center items-center ">
                      <button
                        onClick={() => EditData(datas.id)}
                        className=" text-white mx-2 hover:translate-y-1 transition-all duration-300"
                      >
                        <FontAwesomeIcon icon={faPenClip} />
                      </button>
                      <button
                        onClick={() => DeleteData(datas.id)}
                        className="text-white mx-2 hover:translate-y-1 transition-all duration-300 hover:text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
