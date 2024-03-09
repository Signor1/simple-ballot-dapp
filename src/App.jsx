import { Container, Text } from "@radix-ui/themes";
import { configWeb3Modal } from "./connection"
import Header from "./components/Header";
import '@radix-ui/themes/styles.css';
import Proposal from "./components/Proposal";
import DelegateVote from "./components/DelegateVote";
import { useProposals } from "./hook/useProposals";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

//web3 Modal configuration function call
configWeb3Modal();

function App() {

  const { loading, data: proposal } = useProposals();

  return (
    <main className="w-full min-h-screen bg-gray-900">
      <Header />
      <Container>
        <main className="mt-6 flex">
          <aside className="flex-1">
            <h1 className="text-white text-3xl">Candidates</h1>
            <div className="flex mt-6 gap-4 flex-wrap">
              {
                loading ? <Text>Loading...</Text> : proposal.length !== 0 ? (
                  proposal.map((item, index) => (
                    <Proposal key={index} id={index} name={item.name} voteCount={Number(item.voteCount)} handleVote={() => console.log(item.name)} />
                  ))
                ) : <Text>Could not fetch data</Text>
              }
            </div>
          </aside>

          <aside className="w-[30%] p-6 flex flex-col gap-3">

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
