import { useState } from 'react'

function ListGroup({ items }) {
    const [list, setList] = useState(items)

    const handleClick = (itemRemove) => {
        setList(list.filter(item => item !== itemRemove))
    }

    return (<ul>
        {list.map(item =>
            <li key={item} onClick={() => handleClick(item)}>{item}</li>)
        }
    </ul>);
}
export default ListGroup;