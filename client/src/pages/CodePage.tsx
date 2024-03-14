import { useApp } from "../context/AppContext";

const CodePage = () => {
  const { allClients } = useApp();

  return (
    <main className="h-screen bg-slate-900">
      <div className="flex h-full border">
        {/* userinfopanel  */}
        <div className="userinfo-area w-2/5 border">
          <div className="h-full p-4 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-yellow-600 mb-8">
                Code Sync
              </h1>

              <div className="connected-users">
                <p className="text-xl text-white">Connected Users</p>
                <div className="user-list grid grid-cols-3 place-items-start gap-y-10 mt-10">
                  {allClients?.map((client, index) => (
                    <CodeUser key={index} username={client.username} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 self-end">
              <button className="px-4 py-1 rounded-md bg-green-600 text-white font-semibold self-end text-xl">
                Share RoomId
              </button>
              <button className="px-4 py-1 rounded-md bg-rose-900 text-white font-semibold self-end text-xl">
                Exit Room
              </button>
            </div>
          </div>
        </div>
        {/* code area  */}
        <div className="code-area border w-full"></div>
      </div>
    </main>
  );
};
export default CodePage;

const CodeUser = ({ username = "" }: { username?: string }) => {
  return (
    <div className="user text-white/70 capitalize cursor-pointer">
      <div className="w-20 h-20  rounded-full bg-rose-600 flex items-center justify-center text-3xl">
        {username[0]}
      </div>
      <p className="text-center">{username}</p>
    </div>
  );
};
