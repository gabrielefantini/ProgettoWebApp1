import React from 'react';

export default function List({listElements,...rest}){
    return(
        <>
            {listElements.map((element, index) => (
                <ListElement key={index} {...element}/>
            ))}
        </>
    );
}

function ListElement({brand, name, coast, ...rest}){
    return(
        {brand},{name}, {coast}
    );
}