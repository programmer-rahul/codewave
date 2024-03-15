import { useApp } from "../../context/AppContext";
import toast from "react-hot-toast";
import Client from "./Client";

const AllClientsPanel = () => {
  const { allClients, roomId } = useApp();

  const shareRoomClickHandler = () => {
    navigator.clipboard
      .writeText(roomId)
      .then(() => toast.success("Room ID copied to clipboard"))
      .catch(() => toast.error("Failded to copy"));
  };
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-8">
        <h2 className="text-white font-semibold text-xl">Connected Users</h2>
        <div className="flex gap-5 flex-wrap ">
          {allClients?.map((client, index) => (
            <Client key={index} username={client.username} />
          ))}
        </div>
      </div>

      <div className="flex gap-4 self-end">
        <button
          className="px-4 py-1 rounded-md bg-green-600 text-white font-semibold self-end text-xl"
          onClick={shareRoomClickHandler}
        >
          Share RoomId
        </button>
        <button className="px-4 py-1 rounded-md bg-rose-900 text-white font-semibold self-end text-xl">
          Exit Room
        </button>
      </div>
    </div>
  );
};
export default AllClientsPanel;
