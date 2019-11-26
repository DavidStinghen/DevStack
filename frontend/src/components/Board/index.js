import React, { useState, useEffect } from 'react';
import produce from 'immer';

import BoardContext from './context';
import api from '../../services/api';
import List from '../List';

import { Container } from './styles';

export default function Board() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function loadLists() {
      const response = await api.get('/lists');

      setLists(response.data);
    }

    loadLists();
  }, [lists.id]);

  function move(fromList, toList, from, to) {
    setLists(
      produce(lists, draft => {
        const dragged = draft[fromList].Jobs[from];

        draft[fromList].Jobs.splice(from, 1);
        draft[toList].Jobs.splice(to, 0, dragged);
      })
    );
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
}
