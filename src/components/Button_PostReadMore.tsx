import { Link } from "react-router-dom";

import React from "react"

const Button_PostReadMore: React.FC<{id: string}> = ({ id }) =>{
    return( 
        <Link to="#"className="btn btn-primary read-more transparent"><p>Ler mais</p></Link>
    )
}

export default Button_PostReadMore