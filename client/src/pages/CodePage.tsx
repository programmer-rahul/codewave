import SideNavBar from "../components/navbar/NavBar";
import EditorPanel from "../components/editor/EditorPanel";

const CodePage = () => {
  return (
    <main className="h-screen bg-slate-900">
      <div className="flex h-full">
        <SideNavBar />
        <EditorPanel />
      </div>
    </main>
  );
};
export default CodePage;
