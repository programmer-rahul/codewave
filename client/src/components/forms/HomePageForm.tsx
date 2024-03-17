import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

import { useApp } from "../../context/AppContext";

const HomePageForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    setRoomId: storeRoomIdToContext,
    setUsername: storeUsernameToContext,
  } = useApp();

  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

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
    <div className="container h-[300px] w-[600px] space-y-8 rounded-lg bg-gray-800 p-2">
      <h1 className="mb-8 text-4xl font-bold text-yellow-600">Code Wave</h1>
      <div className="fields my-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your name..."
          className="w-full rounded-sm bg-stone-300 px-4 py-1 text-xl text-stone-900 placeholder-stone-600 outline-none"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="RoomId..."
          className="w-full rounded-sm bg-stone-300 px-4 py-1 text-xl text-stone-900 placeholder-stone-600 outline-none"
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />

        <button
          className="self-end rounded-md bg-yellow-600 px-4 py-1 text-xl font-semibold text-white"
          onClick={joinRoomHandler}
        >
          Join Room
        </button>
      </div>
      <p className="text-white">
        Don't have any room{" "}
        <span
          onClick={createNewRoomHandler}
          className="cursor-pointer border-b border-yellow-300 text-yellow-300"
        >
          create one
        </span>
      </p>
    </div>
  );
};
export default HomePageForm;
