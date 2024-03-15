import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

import { useApp } from "../../context/AppContext";

const HomePageForm = () => {
  ``;
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const {
    setRoomId: storeRoomIdToContext,
    setUsername: storeUsernameToContext,
  } = useApp();

  const navigate = useNavigate();

  const createNewRoomHandler = () => {
    const newRoomId = uuid();
    setRoomId(newRoomId);
  };

  const joinRoomHandler = () => {
    if (!username.trim() || !roomId.trim()) {
      toast.error("Username and RoomId required");
      return;
    }
    storeRoomIdToContext(roomId);
    storeUsernameToContext(username);

    navigate(`code/${roomId}`, { state: { username } });
  };

  useEffect(() => {
    if (location.state?.roomId) {
      toast.success("Username is required");
      setRoomId(location.state.roomId);
    }
  }, []);

  return (
    <div className="container w-[600px] h-[300px] bg-gray-800 p-2 rounded-lg space-y-8">
      <h1 className="text-4xl font-bold text-yellow-600 mb-8">Code Wave</h1>
      <div className="fields my-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your name..."
          className="text-stone-900 outline-none bg-stone-300 rounded-sm w-full px-4 py-1 text-xl placeholder-stone-600"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="RoomId..."
          className="text-stone-900 outline-none bg-stone-300 rounded-sm w-full px-4 py-1 text-xl placeholder-stone-600"
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />

        <button
          className="px-4 py-1 rounded-md bg-yellow-600 text-white font-semibold self-end text-xl"
          onClick={joinRoomHandler}
        >
          Join Room
        </button>
      </div>
      <p className="text-white">
        Don't have any room{" "}
        <span
          onClick={createNewRoomHandler}
          className="text-yellow-300 cursor-pointer border-b border-yellow-300"
        >
          create one
        </span>
      </p>
    </div>
  );
};
export default HomePageForm;
