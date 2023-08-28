import LocationSearch from "../../components/LocationSearch/LocationSearch"

const Home = () => {

    return (
        <>
            <div>Home Page</div>
            <LocationSearch screen="mob" />
            <LocationSearch screen="desk" />
        </>
    )
}

export default Home