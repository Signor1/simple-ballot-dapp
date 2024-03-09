import useIsChairPerson from "../hook/useIsChairPerson";
import GiveRightToVote from "./GiveRightToVote"


const Header = () => {
    const isChairPerson = useIsChairPerson();
    return (
        <header className="flex justify-between px-10 py-6 border-b border-sky-500 items-center bg-gray-900">
            <h1 className="text-sky-500 font-sans uppercase font-bold">Ballot</h1>
            <div className="flex justify-center items-center gap-6">
                {isChairPerson && <GiveRightToVote />}
                <w3m-button />
            </div>

        </header>
    )
}

export default Header