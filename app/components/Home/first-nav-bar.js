import Logo from "./logo";

const FirstNavBar = () => {
    return (
        <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
            <Logo />
            <p>Login</p>
        </div>
    )
}
export default FirstNavBar;