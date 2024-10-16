import DefaultFunction from "../../../components/Type_FunctionDefault"


const Button_CancelPostEdit: React.FC<{functionExitEdit: DefaultFunction}> = ({functionExitEdit}) => {
    return(
        <button type="button" className="btn btn-danger" onClick={() => functionExitEdit()}>Cancelar edição</button>
    )
}

export default Button_CancelPostEdit