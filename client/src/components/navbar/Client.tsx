const Client = ({ username = "" }: { username?: string }) => {
  return (
    <div className="user text-white/70 capitalize cursor-pointer">
      <div className="w-20 h-20  rounded-full bg-rose-600 flex items-center justify-center text-3xl">
        {username[0]}
      </div>
      <p className="text-center">{username}</p>
    </div>
  );
};

export default Client;
