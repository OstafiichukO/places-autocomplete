import cl from "./Item.module.scss";

const Item = ( {children} ) => {
    return (
        <li className={cl["places-item"]}>{children}</li>
    )
}

export default Item
