import useSocket from "../hooks/useSocket";
import CodePage from "../pages/CodePage";

const CodePageLayout = () => {
  const { connectionStatus } = useSocket();

  return !connectionStatus ? <div>Loading...</div> : <CodePage />;
};
export default CodePageLayout;
