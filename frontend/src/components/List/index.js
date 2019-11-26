import React, { useRef, useContext } from 'react';
import { useDrop } from 'react-dnd';

import api from '../../services/api';
import BoardContext from '../Board/context';
import Card from '../Card';

import { Container, Header, Scroll } from './styles';

export default function List({ data, index: listIndex }) {
  const { move } = useContext(BoardContext);
  const ref = useRef();

  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop(item) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = listIndex;

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;

      async function handleSubmit() {
        await api.put('/jobs', { list_id: data.id });
      }

      handleSubmit();
    },
  });

  dropRef(ref);

  return (
    <Container ref={ref}>
      <Header>
        <h1>{data.title}</h1>
      </Header>
      <Scroll>
        <ul>
          {data.Jobs.map((job, index) => (
            <Card key={job.id} listIndex={listIndex} index={index} data={job} />
          ))}
        </ul>
      </Scroll>
    </Container>
  );
}
