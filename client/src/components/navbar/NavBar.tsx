import { Tab, useApp } from "../../context/AppContext";
import AllClientsPanel from "./AllClientsPanel";
import FilesPanel from "./FilesPanel";
import ChatPanel from "./ChatPanel";
import { useEffect } from "react";

const SideNavBar = () => {
  const {
    selectedTab,
    setSelectedTab,
    chatMessages,
    unreadMessageCount,
    setUnreadMessageCount,
  } = useApp();

  const handleTabIconClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    let clickedTab: Tab = e.currentTarget.alt as Tab;

    clickedTab === "clients" && setSelectedTab(clickedTab);
    clickedTab === "files" && setSelectedTab(clickedTab);
    clickedTab === "chat" && setSelectedTab(clickedTab);
    clickedTab === "setting" && setSelectedTab(clickedTab);
  };

  useEffect(() => {
    const unreadMessages = chatMessages.filter(
      (message) => message.isSeen === false,
    );
    setUnreadMessageCount(unreadMessages.length);
  }, [chatMessages]);

  return (
    <div className="flex">
      <div className="sidenavbar flex flex-col items-start justify-between border-r p-4">
        <div className="space-y-4">
          <div>
            <img
              src="/clients.svg"
              alt="clients"
              width={70}
              className="cursor-pointer"
              onClick={handleTabIconClick}
            />
          </div>
          <div>
            <img
              src="/files.svg"
              alt="files"
              width={70}
              className="cursor-pointer"
              onClick={handleTabIconClick}
            />
          </div>
          <div className="relative">
            <img
              src="/chat.svg"
              alt="chat"
              width={70}
              className="cursor-pointer"
              onClick={handleTabIconClick}
            />
            {unreadMessageCount !== 0 && (
              <p className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 font-semibold">
                {unreadMessageCount}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <img
              src="/setting.svg"
              alt="setting"
              width={70}
              className="cursor-pointer"
              onClick={handleTabIconClick}
            />
          </div>
        </div>
      </div>

      <div className="selected-tab w-[30rem]">
        {selectedTab === "clients" && <AllClientsPanel />}
        {selectedTab === "files" && <FilesPanel />}
        {selectedTab === "chat" && <ChatPanel />}
        {selectedTab === "setting" && <div>Setting</div>}
      </div>
    </div>
  );
};
export default SideNavBar;
