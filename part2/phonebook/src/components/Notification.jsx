const Notification = ({errorMessage, successMessage}) => {
    if(errorMessage){
        const errorMsgStyle = {
            color : 'red',
            backgroundColor: 'gray',
            border: '1px solid red',
            padding: '5px',
            borderRadius: '5px',
            marginTop: '5px',
            marginBottom: '5px'
        }
        return (
            <div style= {errorMsgStyle}>
                {errorMessage}
            </div>
        )
    }

    if(successMessage){
        const successMsgStyle = {
            color : 'green',
            backgroundColor: 'gray',
            border: '1px solid green',
            padding: '5px',
            borderRadius: '5px',
            marginTop: '5px',
            marginBottom: '5px'
        }
        return (
            <div style={successMsgStyle}>
                {successMessage}
            </div>
        )
    }

    return null;
}

export default Notification;