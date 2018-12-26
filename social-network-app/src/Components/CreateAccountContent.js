import React from 'react'
import '../Css/Post.css'


export const CreateAccountContent = ({ content, contentType }) => {
    var exportContent;
    switch (contentType) {
        case 'address':
            {
                var postPrefix = 'Đã tạo tài khoản với địa chỉ ';
                exportContent = <div>
                    <div className='address-content-title'>{postPrefix}</div>
                    <div className='address-content'>{content.address}</div>
                </div>;
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
