import DefaultFunction from "../../../components/Interface_Function"


const Button_CancelPostEdit: React.FC<{cancelEdit: DefaultFunction}> = ({cancelEdit}) => {
    return(
        <button type="button" className="btn btn-danger" onClick={cancelEdit}>Cancelar edição</button>
    )
}

export default Button_CancelPostEdit