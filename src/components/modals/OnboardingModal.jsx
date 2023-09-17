import BaseModal from "./baseModal";

export default function OnboardingModal() {
  return (
    <BaseModal>
      <div className="h-full w-full px-4 flex flex-col">
        <h1 className="mt-32 text-3xl font-bold mb-10">Onboarding</h1>
        <form action="" className="w-full flex flex-col gap-10">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium mb-5">
              Choose a username :{" "}
            </label>
            <input
              type="text"
              name="username"
              className="bg-gray-300 rounded-xl pl-4 py-4 text-lg text-black"
            />
          </div>
        </form>
        <h1 className="text-2xl font-bold mt-10 mb-6">Concept </h1>
        <p className="text-sm px-2">
          Every week you have access to all matchs from the Premier League,
          Bundesliga, La Liga, Serie A, Ligue 1 and Champions League. You will
          be able to try to predict the final score of each game, and then get
          points with the following rules :
          <br />
          <br />
          <ul>
            <li>
              <b>Find the exact score </b>=&gt; + 5pts.
            </li>
            <li>
              <b>Find the winner but not the good score </b>=&gt; + 3pts.
            </li>
            <li>
              <b>Find nothing </b>=&gt; + 0pts.
            </li>
          </ul>
          <br />
          Take fun and good luck !
        </p>

        <button className="mx-auto rounded-full bg-black/80 py-4 px-6 shadow-lg text-white font-bold mt-10 text-lg">
          Start !
        </button>
      </div>
    </BaseModal>
  );
}
