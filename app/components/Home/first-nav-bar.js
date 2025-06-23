import Logo from "./logo";

const FirstNavBar = () => {
    return (
        <div className="flex justify-between items-center bg-[#9999a1] p-4 text-white">
            <Logo />
            <p>Login</p>
        </div>
    )
}
export default FirstNavBar;