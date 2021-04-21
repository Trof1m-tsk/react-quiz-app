import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-f49eb-default-rtdb.firebaseio.com/'
})