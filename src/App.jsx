import { Container, Text } from "@radix-ui/themes";
import { configWeb3Modal } from "./connection"
import Header from "./components/Header";
import '@radix-ui/themes/styles.css';
import DelegateVote from "./components/DelegateVote";
import { useProposals } from "./hook/useProposals";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Voting from "./components/Voting";

//web3 Modal configuration function call
configWeb3Modal();

function App() {

  const { loading, data: proposal } = useProposals();

  return (
    <main className="w-full min-h-screen bg-gray-900">
      <Header />
      <Container>
        <main className="mt-6 flex lg:flex-row flex-col">
          <aside className="lg:flex-1">
            <h1 className="text-white text-3xl ml-6 md:ml-0">Candidates</h1>
            <div className=" grid lg:grid-cols-3 md:grid-cols-2 mt-6 gap-4 px-6 md:px-4">
              {
                loading ? <Text>Loading...</Text> : proposal.length !== 0 ? (
                  <Voting data={proposal} />
                ) : <Text>Could not fetch data</Text>
              }
            </div>
          </aside>

          <aside className="lg:w-[30%] p-6 flex flex-col gap-3 mb-10 md:mb-0">

            <h1 className="text-white text-2xl">Delegation</h1>
            <DelegateVote />

          </aside>
        </main>

      </Container>
      <ToastContainer />
    </main>

  )
}

export default App
