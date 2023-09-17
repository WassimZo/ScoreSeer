import BaseModal from "./baseModal";

export default function LoginModal() {
  return (
    <BaseModal>
      <div className="h-full w-full px-4 flex flex-col justify-between">
        <form action="" className="w-full flex flex-col gap-10">
          <h1 className="mt-32 text-3xl font-bold mb-10">Login</h1>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium mb-5">
              Username or E-mail address :{" "}
            </label>
            <input
              type="text"
              name="username"
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-5">
              Password :{" "}
            </label>
            <input
              type="password"
              name="password"
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black"
            />
          </div>
          <input
            type="submit"
            className="w-52 mx-auto py-4 text-center rounded-full shadow-lg bg-black/80 text-white font-bold text-lg"
            value="Login"
          />
        </form>
        <span className="mx-auto mb-4">
          No account yet ?
          <a href="/register">
            <b>
              <i> Register here.</i>
            </b>
          </a>
        </span>
      </div>
    </BaseModal>
  );
}
