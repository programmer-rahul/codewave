import { useContext, useEffect } from "react";
import { useFile } from "../../context/FileContext";
import { SocketContext } from "../../context/SocketContext";
import ReactCodeMirror from "@uiw/react-codemirror";

const EditorPanel = () => {
  const { fileCode, setFileCode } = useFile();
  const { socket } = useContext(SocketContext);

  const codeChangeHandler = (code: string) => {
    console.log(code);
    setFileCode(code);
    socket?.emit("code-change", { code });
  };

  useEffect(() => {
    if (socket === null) return;

    socket.on("updated-code", ({ updatedCode }: { updatedCode: string }) => {
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
