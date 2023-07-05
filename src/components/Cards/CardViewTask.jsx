import React, { useRef, useState, useEffect } from "react";
import "./css/CardViewTask.css";
import favoriteSvg from "../../assets/svg/favorite.svg";
import favoriteFillSvg from "../../assets/svg/favorite-fill.svg";
import editSvg from "../../assets/svg/edit.svg";
import choiceColorSvg from "../../assets/svg/choiceColor.svg";
import closeSvg from "../../assets/svg/close.svg";
import PropTypes from "prop-types";
import { updateData } from "./js/updateData";
import { deleteData } from "./js/deleteData";
import { changeStatus } from "./js/changeStatus";
import { colorsOption } from "../../assets/js/colorsChoice";

const CardViewTask = ({ task, taskContent, color, favorite, idDb, switchFavorite, deleteTaskFunc }) => {
    const idCardRef = useRef(null);
    const containerTitleViewRef = useRef(null);
    const editRef = useRef(null);
    const choiceColorRef = useRef(null);
    const inputTitleRef = useRef(null);
    const inputContentRef = useRef(null);
    const [ interruptorEdit, setInterruptorEdit ] = useState(false);
    const [ interruptorChoiceColor, setInterruptorChoiceColor ] = useState(false);
    const [ deleteTask, setDeleteTask ] = useState(false);
    const [ favoriteImg, setFavoriteImg ] = useState([ favorite ? favoriteFillSvg : favoriteSvg, favorite ? true : false, false ]);
    const [ newColor, setNewColor ] = useState(null);
    const [ newColorI, setNewColorI ] = useState(false);
    const [ interruptorDeleteConfirm, setInterruptorDeleteConfirm ] = useState(false);
    const [ newTask, setNewTask ] = useState(task);
    const [ newTaskContent, setNewTaskContent] = useState(taskContent);


    const handleTitleInput = (event) => {
        setNewTask(event.target.value);
    };

    const handleContentInput = (event) => {
        setNewTaskContent(event.target.value);
    };

    const handleClick = (option, value = null) => {
        switch(option) {
        case "EditClick": {
            if(interruptorEdit) {
                setInterruptorEdit(false);
            } else {
                setInterruptorEdit(true);
            }

            break;
        }
        case "ColorInterruptor": {
            if(interruptorChoiceColor) {
                setInterruptorChoiceColor(false);
            } else {
                setInterruptorChoiceColor(true);
            }

            break;
        }
        case "DeleteClick": {
            setDeleteTask(true);
            break;
        }
        case "FavoriteClick": {
            if(favoriteImg[1]) {
                setFavoriteImg([ favoriteSvg, false, true ]);
            } else {
                setFavoriteImg([ favoriteFillSvg, true, true ]);
            }

            break;
        }
        case "ColorClick": {
            setNewColor(value);
            setNewColorI(true);
            break;
        }
        case "interruptorDeleteConfirm": {
            if(interruptorDeleteConfirm) {
                setInterruptorDeleteConfirm(false);
            } else {
                setInterruptorDeleteConfirm(true);
            }

            break;
        }
        }
    };

    useEffect(() => {
        const idCard = idCardRef.current;
        const containerTitleView = containerTitleViewRef.current;

        if(color !== "#FFF"){
            containerTitleView.style.borderBottom = "1px solid #FFF";
        }

        if(newColor === null) {
            idCard.style.backgroundColor = color;
        } else {
            idCard.style.backgroundColor = newColor;
        }
    }, [ newColor ]);

    useEffect(() => {
        if(deleteTask){
            deleteData(idDb);
            deleteTaskFunc(idDb, favoriteImg[1]);
        }
    }, [ deleteTask ]);

    useEffect(() => {
        if(favoriteImg[2] || newColor !== null){
            if(!newColorI){
                changeStatus(favoriteImg[1], null, idDb);
                switchFavorite(favoriteImg[1], idDb, newTask, newTaskContent, color, true);
            } else {
                changeStatus(favoriteImg[1], newColor, idDb);
                switchFavorite(favoriteImg[1], idDb, newTask, newTaskContent, newColor, false);
                setNewColorI(false);
            }
        }
    }, [ favoriteImg, newColor ]);

    useEffect(() => {
        const edit = editRef.current;
        const choiceColor = choiceColorRef.current;
        const inputTitleElement = inputTitleRef.current;
        const inputContentElement = inputContentRef.current;


        if(interruptorEdit) {
            edit.style.backgroundColor = "#FFE3B3";
            edit.style.borderRadius = "100%";
            inputTitleElement.style.backgroundColor = color;
            inputContentElement.style.backgroundColor = color;
            inputContentElement.focus();
            inputContentElement.selectionStart = inputContentElement.value.length;
            inputContentElement.selectionEnd = inputContentElement.value.length;
        } else {
            edit.style = "";
        }

        if(interruptorChoiceColor) {
            choiceColor.style.backgroundColor = "#FFE3B3";
            choiceColor.style.borderRadius = "100%";
        } else {
            choiceColor.style = "";
        }
    }, [ interruptorEdit, interruptorChoiceColor ]);

    useEffect(() => {
        const update = (target) => {
            if(target.key === "Enter"){
                updateData(newTask, newTaskContent, idDb);
                const colorX = newColor ? newColor : color;
                switchFavorite(favoriteImg[1], idDb, newTask, newTaskContent, colorX, false);
                setInterruptorEdit(false);
            }
        };

        if(interruptorEdit){
            document.addEventListener("keydown", update);
        } else {
            document.removeEventListener("keydown", update);
        }

        return () => {
            document.removeEventListener("keydown", update);
        }; //Isso aqui é muito importante para não ter vazamento de memória, sem isso vai criar um monte de tasks
    }, [ newTask, newTaskContent, interruptorEdit ]);

    return (
        <div className="cardViewTask" ref={ idCardRef }>
            <div className="container-titleView" ref={ containerTitleViewRef }>
                {
                    !interruptorEdit ? (
                        <h1 className="titleTaskView">{ newTask }</h1>
                    ) : (
                        <input type="text" placeholder={ newTask } value={ newTask } className="inputTitleUpdate" ref={ inputTitleRef } onInput={ handleTitleInput } />
                    )
                }
                <img src={ favoriteImg[0] } alt="favoriteFillImg" className="favoriteSvg-view" onClick={ () => handleClick("FavoriteClick") } />
            </div>
            <div className="container-contentView" >
                {
                    !interruptorEdit ? (
                        <p className="contentTaskView">{ newTaskContent }</p>
                    ) : (
                        <textarea placeholder={ newTaskContent } value={ newTaskContent } className="inputContentUpdate" ref={ inputContentRef } onInput={ handleContentInput } ></textarea>
                    )
                }
            </div>
            <div className="container-tools">
                <div className="tools">
                    <img src={ editSvg } alt="editImg" className="editSvg" onClick={ () => handleClick("EditClick") } ref={ editRef } />
                    <div className="choiceColorContainer" ref={ choiceColorRef } >
                        <div className="responsiveClick" onClick={ () => handleClick("ColorInterruptor") } > { /* para ajustar o tamanho de forma responsiva */ }
                            <img src={ choiceColorSvg } alt="choiceColorImg" className="choiceColorSvg" />
                        </div>
                        {
                            interruptorChoiceColor ? (
                                <div className="colorsViewContainer">
                                    {
                                        colorsOption.map((value, position) => (
                                            <div key={ `color${position}` } className="colorsView" style={{ backgroundColor: value }} onClick={ () => handleClick("ColorClick", value) } ></div>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                <div className="deleteContainer"> { /* Apenas para deixa dinâmico, qualquer coisa eu tiro a div */ }
                    <img src={ closeSvg } alt="closeImg" className="closeSvg" onClick={ () => handleClick("interruptorDeleteConfirm") } />
                    {
                        interruptorDeleteConfirm ? (
                            <div className="choiceDelete">
                                <div className="confirm" onClick={ () => handleClick("DeleteClick") }></div>
                                <div className="cancel" onClick={ () => handleClick("interruptorDeleteConfirm") } ></div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
};

CardViewTask.propTypes = {
    task: PropTypes.string.isRequired,
    taskContent: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
    idDb: PropTypes.string.isRequired,
    switchFavorite: PropTypes.func.isRequired,
    deleteTaskFunc: PropTypes.func.isRequired
};

export default CardViewTask;