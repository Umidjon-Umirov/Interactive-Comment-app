import { useDispatch } from 'react-redux';
import Comments from './components/Comments';
import InputField from './components/InputField';
import {addComment} from './store/slice'
function App() {
    const dispatch=useDispatch();
    function handlerAddMessage(obj){
        dispatch(addComment(obj))
    }
    return (
        <div className='wrapper'>
            <Comments/>
            <InputField handlerAddComment={handlerAddMessage} btnText={'SEND'}/>
        </div>
    )
}

export default App;
