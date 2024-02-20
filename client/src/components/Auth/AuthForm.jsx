export default function AuthForm({
  title,
  buttonText,
  handleSubmit,
  children,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-gray-300 shadow-sm rounded p-6 max-w-md w-full"
    >
      <h1 className="text-4xl text-center">BVT Demo</h1>
      <h2 className="text-xl text-center">{title}</h2>
      <div className="space-y-4 mb-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username:</label>
          <input
            className="rounded py-2 px-1"
            name="username"
            type="text"
            id="username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input
            className="rounded py-2 px-1"
            name="password"
            type="password"
            id="password"
          />
        </div>
        <button className="w-full h-12 bg-gray-700 text-white">
          {buttonText}
        </button>
      </div>
      {children}
    </form>
  );
}
