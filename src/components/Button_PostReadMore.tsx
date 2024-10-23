import { Link } from "react-router-dom";

import React from "react"

const Button_PostReadMore: React.FC<{id: number}> = ({ id }) =>{
    return( 
        <Link to={`/ler/${id}`} className="btn btn-primary read-more"><p>Ler mais</p></Link>
    )
}

export default Button_PostReadMore