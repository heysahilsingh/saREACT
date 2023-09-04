
interface TopRestaurantProps{
    imageId: string,
    name: string,
    averageRating: number,
    cuisines: string[],
    offerHeader: string,
    offerSubHeader: string
}

const TopRestaurant = (props: TopRestaurantProps) => {
    return (
        <div>Top restro</div>
    )
}

export default TopRestaurant