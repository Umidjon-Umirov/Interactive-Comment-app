import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const commentsData = {
    currentUser: {
        image: {
            png: 'https://e7.pngegg.com/pngimages/556/742/png-clipart-avatar-youtube-8-ball-pool-user-avatar-child-face.png',
            webp: './images/avatars/image-juliusomo.webp',
        },
        username: 'juliusomo',
    },
    comments: [
        {
            id: 1,
            content:
                "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            createdAt: '1 month ago',
            score: 12,
            user: {
                image: {
                    png: 'https://st4.depositphotos.com/1007566/27254/v/1600/depositphotos_272543992-stock-illustration-young-man-avatar-character.jpg',
                    webp: './images/avatars/image-amyrobson.webp',
                },
                username: 'amyrobson',
            },
            replies: [],
        },
        {
            id: 2,
            content:
                "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            createdAt: '2 weeks ago',
            score: 5,
            user: {
                image: {
                    png: 'https://thumbs.dreamstime.com/b/%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B0-%D0%BF%D0%BE%D0%B6%D0%B8%D0%BB%D0%BE%D0%B3%D0%BE-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D1%8B-%D0%B6%D0%B5%D0%BD%D1%89%D0%B8%D0%BD%D1%8B-%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%B0%D1%8F-%D1%81%D1%82%D0%B8%D0%BB%D1%8F-208231777.jpg',
                    webp: './images/avatars/image-maxblagun.webp',
                },
                username: 'maxblagun',
            },
            replies: [
                {
                    id: 3,
                    content:
                        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    createdAt: '1 week ago',
                    score: 4,
                    replyingTo: 'maxblagun',
                    user: {
                        image: {
                            png: 'https://st4.depositphotos.com/1007566/26895/v/1600/depositphotos_268956986-stock-illustration-businessman-avatar-character-icon.jpg',
                            webp: './images/avatars/image-ramsesmiron.webp',
                        },
                        username: 'ramsesmiron',
                    },
                },
                {
                    id: 4,
                    content:
                        "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    createdAt: '2 days ago',
                    score: 2,
                    replyingTo: 'ramsesmiron',
                    user: {
                        image: {
                            png: 'https://e7.pngegg.com/pngimages/556/742/png-clipart-avatar-youtube-8-ball-pool-user-avatar-child-face.png',
                            webp: './images/avatars/image-juliusomo.webp',
                        },
                        username: 'juliusomo',
                    },
                },
            ],
        },
    ],
};
export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        commentsData,
    },

    reducers: {
        addComment: {
            reducer(state, action) {
                state.commentsData.comments.push(action.payload);
            },
            prepare({ comment }) {
                return {
                    payload: {
                        id: nanoid(),
                        createdAt: 'now',
                        score: 0,
                        user: {
                            image: {
                                png: 'https://e7.pngegg.com/pngimages/556/742/png-clipart-avatar-youtube-8-ball-pool-user-avatar-child-face.png',
                            },
                            username: 'juliusomo',
                        },
                        content: comment,
                    },
                };
            },
        },
        removeComment: (state, action) => {
            state.commentsData.comments = state.commentsData.comments.filter(
                (c) => c.id !== action.payload.id
            );
        },
        editComment: (state, action) => {
            state.commentsData.comments.map((c) => {
                if (c.id === action.payload.id) c.content = action.payload.text;
                return c;
            });
        },
        removeReplyComment: (state, action) => {
            const { replyId, CommentId } = action.payload;
            state.commentsData.comments = state.commentsData.comments.map(
                (c) => {
                    if (c.id === CommentId)
                        c.replies = c.replies.filter((r) => r.id !== replyId);
                    return c;
                }
            );
        },
        editReplyComment: (state, action) => {
            const { text, CommentId, replyId } = action.payload;
            state.commentsData.comments.map((c) => {
                if (c.id === CommentId)
                    c.replies.map((r) => {
                        if (r.id === replyId) r.content = text;
                        return r;
                    });
                return c;
            });
        },
        addReplyComment: {
            reducer(state, action) {
                state.commentsData.comments.map((c) => {
                    if (c.id === action.payload.CommentId) {
                        if (!c.replies) {
                            c.replies = [];
                            c.replies.push(action.payload);
                        } else {
                            c.replies.push(action.payload);
                        }
                    }
                    return c;
                });
            },
            prepare({ comment, id, replyingTo }) {
                return {
                    payload: {
                        replyingTo,
                        CommentId: id,
                        id: nanoid(),
                        createdAt: 'now',
                        score: 0,
                        user: {
                            image: {
                                png: 'https://e7.pngegg.com/pngimages/556/742/png-clipart-avatar-youtube-8-ball-pool-user-avatar-child-face.png',
                            },
                            username: 'juliusomo',
                        },
                        content: comment,
                    },
                };
            },
        },
        addLikes: (state, action) => {
            if (action.payload.replyId) {
                state.commentsData.comments = state.commentsData.comments.map(
                    (c) => {
                        if (c.id === action.payload.commentId)
                            c.replies.map((r) => {
                                if (r.id === action.payload.replyId) r.score++;
                                return r;
                            });
                        return c;
                    }
                );
            } else {
                state.commentsData.comments = state.commentsData.comments.map(
                    (c) => {
                        if (c.id === action.payload.commentId) c.score++;
                        return c;
                    }
                );
            }
        },
        removeLikes: (state, action) => {
            if (action.payload.replyId) {
                state.commentsData.comments = state.commentsData.comments.map(
                    (c) => {
                        if (c.id === action.payload.commentId)
                            c.replies.map((r) => {
                                if (r.id === action.payload.replyId) r.score--;
                                return r;
                            });
                        return c;
                    }
                );
            } else {
                state.commentsData.comments = state.commentsData.comments.map(
                    (c) => {
                        if (c.id === action.payload.commentId) c.score--;
                        return c;
                    }
                );
            }
        },
    },
});
export const {
    addComment,
    removeComment,
    editComment,
    removeReplyComment,
    editReplyComment,
    addReplyComment,
    addLikes,
    removeLikes,
} = commentSlice.actions;
export const selectStatus = (state) => state.data.status;
export const selectCurrentUser = (state) =>
    state.data.commentsData.currentUser.username;
export const selectData = (state) => state.data.commentsData;
export default commentSlice.reducer;
