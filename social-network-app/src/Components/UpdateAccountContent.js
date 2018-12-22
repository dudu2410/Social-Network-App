import React from 'react'
import '../Css/Post.css'


export const UpdateAccountContent = ({ content, contentType }) => {
    var exportContent;
    switch (contentType) {
        case 'name':
            {
                var updatePrefix = 'Đã cập nhật tên hiển thị là ';
                exportContent = (<div>{updatePrefix}<span className='user-name-content'>{content}</span></div>);
                break;
            }
        case 'picture':
            {
                var updatePrefix = 'Đã cập nhật ảnh đại diện ';
                console.log(content);
                exportContent = (<div>
                    <div>{updatePrefix}</div>
                    <div><img src={'data:image/png;base64,' + content} alt='avatar' /></div>
                </div>);
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
