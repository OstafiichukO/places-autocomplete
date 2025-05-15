import Item from "./Item";
import cl from "./List.module.scss";

const List = ({ addressList }) => {
    return (
        <>
            <h4 style={{ 'margin': '16px 0 16px 10px', }}>Places names (history):</h4>
            <ul className={cl["places-list"]}>
                {addressList.map((address, index) => (
                    <Item key={index}>{address}</Item>
                ))}
            </ul>
        </>

    )
}

export default List
