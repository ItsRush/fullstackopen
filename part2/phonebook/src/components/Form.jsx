const Form = ({newPerson,newName,newNumber,handleName,handleNumber}) => {

    return (
        <div>
            <form onSubmit={newPerson}>
                <div>
                    name: <input value = {newName} onChange={handleName}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumber}/>
                </div>
                 <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form;