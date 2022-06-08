import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectData } from '../store/slice';
import {MotionComment} from './Comment';
const CommentAnimation={
    hidden:{opacity:0,y:'100vh'},
    visible:i=>({
        opacity:1,
        y:0,
        transition:{
            delay:i*0.05
        }
    })
}
const Comments = () => {
    const commentsData = useSelector(selectData);

    const { comments } = commentsData;
    return (
        <div className='Comments'>
           <AnimatePresence>
           {comments.map((c,i) => {
                return <MotionComment 
                variants={CommentAnimation}
                initial='hidden'
                animate='visible'
                exit={{opacity:0,y:'-100%'}}
                custom={i}
                key={c.id}
                 {...c} />;
            })}
           </AnimatePresence>
        </div>
    );
};

export default Comments;
