import { useContext, useEffect } from "react";
import { useFile } from "../../context/FileContext";
import { SocketContext } from "../../context/SocketContext";
import ReactCodeMirror from "@uiw/react-codemirror";

const EditorPanel = () => {
  const { fileCode, setFileCode } = useFile();
  const { socket } = useContext(SocketContext);

  console.log(fileCode);
  const codeChangeHandler = (code: string) => {
    console.log(code);
    setFileCode(code);
    socket?.emit("code-change", { code });
  };

  useEffect(() => {
    if (socket === null) return;
    console.log(socket);

    socket.on("updated-code", ({ updatedCode }: { updatedCode: string }) => {
      console.log("updatedCode", updatedCode);
      setFileCode(updatedCode);
    });

    return () => {
      socket.off("updated-code");
    };
  }, []);

  return (
    <div className="editorpanel w-full">
      <ReactCodeMirror
        minHeight="100vh"
        maxHeight="100vh"
        theme="dark"
        onChange={codeChangeHandler}
        value={fileCode}
      />
    </div>
  );
};

export default EditorPanel;
