import React, { useState, forwardRef } from 'react';
import plus from '../images/icon-plus.svg';
import minus from '../images/icon-minus.svg';
import reply from '../images/icon-reply.svg';
import deleteIcon from '../images/icon-delete.svg';
import editIcon from '../images/icon-edit.svg';
import Replies from './Replies';
import { useDispatch, useSelector } from 'react-redux';
import {
    addComment,
    addReplyComment,
    editComment,
    removeComment,
    removeLikes,
    addLikes,
    selectCurrentUser,
} from '../store/slice';
import  { MotionInput } from './InputField';
import { AnimatePresence, motion } from 'framer-motion';
const likesBtns = { p: true, m: true };
const Comment = forwardRef(
    ({ score, user, id, content, createdAt, replies }, ref) => {
        const dispatch = useDispatch();
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
        function handlerAddReply(obj) {
            dispatch(addReplyComment(obj));
            setReplyInputState(false);
        }
        const currentUser = useSelector(selectCurrentUser);
        const [editContent, setEditContent] = useState(content);
        const [replyInputState, setReplyInputState] = useState(false);

        const [editState, setEditState] = useState(false);
        const repliesContent =
            replies && replies.length
                ? replies.map((r) => (
                      <Replies CommentId={id} key={r.id} {...r} />
                  ))
                : null;
        const btnContent =
            user.username === currentUser ? (
                <div className='user-btn'>
                    <button
                        onClick={(e) => dispatch(removeComment({ id }))}
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
            ) : (
                <button
                    onClick={(e) => setReplyInputState(true)}
                    className='reply'
                >
                    <img src={reply} alt='' />
                    <span className='reply-text'>Reply</span>
                </button>
            );
        return (
            <div ref={ref} className='comment'>
                <div className='comment-body'>
                    <div className='comment-relations'>
                        <button
                            onClick={(e) => dispatchAddLikes({ commentId: id })}
                            style={{ background: 'none', border: 'none' }}
                        >
                            <img className='plus' src={plus} alt='' />
                        </button>
                        <span className='comment-likescount'>{score}</span>
                        <button
                            style={{ background: 'none', border: 'none' }}
                            onClick={(e) =>
                                dispatchRemoveLikes({ commentId: id })
                            }
                        >
                            <img className='minus' src={minus} alt='' />
                        </button>
                    </div>
                    <div className='comment-main'>
                        <div className='comment-header'>
                            <img className='avatar' src={user.image.png} />
                            {console.log(user.image.png)}
                            <p className='name'>
                                {user.username}{' '}
                                {user.username === currentUser ? (
                                    <span className='user-you'>you</span>
                                ) : null}
                            </p>
                            <p className='time'>{createdAt}</p>
                            {btnContent}
                        </div>
                        <div className='comment-content'>
                            {editState ? (
                                <div
                                    className='edit-content'
                                    style={{ width: '100%' }}
                                >
                                    <textarea
                                        onChange={(e) =>
                                            setEditContent(e.target.value)
                                        }
                                        className='editTextarea'
                                        name=''
                                        id=''
                                        value={editContent}
                                    ></textarea>
                                    <button
                                        onClick={(e) => {
                                            setEditState(false);
                                            dispatch(
                                                editComment({
                                                    id,
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
                                <p className='content'>{content}</p>
                            )}
                        </div>
                    </div>
                </div>

                {
                    <AnimatePresence>
                        {replyInputState && (
                            <MotionInput
                                key={'reply'}
                                initial={{ y: '100%',opacity:0  }}
                                animate={{ y: 0 ,opacity:1}}
                                exit={{opacity:0 }}
                                id={id}
                                handlerAddComment={handlerAddReply}
                                btnText={'Reply'}
                                replyingTo={user.username}
                            />
                        )}
                    </AnimatePresence>
                }
                {repliesContent}
            </div>
        );
    }
);

export default Comment;
export const MotionComment = motion(Comment);
