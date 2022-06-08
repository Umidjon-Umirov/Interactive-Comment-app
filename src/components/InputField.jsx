import { motion } from 'framer-motion';
import React, { useState, forwardRef } from 'react';
const InputField = forwardRef(
    ({ btnText, handlerAddComment, id, replyingTo }, ref) => {
        const [comment, setComment] = useState('');
        function handlerComment(obj) {
            handlerAddComment(obj);
        }
        return (
            <div ref={ref} className='InputField'>
                <div className='inputField-body'>
                    <img
                        className='inputfield-img avatar'
                        src={
                            'https://e7.pngegg.com/pngimages/556/742/png-clipart-avatar-youtube-8-ball-pool-user-avatar-child-face.png'
                        }
                        alt=''
                    />
                    <form className='form'>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            cols={30}
                            rows={5}
                            placeholder='Add a comment...'
                        ></textarea>
                        <button
                            disabled={comment.length === 0}
                            className='submit-btn'
                            onClick={(e) => {
                                e.preventDefault();
                                handlerComment({ comment, id, replyingTo });
                                setComment('');
                            }}
                            type='submit'
                        >
                            {btnText}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
);
export const MotionInput = motion(InputField);
export default InputField;
