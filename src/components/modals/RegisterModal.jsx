import BaseModal from "./baseModal";

export default function RegisterModal() {
  return (
    <BaseModal>
      <div className="h-full w-full px-4">
        <h1 className="mt-20 text-3xl font-bold mb-10">Register</h1>
        <form action="" className="w-full flex flex-col gap-10">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-5">
              E-mail address :{" "}
            </label>
            <input
              type="email"
              name="email"
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-5">
              Confirm E-mail address :{" "}
            </label>
            <input
              type="email"
              name="email"
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
            value="Register"
          />
        </form>
      </div>
    </BaseModal>
  );
}
