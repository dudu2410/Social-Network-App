import React from 'react'
import '../Css/Post.css'


export const UpdateAccountContent = ({ content, contentType }) => {
    var exportContent;
    var updatePrefix;
    console.log(contentType);
    switch (contentType) {
        case 'name':
            {
                updatePrefix = 'Đã cập nhật tên hiển thị là ';
                exportContent = (<div>{updatePrefix}<span className='user-name-content'>{content}</span></div>);
                break;
            }
        case 'avatar':
        case 'picture':
            {
                updatePrefix = 'Đã cập nhật ảnh đại diện ';
                var imgPrefix = content.includes('data') ? '' : 'data:image/jpeg;base64,';
                exportContent = (<div>
                    <div>{updatePrefix}</div>
                    <div className='post-img-container'><img src={imgPrefix + content} width='72px' heigth='72' alt='' /></div>
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
