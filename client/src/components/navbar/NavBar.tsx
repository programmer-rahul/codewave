import { Tab, useApp } from "../../context/AppContext";
import AllClientsPanel from "./AllClientsPanel";
import FilesPanel from "./FilesPanel";

const SideNavBar = () => {
  const { selectedTab, setSelectedTab } = useApp();

  const handleTabIconClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    let clickedTab: Tab = e.currentTarget.alt as Tab;

    clickedTab === "clients" && setSelectedTab(clickedTab);
    clickedTab === "files" && setSelectedTab(clickedTab);
    clickedTab === "chat" && setSelectedTab(clickedTab);
    clickedTab === "setting" && setSelectedTab(clickedTab);
  };

  return (
    <div className="flex">
      <div className="sidenavbar border-r flex flex-col items-start justify-between p-4">
        <div className="space-y-4">
          <img
            src="/clients.svg"
            alt="clients"
            width={70}
            className="cursor-pointer"
            onClick={handleTabIconClick}
          />
          <img
            src="/files.svg"
            alt="files"
            width={70}
            className="cursor-pointer"
            onClick={handleTabIconClick}
          />
          <img
            src="/chat.svg"
            alt="chat"
            width={70}
            className="cursor-pointer"
            onClick={handleTabIconClick}
          />
        </div>
        <div className="space-y-4">
          <img
            src="/setting.svg"
            alt="setting"
            width={70}
            className="cursor-pointer"
            onClick={handleTabIconClick}
          />
        </div>
      </div>

      <div className="selected-tab p-4 w-[30rem] ">
        {selectedTab === "clients" && <AllClientsPanel />}
        {selectedTab === "files" && <FilesPanel />}
        {selectedTab === "chat" && <div>Chat</div>}
        {selectedTab === "setting" && <div>Setting</div>}
      </div>
    </div>
  );
};
export default SideNavBar;
