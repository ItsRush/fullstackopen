import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state)

  if(!notification){
    return null
  }
  const styleError = {
    border: '1px solid red',
    color: 'red',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification ? 'block' : 'none'
  }

  const styleSuccess = {
    border: '1px solid green',
    color: 'green',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification ? 'block' : 'none'
  }

  const style = notification.type === 'success' ? styleSuccess : styleError

  return <div style={style}>{notification.message}</div>
}

export default Notification
