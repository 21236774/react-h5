import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Home from '../views/home'
import Login from '../views/login'
import User from '../views/user'

function Todo() {
  return <div>待办</div>
}

function Message() {
  return <div>消息</div>
}

export default function RouteDom () {
  return (
    <Routes>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/todo' element={<Todo />}></Route>
      <Route path='/message' element={<Message />}></Route>
      <Route path='/me' element={<User />}></Route>
      <Route path="*" element={<Navigate to="/home" replace={true} />} />
    </Routes>
  )
}
