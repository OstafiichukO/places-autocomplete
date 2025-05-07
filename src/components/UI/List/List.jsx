import Item from "./Item";
import cl from "./List.module.scss";

const List = ({ addressList }) => {
    return (
        <>
            <ul className={cl["places-list"]}>
                {addressList.map((address, index) => (
                    <Item key={index}>{address}</Item>
                ))}
            </ul>
        </>

    )
}

export default List
