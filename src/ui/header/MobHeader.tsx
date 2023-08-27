import useUserLocation from "../../hooks/useUserLocation";

const MobHeader = () => {

    const [userLocation, setUserLocation] = useUserLocation(); // Destructure setUserLocation function

    const handleLocationUpdate = () => {
        const newLocation = { place_id: "789012" }; // Replace with your desired location
        setUserLocation(newLocation); // Call setUserLocation to update the location
    };

    return (
        <div>
            <button onClick={handleLocationUpdate}>Update Location: {userLocation?.place_id}</button>
        </div>
    );
}

export default MobHeader