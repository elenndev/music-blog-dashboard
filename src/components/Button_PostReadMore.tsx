import { Link } from "react-router-dom";

import React from "react"

const Button_PostReadMore: React.FC<{id: string}> = ({ id }) =>{
    return( 
        <Link aria-label="Ler mais" to={`/ler/${id}`} className="btn btn-primary read-more transparent"><p>Ler mais</p></Link>
    )
}

export default Button_PostReadMore