import React from 'react';

const ButtonContainer = ({children, className = ''}) => {
    return(
        <div className={"btn-container " + className} style={{position:'relative', display: 'flex', justifyContent:'center', alignItems:'center'}}>
            {children}
        </div>
    );
}

export default ButtonContainer;