import Proposal from "./Proposal";
import useHandleVote from "../hook/useHandleVote";


const Voting = ({ data }) => {

    const handleVote = useHandleVote()

    return (
        <>
            {
                data.map((item, index) => (
                    <Proposal
                        key={index}
                        id={index}
                        name={item.name}
                        voteCount={Number(item.voteCount)}
                        handleVote={handleVote}
                    />
                ))
            }
        </>
    )
}

export default Voting