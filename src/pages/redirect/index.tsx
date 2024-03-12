import Icon from "../../../public/success-icon.png";
import Image from "next/image";
const RedirectUrl = () => {
    return (
        <div className="flex justify-center items-center h-screen text-3xl font-semibold flex flex-col">
            <div className="mb-4"><Image src={Icon} className="w-[60px] h-[60px]" alt="" /></div>
            <h1 className="text-black">You have successfully signed up. <span onClick={() => window.location.href = "/login"} className="text-blue-500 underline cursor-pointer">Login</span></h1>
        </div>
    )
}
export default RedirectUrl;