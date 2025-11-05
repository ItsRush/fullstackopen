const Notification = ({errorMessage, successMessage}) => {

    if(errorMessage) {
        const errorMessageStyle = {
            color : 'red',
            backgroundColor: 'gray',
            border: '1px solid red',
            padding: '5px',
            borderRadius: '5px',
            marginTop: '5px',
            marginBottom: '5px'
        }

        return (
            <div style={errorMessageStyle}>
                {errorMessage}
            </div>
        )
    }

    if(successMessage) {
        const successMessageStyle = {
            color : 'green',
            backgroundColor: 'gray',
            border: '1px solid green',
            padding: '5px',
            borderRadius: '5px',
            marginTop: '5px',
            marginBottom: '5px'
        }

        return (
            <div style={successMessageStyle}>
                {successMessage}
            </div>
        )
    }

    return null
}

export default Notification;