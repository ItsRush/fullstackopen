const Notification =({errorMessage, successMessage}) => {
    if(errorMessage === '' && successMessage=== ''){
        return null
    }
    const errorStyle = {
        color: 'red',
        border: '1px solid red',
        backgroundColor: 'lightgray',
        padding: '5px',
        borderRadius: '5px',
        marginBottom: '10px'
    }
    const successStyle = {
        color: 'green',
        border: '1px solid green',
        backgroundColor: 'lightgray',
        padding: '5px',
        borderRadius: '5px',
        marginBottom: '10px'
    }
    if(errorMessage){
        return(
            <div style={errorStyle}>
                {errorMessage}
            </div>
        )
    }

    if(successMessage){
        return (
            <div style={successStyle}>
                {successMessage}
            </div>
        )
    }
}

export default Notification