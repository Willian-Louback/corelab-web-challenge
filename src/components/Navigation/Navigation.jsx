import React, { useState, useEffect } from "react";
import "./Navigation.css";
import logoSvg from "../../assets/svg/logo.svg";
import filterSvg from "../../assets/svg/filter.svg";
import filterFillSvg from "../../assets/svg/filter-fill.svg";
import searchSvg from "../../assets/svg/search.svg";
import closeSvg from "../../assets/svg/close.svg";
import { colorsOption } from "../../assets/js/colorsChoice";
import PropTypes from "prop-types";

const Nav = ({ setfilterTask, setfilterTaskColor }) => {
    const [ inputSearch, setInputSearch ] = useState(null);
    const [ filterImg, setFilterImg ] = useState([filterSvg, false]);
    const [ colorValue, setColorValue ] = useState("#FFF");

    const handleInput = (event) => {
        setInputSearch(event.target.value.toLowerCase());
    };

    const handleClick = () => {
        setfilterTask(inputSearch);
    };

    const handleFilterClick = () => {
        if(filterImg[1]) {
            setFilterImg([filterSvg, false]);
        } else {
            setFilterImg([filterFillSvg, true]);
        }
    };

    const handleCancelFilterClick = () => {
        setFilterImg([filterSvg, false]);
        setfilterTaskColor(null);
        setColorValue("#FFF");
    };

    const handleFilterColorClick = (value) => {
        setFilterImg([filterSvg, false]);
        setfilterTaskColor(value);
        setColorValue(value);
    };

    useEffect(() => {
        setfilterTask(inputSearch);
    }, [ inputSearch ]);

    return (
        <nav className="navBar">
            <div className="container-nav-left">
                <img src={ logoSvg } alt="imgNotes" className="logoSvg" />
                <h1 className="titleNav">CoreNotes</h1>
                <div className="inputArea">
                    <input type="text" className="searchTask" placeholder="Pesquisar notas" onInput={ handleInput } />
                    <img src={ searchSvg } alt="searchImg" className="searchImg" onClick={ handleClick } />
                </div>
            </div>
            <div className="container-nav-right">
                <div className="container-filter-colors">
                    <img src={ filterImg[0] } alt="menuImg" className="menuFilter" onClick={ handleFilterClick } style={{ borderRadius: "3px", backgroundColor: colorValue, border: "1px solid #51646E" }} />
                    {
                        filterImg[1] ? (
                            <div className="filterColors">
                                {
                                    colorsOption.map((value, index) => (
                                        <div className="colorsNav" key={ `colorsNav${index}` } style={{ backgroundColor: value }} onClick={ () => handleFilterColorClick(value) } ></div>
                                    ))
                                }
                                <div className="colorsNav" style={{ backgroundColor: "#FFF", border: "1px solid #51646E" }} onClick={ () => handleFilterColorClick("#FFF") } ></div>
                                <div className="colorsNav closeColors" onClick={ handleCancelFilterClick }>
                                    <img className="cancelFilter" alt="cancelFilter" src={ closeSvg } ></img>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </nav>
    );
};


Nav.propTypes = {
    setfilterTask: PropTypes.func.isRequired,
    setfilterTaskColor: PropTypes.func.isRequired
};

export default Nav;