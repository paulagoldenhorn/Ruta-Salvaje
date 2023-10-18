/* eslint-disable react/prop-types */
import * as Icons from "react-icons/tb";
import * as Icons2 from "react-icons/gi";
import * as Icons3 from "react-icons/pi";
import * as Icons4 from "react-icons/ai";
import * as Icons5 from "react-icons/bi";
import * as Icons6 from "react-icons/md";
import Styles from "./AdminRegisterProducts.module.css";

export const DynamicIcon = ({ name }) => {
    if (name?.startsWith("Tb")) {
        const IconComponent = Icons[name];

        if (!IconComponent) {
            return <Icons6.MdDone className={Styles.iconService} />;
        }

        return <IconComponent className={Styles.iconService} />;
    }

    if (name?.startsWith("Gi")) {
        const IconComponent = Icons2[name];

        if (!IconComponent) {
            return <Icons6.MdDone className={Styles.iconService} />;
        }

        return <IconComponent className={Styles.iconService} />;
    }

    if (name?.startsWith("Pi")) {
        const IconComponent = Icons3[name];

        if (!IconComponent) {
            return <Icons6.MdDone className={Styles.iconService} />;
        }

        return <IconComponent className={Styles.iconService} />;
    }

    if (name?.startsWith("Ai")) {
        const IconComponent = Icons4[name];

        if (!IconComponent) {
            return <Icons6.MdDone className={Styles.iconService} />;
        }

        return <IconComponent className={Styles.iconService} />;
    }

    if (name?.startsWith("Bi")) {
        const IconComponent = Icons5[name];

        if (!IconComponent) {
            return <Icons6.MdDone className={Styles.iconService} />;
        }

        return <IconComponent className={Styles.iconService} />;
    }

    if (name?.startsWith("Md")) {
        const IconComponent = Icons6[name];

        if (!IconComponent) {
            return <Icons6.MdDone className={Styles.iconService} />;
        }

        return <IconComponent className={Styles.iconService} />;
    }

    else {
        const IconComponent = Icons2["GiCheckMark"]
        return <IconComponent className="GiCheckMark" />
    }
};