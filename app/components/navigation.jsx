import Navigation from './modal/navigation'
import FirstNavBar from './Home/first-nav-bar'
import { SubNav } from './Home/sub-nav'

const NavigationBar = () => {

    return (
        <>
            <Navigation />
            {/* <TimeDate /> */}
            <div className='max-w-6xl lg:container m-auto mt-6'>
                <FirstNavBar />
            </div>
            <div className="backdrop-blur-sm sticky top-0 z-9 py-6">
                <div className="max-w-6xl lg:container m-auto sticky top-0 z-9">
                    <SubNav />
                </div>
            </div>
        </>
    )
}

export default NavigationBar