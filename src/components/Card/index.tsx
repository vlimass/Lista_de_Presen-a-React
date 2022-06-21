import './style.css';

export type CardInfo = {
    name: string;
    time: string;
}

// É possível também usar INTERFACE
// interface CardInfo {
//     name: string;
//     time: string;
// } 


export function Card({ name, time } : CardInfo) { // É possível também passar os params como PROPS
    return(
        <div className='card'>
            <strong>{name}</strong>
            <small>{time}</small>
        </div>
    )
}