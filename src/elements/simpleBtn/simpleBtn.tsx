import cx from "classnames";

import styles from "./simpleBtn.module.scss";

interface ISimpleBtn {
    onClickHandler?: () => void,
    type: "submit" | "reset" | "button",
    children: string,
    additionalStyles?: string, 
}

export default function SimpleBtn({onClickHandler, type, children, additionalStyles}: ISimpleBtn) {
    return <button onClick={onClickHandler} className={cx(styles.simpleBtn, additionalStyles)} type={type}>{children}</button>
} 