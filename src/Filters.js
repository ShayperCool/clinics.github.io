import React from 'react';
import Toggle from "react-toggle";

const Filters = ({ filters, setFilterValue }) => {
    return (
        <div style={styles.wrap}>
            {Object.keys(filters)?.map((key) => {
                return (
                    <div key={key}>
                        <Toggle
                            // style={{ transform: [scaleY: 0.5] }}
                            name={key}
                            defaultChecked
                            onChange={(event) => setFilterValue({ value: event.target.checked, key })}
                        />
                        <span >{key}</span>
                    </div>
                )
            })}
        </div>
    );
};

const styles = {
    wrap: {
        backgroundColor: 'white',
    },

};

export default Filters;