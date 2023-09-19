import BaseModal from "./baseModal";
import facebookIcon from "../../assets/facebook.svg";
import googleIcon from "../../assets/google.svg";

export default function LoginModal() {
  return (
    <BaseModal>
      <div className="h-full w-full px-4 flex flex-col justify-between">
        <form action="" className="w-full flex flex-col gap-4">
          <h1 className="mt-20 text-3xl font-bold mb-10">Login</h1>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium mb-5">
              E-mail address :{" "}
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
          <span className="font-extralight text-black/50 hover:text-black text-sm">
            <a href="/register">
              <b>Reset your password.</b>
            </a>
          </span>
          <input
            type="submit"
            className="w-52 mx-auto py-4 text-center rounded-full shadow-xl bg-black/80 text-white font-bold text-lg"
            value="Login"
          />
        </form>
        <section className="w-full flex flex-col gap-6 items-center px-10">
          <button className="bg-slate-100 w-full py-3 px-4 font-semibold text-black/75 rounded-xl text-lg flex justify-between shadow-xl">
            <span>Login with Google</span>
            <img src={googleIcon} alt="facebook-icon" className="w-7 h-7" />
          </button>
          <button className="bg-blue-500 w-full py-3 px-4 font-semibold text-white rounded-xl text-lg flex justify-between shadow-xl">
            <span>Login with Facebook</span>
            <img src={facebookIcon} alt="facebook-icon" className="w-7 h-7" />
          </button>
        </section>
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
