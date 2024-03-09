import useIsChairPerson from "../hook/useIsChairPerson";
import GiveRightToVote from "./GiveRightToVote"


const Header = () => {
    const isChairPerson = useIsChairPerson();
    return (
        <header className="flex justify-between md:px-10 px-4 py-6 border-b border-sky-100 items-center bg-gray-900">
            <h1 className="text-sky-100 font-sans text-xl uppercase font-bold">Ballot</h1>
            <div className="flex md:flex-row flex-col-reverse justify-center md:items-center items-end md:gap-6 gap-3">
                {isChairPerson && <GiveRightToVote />}
                <w3m-button />
            </div>

        </header>
    )
}

export default Header