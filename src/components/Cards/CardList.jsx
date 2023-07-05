import React, { useState, useEffect } from "react";
import CardViewTask from "./CardViewTask";
import "./css/CardList.css";
import { getData } from "./js/getData";
import PropTypes from "prop-types";

const CardList = ({ createTask, filterTask, filterTaskColor }) => {
    const [ favorite, setFavorite ] = useState([null]);
    const [ others, setOthers ] = useState([null]);
    const [ filterFavoriteString, setFilterFavoriteString ] = useState([null]);
    const [ filterOthersString, setFilterOthersString ] = useState([null]);
    const [ filterFavorite, setFilterFavorite ] = useState([null]);
    const [ filterOthers, setFilterOthers ] = useState([null]);

    const switchFavorite = (favoriteBool, id, newTask, newTaskContent, newColor, isFavorite) => {
        let newItem = [];
        let deleteItem = [];
        let index;

        if(isFavorite){
            deleteItem = favoriteBool ? others.filter(value => value._id !== id) : favorite.filter(value => value._id !== id);
            newItem = favoriteBool ? others.filter(value => value._id === id) : favorite.filter(value => value._id === id);
            newItem[0].favorite = favoriteBool;
            newItem[0].task = newTask;
            newItem[0].taskContent = newTaskContent;
            newItem[0].color = newColor;
        } else {
            index = favoriteBool ? favorite.findIndex(value => value._id === id) : others.findIndex(value => value._id === id);
        }

        if(favoriteBool === true) {
            const newFavorite = [ ...favorite ];
            if(isFavorite) {
                newFavorite.unshift(newItem[0]);
                setOthers(deleteItem);
            } else {
                newFavorite[index].color = newColor;
                newFavorite[index].task = newTask;
                newFavorite[index].taskContent = newTaskContent;
            }
            setFavorite(newFavorite);
        } else {
            const newOthers = [ ...others ];
            if(isFavorite) {
                newOthers.unshift(newItem[0]);
                setFavorite(deleteItem);
            } else {
                newOthers[index].color = newColor;
                newOthers[index].task = newTask;
                newOthers[index].taskContent = newTaskContent;
            }
            setOthers(newOthers);
        }
    };

    const deleteTaskFunc = (id, favoriteBool) => {
        const newArray = favoriteBool ? favorite.filter(item => item._id !== id) : others.filter(item => item._id !== id);

        favoriteBool ? setFavorite(newArray) : setOthers(newArray);
    };

    useEffect(() => {
        const getFetch = async () => {
            const data = await getData();

            setFavorite(data.favoriteTasks);
            setOthers(data.othersTasks);
        };

        getFetch();
    }, []);

    useEffect(() => {
        if(createTask){
            const newArray = createTask.taskObj.favorite ? [ ...favorite ] : [ ...others ];
            newArray.unshift(createTask.taskObj);

            createTask.taskObj.favorite ? setFavorite(newArray) : setOthers(newArray);
        }
    }, [ createTask ]);

    useEffect(() => {
        if(filterTask){
            const newArrayFavoriteString = favorite.filter(item => item.task.toLowerCase().indexOf(filterTask) === -1 ? false : true);
            const newArrayOthersString = others.filter(item => item.task.toLowerCase().indexOf(filterTask) === -1 ? false : true);

            setFilterFavoriteString(newArrayFavoriteString);
            setFilterOthersString(newArrayOthersString);
        } else {
            setFilterFavoriteString([ ...favorite ]);
            setFilterOthersString([ ...others ]);
        }
    }, [ filterTaskColor, filterTask, favorite, others ]);

    useEffect(() => {
        if(filterTaskColor){
            const newArrayFavorite = filterFavoriteString.filter(item => item.color === filterTaskColor);
            const newArrayOthers = filterOthersString.filter(item => item.color === filterTaskColor);

            setFilterFavorite(newArrayFavorite);
            setFilterOthers(newArrayOthers);
        } else if(!filterTask && !filterTaskColor){
            setFilterFavorite([null]);
            setFilterOthers([null]);
        } else if(filterTask) {
            setFilterFavorite(filterFavoriteString);
            setFilterOthers(filterOthersString);
        }
    },[ filterFavoriteString, filterOthersString ]);

    return(
        <>
            <div className="container-cards">
                <h1 className="titleCard">Favoritas</h1>
                <div className="container-card-grid">
                    <div className="gridCards">
                        {
                            favorite[0] === null ? (
                                <p>Carregando...</p>
                            ) : favorite.length === 0 ? (
                                <p>Você ainda não possui notas favoritas...</p>
                            ) : filterFavorite.length === 0 ? (
                                <p>Sem resultados...</p>
                            ) : filterFavorite[0] !== null ? (
                                filterFavorite.map((value, position) => (
                                    <CardViewTask
                                        key={ value._id }
                                        task={ value.task }
                                        taskContent={ value.taskContent }
                                        color={ value.color }
                                        favorite={ value.favorite }
                                        idDb={ value._id }
                                        idCard={ `cardViewTaskF${position}` }
                                        switchFavorite={ switchFavorite }
                                        deleteTaskFunc={ deleteTaskFunc }
                                    />
                                ))
                            ) : (
                                favorite.map((value, position) => (
                                    <CardViewTask
                                        key={ value._id }
                                        task={ value.task }
                                        taskContent={ value.taskContent }
                                        color={ value.color }
                                        favorite={ value.favorite }
                                        idDb={ value._id }
                                        idCard={ `cardViewTaskF${position}` }
                                        switchFavorite={ switchFavorite }
                                        deleteTaskFunc={ deleteTaskFunc }
                                    />
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="container-cards">
                <h1 className="titleCard">Outras</h1>
                <div className="container-card-grid">
                    <div className="gridCards">
                        {
                            others[0] === null ? (
                                <p>Carregando...</p>
                            ) : others.length === 0 ? (
                                <p>Você ainda não possui notas...</p>
                            ) : filterOthers.length === 0 ? (
                                <p>Sem resultados...</p>
                            ) : filterOthers[0] !== null ? (
                                filterOthers.map((value, position) => (
                                    <CardViewTask
                                        key={ value._id }
                                        task={ value.task }
                                        taskContent={ value.taskContent }
                                        color={ value.color }
                                        favorite={ value.favorite }
                                        idDb={ value._id }
                                        idCard={ `cardViewTaskF${position}` }
                                        switchFavorite={ switchFavorite }
                                        deleteTaskFunc={ deleteTaskFunc }
                                    />
                                ))
                            ) : (
                                others.map((value, position) => (
                                    <CardViewTask
                                        key={ value._id }
                                        task={ value.task }
                                        taskContent={ value.taskContent }
                                        color={ value.color }
                                        favorite={ value.favorite }
                                        idDb={ value._id }
                                        idCard={ `cardViewTaskO${position}` }
                                        switchFavorite={ switchFavorite }
                                        deleteTaskFunc={ deleteTaskFunc }
                                    />
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

CardList.propTypes = {
    createTask: PropTypes.shape({
        taskObj: PropTypes.shape({
            task: PropTypes.string.isRequired,
            taskContent: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
            favorite: PropTypes.bool.isRequired,
            _id: PropTypes.string.isRequired
        }).isRequired
    }),
    filterTask: PropTypes.string,
    filterTaskColor: PropTypes.string
};


export default CardList;