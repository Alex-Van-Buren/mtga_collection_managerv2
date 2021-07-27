import React, {useState, useEffect } from 'react';

import '../../css/HeaderDropdown.css'

function HeaderDropdown(props) {
    // State for if dropdown is open or closed
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    let titleClass = "dd-title " + props.titleClass;
    if (open) {
        titleClass +=" active";
    }

    // Close Dropdown on all clicks outside of dropdown
    useEffect(() => {
        function closeOnOutsideClick() {
            setOpen(false);
        }
        document.body.addEventListener('click', closeOnOutsideClick);

        return () => {
            document.body.removeEventListener('click', closeOnOutsideClick);
        }
    }, []);

    let searchDropdown;

    if (props.searchable) {
        searchDropdown = 
            <input className="dd-item-search" type="text" name="Search dropdown" onClick={(e) => e.stopPropagation()} 
            onChange= {(e) => setSearchText(e.target.value)} value={searchText} autoComplete="off"
            placeholder="Search Sets..."
            />
    }

    let innerItems = props.children;

    if (searchText.length > 0) {
        innerItems = innerItems.filter( child => {
            const setText = child.props.children.toLowerCase();           
            return setText.includes(searchText.toLowerCase()) || child.props.setid === searchText.toLowerCase();
        });
    }
    // Define all the items within the dropdown from props.children
    const items = (
    <div className={open ? `dd-items ${props.itemsClass}` : `dd-items hidden ${props.itemsClass}`} >
        {searchDropdown}
        {innerItems}
    </div>)

    function keyboardToggle(event) {
        if (event.key === "Enter") {
            setOpen(!open);
            setSearchText("");
        }
    }

    return (
        <div className="headerDropdown heading">        
            <div className={titleClass} 
            onClick={(e) => {e.stopPropagation(); setOpen(!open); setSearchText("")}} 
            tabIndex='0' role="button" aria-expanded={open}
            onKeyDown={(e)=> keyboardToggle(e)}>
                <span>{props.title} &nbsp;  <i className={open ? "icon chevron up" : "icon chevron down"}></i> </span>               
            </div>
            {items}
        </div>
    )
}

export default HeaderDropdown;
