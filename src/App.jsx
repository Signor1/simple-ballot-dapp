import { Text } from "@radix-ui/themes";
import { configWeb3Modal } from "./connection"
import Header from "./components/Header";
import '@radix-ui/themes/styles.css';
import DelegateVote from "./components/DelegateVote";
import { useProposals } from "./hook/useProposals";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Voting from "./components/Voting";
import Loader from "./components/Loader";
import useNumberOfVoters from "./hook/useNumberOfVoters";
import useNumberOfDelegates from "./hook/useNumberOfDelegates";

//web3 Modal configuration function call
configWeb3Modal();

function App() {

  const { loading, data: proposal } = useProposals();

  const numOfVoters = useNumberOfVoters()
  const numOfDelegates = useNumberOfDelegates()

  return (
    <main className="w-full min-h-screen bg-gray-900">
      <Header />
      <section className="w-full md:px-8">
        <main className="lg:mt-8 mt-8 flex flex-wrap justify-start px-6 py-8 gap-4 items-center">
          <button className="bg-sky-700 text-white text-sm py-3 px-6 rounded-md">
            Eligible Number of Voters:
            <span className="bg-sky-100 ml-2 rounded-lg text-sky-500 px-2 py-1 font-bold">
              {numOfVoters}
            </span>
          </button>
          <button className="bg-sky-700 text-white text-sm py-3 px-6 rounded-md">
            Number of Delegated Voters:
            <span className="bg-sky-100 ml-2 rounded-lg text-sky-500 px-2 py-1 font-bold">
              {numOfDelegates}
            </span>
          </button>
        </main>
        <main className=" flex lg:flex-row flex-col">
          <aside className="lg:flex-1">
            <h1 className="text-sky-100 md:text-3xl text-2xl ml-6 md:ml-0 lg:ml-4">Candidates</h1>
            <div className=" grid lg:grid-cols-2 md:grid-cols-2 mt-6 gap-4 px-6 md:px-4">
              {
                loading ? <Loader /> : proposal.length !== 0 ? (
                  <Voting data={proposal} />
                ) : <Text>Could not fetch data</Text>
              }
            </div>
          </aside>

          <aside className="lg:w-[35%] p-6 flex flex-col gap-3 mb-10 md:mb-0">

            <h1 className="text-white text-2xl">Delegation</h1>
            <DelegateVote />

          </aside>
        </main>

      </section>
      <ToastContainer />
    </main>

  )
}

export default App
