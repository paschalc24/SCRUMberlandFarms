import React from 'react';
import Calendar from 'react-calendar';
import '../CSSComponents/Calendar.css';

function Cal({value, setValue}) {
    // const [value, setValue] = useState(new Date());
    function onChange(nextValue) {
        setValue(nextValue);
    }

    return (
        <Calendar 
        className = "cal"
        onChange={onChange}
        value={value}
        />
    );
}

export default Cal;