import React from 'react'
import '../Css/Post.css'


export const TextContent = ({ content, contentType }) => {
    var exportContent;
    switch (contentType) {
        case 'text':
            {
                exportContent = <div>{content}</div>;
                break;
            }
        default:
            {
                exportContent = <div></div>;
                break;
            }
    }
    return (exportContent);
}
