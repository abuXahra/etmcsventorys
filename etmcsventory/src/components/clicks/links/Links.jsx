import React from 'react';
import { LinkWrapper } from './Links.style';

const Links = ({ linkColor, linkText, linkUrl, linkDisplay, linkPd, fs }) => {

    return (
        <LinkWrapper fs={fs} linkDisplay={linkDisplay} to={linkUrl} linkColor={linkColor} linkPd={linkPd}>
            {linkText}
        </LinkWrapper>
    )
}

export default Links;
