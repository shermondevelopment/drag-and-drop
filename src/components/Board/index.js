/* eslint-disable */
import React, { useState } from 'react';
import { loadLists } from '../../services/api';
import BoardContext from './context';
import List from '../List';
import { Container } from './style';
import produce from 'immer'


export default function Board() {

    const data = loadLists();
    const [lists, setLists] = useState(data)

    function move(fromLists, toList, from, to) {
        setLists(produce(lists, draft => {
            const dragged = draft[fromLists].cards[from];
            draft[fromLists].cards.splice(from, 1);
            draft[toList].cards.splice(to, 0, dragged);
        }))
    }

    return ( 
        <BoardContext.Provider value={{lists, move}}>
            <Container>
                {lists.map((list, index) => <List index={index} key={list.title} data={list} />)}
            </Container>
        </BoardContext.Provider>
    );
}