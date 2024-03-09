
import { LuLoader2 } from "react-icons/lu";

const Loader = () => {
    return (
        <div className="w-full col-span-3 py-12 flex justify-center">
            <h1 className="text-sky-100 flex items-center text-center text-2xl font-medium">
                <LuLoader2 className="w-5 h-5 mr-2 animate-spin text-sky-100" />
                Loading...
            </h1>
        </div>

    )
}

export default Loader