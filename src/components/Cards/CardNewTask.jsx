import React, { useState, useEffect, useRef } from "react";
import "./css/CardNewTask.css";
import favoriteSvg from "../../assets/svg/favorite.svg";
import favoriteFillSvg from "../../assets/svg/favorite-fill.svg";
import { sendData } from "./js/sendData";
import PropTypes from "prop-types";

const CardNewTask = ({ setCreateTask }) => {
    const [ task, setTask ] = useState("");
    const [ taskContent, setTaskContent ] = useState("");
    const [ img, setImg ] = useState([ favoriteSvg, false ]);
    const inputTitleRef = useRef(null);
    const inputContentRef = useRef(null);

    const handleClick = () => {
        if(!img[1]) {
            setImg([favoriteFillSvg, true]);
        } else {
            setImg([favoriteSvg, false]);
        }
    };

    const handleTitleInput = (event) => {
        setTask(event.target.value);
    };

    const handleContentInput = (event) => {
        setTaskContent(event.target.value);
    };

    useEffect(() => {
        if(task.length > 27){
            setTask(task);
            alert("Diminua o tamanho do titulo...");
        }

        if(taskContent.length > 700){
            setTaskContent(taskContent);
            alert("Diminua o tamanho do conteúdo...");
        }

        const send = (target) => {
            if(task.length > 27){
                setTask(task);
                return;
            }

            if(taskContent.length > 700){
                setTaskContent(taskContent);
                return;
            }

            if(target.key === "Enter"){
                document.removeEventListener("keydown", send);
                setTask("");
                setTaskContent("");
                const inputTitle = inputTitleRef.current;
                const inputContent = inputContentRef.current;
                inputTitle.value = "";
                inputContent.value = "";
                document.activeElement.blur();

                sendData(task, taskContent, img[1])
                    .then(data => {
                        setCreateTask({ taskObj: data.task });
                    })
                    .catch(err => console.error(err));
            }
        };

        if(task.length !== 0 && taskContent.length !== 0){
            document.addEventListener("keydown", send);
        } else {
            document.removeEventListener("keydown", send);
        }

        return () => {
            document.removeEventListener("keydown", send);
        }; //Isso aqui é muito importante para não ter vazamento de memória, sem isso vai criar um monte de tasks
    }, [ handleTitleInput, handleContentInput ]);


    return (
        <div className="cardNewTask">
            <div className="container-titleNew">
                <input type="text" placeholder="Título" className="inputTitle" ref={ inputTitleRef } onInput={ handleTitleInput } />
                <img src={ img[0] } alt="favoriteImg" className="favoriteSvg" onClick={ handleClick } />
            </div>
            <div className="container-contentNew">
                <textarea placeholder="Criar nota..." className="inputContent" ref={ inputContentRef } onInput={ handleContentInput } ></textarea>
            </div>
        </div>
    );
};

CardNewTask.propTypes = {
    setCreateTask: PropTypes.func.isRequired
};

export default CardNewTask;