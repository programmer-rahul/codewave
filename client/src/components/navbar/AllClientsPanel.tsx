import { useApp } from "../../context/AppContext";
import toast from "react-hot-toast";
import Client from "./Client";
import { useNavigate } from "react-router-dom";

const AllClientsPanel = () => {
  const navigate = useNavigate();

  const { allClients, roomId } = useApp();

  const shareRoomClickHandler = () => {
    navigator.clipboard
      .writeText(roomId)
      .then(() => toast.success("Room ID copied to clipboard"))
      .catch(() => toast.error("Failded to copy"));
  };
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-white">Connected Users</h2>
        <div className="flex flex-wrap gap-5 ">
          {allClients?.map((client, index) => (
            <Client key={index} username={client.username} />
          ))}
        </div>
      </div>

      <div className="flex gap-4 self-end">
        <button
          className="self-end rounded-md bg-green-600 px-4 py-1 text-xl font-semibold text-white"
          onClick={shareRoomClickHandler}
        >
          Share RoomId
        </button>
        <button
          className="self-end rounded-md bg-rose-900 px-4 py-1 text-xl font-semibold text-white"
          onClick={() => {
            navigate("/");
          }}
        >
          Exit Room
        </button>
      </div>
    </div>
  );
};
export default AllClientsPanel;
