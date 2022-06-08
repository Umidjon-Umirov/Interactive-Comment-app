import React, { forwardRef, useState } from 'react';
import plus from '../images/icon-plus.svg';
import minus from '../images/icon-minus.svg';
import deleteIcon from '../images/icon-delete.svg';
import editIcon from '../images/icon-edit.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    editReplyComment,
    removeReplyComment,
    selectCurrentUser,
    addLikes,
    removeLikes,
} from '../store/slice';
import { motion } from 'framer-motion';
const likesBtns = { p: true, m: true };

const Replies = forwardRef(({
    score,
    CommentId,
    user,
    createdAt,
    content,
    replyingTo,
    id,
},ref) => {
    function dispatchAddLikes(obj) {
        if (likesBtns.p) {
            dispatch(addLikes(obj));
            likesBtns.p = false;
            console.log(likesBtns.p);
        } else if (!likesBtns.m) likesBtns.m = true;
    }
    function dispatchRemoveLikes(obj) {
        if (likesBtns.m) {
            dispatch(removeLikes(obj));
            likesBtns.m = false;
        } else if (!likesBtns.p) likesBtns.p = true;
    }
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [editContent, setEditContent] = useState(content);
    const [editState, setEditState] = useState(false);
    function deleteReply(obj) {
        dispatch(removeReplyComment(obj));
    }
    const btnContent =
        user.username === currentUser ? (
            <div className='user-btn'>
                <button
                    onClick={(e) => deleteReply({ CommentId, replyId: id })}
                    className='delete-btn'
                >
                    <img src={deleteIcon} alt='' />
                    <span className='delete-text'>Delete</span>
                </button>
                <button
                    onClick={(e) => setEditState(true)}
                    className='edit-btn'
                >
                    <img src={editIcon} alt='' />
                    <span className='edit-text'>Edit</span>
                </button>
            </div>
        ) : null
    return (
        <div ref={ref} className='replies comment-body'>
            <div className='comment-relations'>
                <button
                    style={{ background: 'none', border: 'none' }}
                    onClick={(e) =>
                        dispatchAddLikes({ commentId: CommentId, replyId: id })
                    }
                >
                    <img className='plus' src={plus} alt='' />
                </button>
                <span className='comment-likescount'>{score}</span>
                <button
                    style={{ background: 'none', border: 'none' }}
                    onClick={(e) =>
                        dispatchRemoveLikes({
                            commentId: CommentId,
                            replyId: id,
                        })
                    }
                >
                    <img className='minus' src={minus} alt='' />
                </button>
            </div>
            <div className='comment-main'>
                <div className='comment-header'>
                    <img className='avatar' src={user.image.png} />
                    <p className='name'>{user.username}</p>
                    <p className='time'>{createdAt}</p>
                    {btnContent}
                </div>
                <div className='comment-content'>
                    {editState ? (
                        <div style={{ width: '100%' }}>
                            <textarea
                                onChange={(e) => setEditContent(e.target.value)}
                                className='editTextarea'
                                name=''
                                id=''
                                value={editContent}
                            ></textarea>
                            <button
                                onClick={(e) => {
                                    setEditState(false);
                                    dispatch(
                                        editReplyComment({
                                            CommentId,
                                            replyId: id,
                                            text: editContent,
                                        })
                                    );
                                }}
                                className='update-btn'
                            >
                                UPDATE
                            </button>
                        </div>
                    ) : (
                        <p className='content'>
                            <span style={{ fontWeight: '700' }}>
                                @{replyingTo}
                            </span>{' '}
                            {content}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
})

export default Replies;
export const MotionReplies=motion(Replies)