import React from 'react';
import { useSelector } from 'react-redux';
import { selectData } from '../store/slice';
import Comment from './Comment';

const Comments = () => {
    const commentsData = useSelector(selectData);

    const { comments } = commentsData;
    console.log(comments);
    return (
        <div className='Comments'>
            {comments.map((c) => {
                return <Comment key={c.id} {...c} />;
            })}
        </div>
    );
};

export default Comments;
