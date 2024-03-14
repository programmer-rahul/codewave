import { useState } from "react";

const HomePage = () => {
  const [userInputs, setUserInputs] = useState({
    username: "",
    roomId: "",
  });

  const createNewRoomHandler = () => {};

  const joinRoomHandler = () => {};

  return (
    <main className="h-screen bg-slate-900">
      <div className="flex h-full items-center justify-center">
        <div className="container w-[600px] h-[300px] bg-gray-800 p-2 rounded-lg space-y-8">
          <h1 className="text-4xl font-bold text-yellow-600 mb-8">Code Sync</h1>

          <div className="fields my-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your name..."
              className="text-stone-900 outline-none bg-stone-300 rounded-sm w-full px-4 py-1 text-xl placeholder-stone-600"
              value={userInputs.username}
              onChange={(e) => {
                setUserInputs((prev) => {
                  return { ...prev, username: e.target.value };
                });
              }}
            />
            <input
              type="text"
              placeholder="RoomId..."
              className="text-stone-900 outline-none bg-stone-300 rounded-sm w-full px-4 py-1 text-xl placeholder-stone-600"
              value={userInputs.roomId}
              onChange={(e) => {
                setUserInputs((prev) => {
                  return { ...prev, roomId: e.target.value };
                });
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
      </div>
    </main>
  );
};
export default HomePage;
