import { forwardRef } from "react";
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types'

// A component to forward react-router link behavior to MUI's button or link component
// https://mui.com/guides/routing/#link-behavior
export const LinkBehavior = forwardRef(function LinkBehavior(props, ref) {
    const { href, ...other } = props;

    // Map href (MUI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
})

LinkBehavior.propTypes = {
    href: PropTypes.string.isRequired
};