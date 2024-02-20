import CreateCarForm from "./CreateCarForm";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className=" w-[380px] h-full bg-gray-300 space-y-10 px-6 py-12">
        <h1 className="text-2xl text-gray-900 font-bold">Create A Car</h1>
        <CreateCarForm />
      </aside>
      <div className="flex-1 flex justify-center py-24 self-start">
        {children}
      </div>
    </div>
  );
}
