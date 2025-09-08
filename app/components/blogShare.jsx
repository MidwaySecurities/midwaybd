'use client';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

function BlogPost({ postUrl, postTitle }) {
    return (
        <div>
            {/* Blog post content */}
            <div className='my-4 bg-qtp_btn_bg_color text-white py-2 w-[200px] text-center rounded-lg'>
                <FacebookShareButton url={postUrl} quote={postTitle}>
                    Share on Facebook
                </FacebookShareButton>
            </div>
            {/* <div className='my-4 bg-qtp_btn_bg_color text-white py-2 w-[200px] text-center rounded-lg'>
                <TwitterShareButton url={postUrl} title={postTitle}>
                    Share on Twitter
                </TwitterShareButton>
            </div> */}
        </div>
    );
}
export default BlogPost;