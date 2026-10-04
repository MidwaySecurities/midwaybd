import Navigation from './modal/navigation'
import FirstNavBar from './Home/first-nav-bar'
import { SubNav } from './Home/sub-nav'

const NavigationBar = () => {

    return (
        <>
            <Navigation />
            {/* <TimeDate /> */}
            <div>
                <FirstNavBar />
            </div>
            <div className="backdrop-blur-sm sticky top-0 z-9">
                <div className="lg:container lg:m-auto sticky top-0 z-9">
                    <SubNav />
                </div>
            </div>
        </>
    )
}

export default NavigationBar