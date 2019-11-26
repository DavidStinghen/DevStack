import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { GoFileCode, GoX, GoDiff, GoFile } from 'react-icons/go';
import { MdShare } from 'react-icons/md';

import api from '../../services/api';
import { Container } from './styles';

export default function NewCard() {
  const [newCard, setNewCard] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const preview = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  const schema = Yup.object().shape({
    title: Yup.string().required('Você deve informar um titulo'),
    description: Yup.string().required('Você deve informar uma descrição'),
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post('jobs', { title, description });

      toast.success('Novo tabalho adicionado com sucesso!');
    } catch (err) {
      toast.error('Falha ao incluir o trabalho!');
    }
  }

  return (
    <>
      {newCard && (
        <Container>
          <button
            className="btn-cancel"
            type="button"
            onClick={() => setNewCard(!newCard)}
          >
            <GoX size={24} color="#4f4f4f" />
          </button>
          <button className="btn-share" type="button">
            <MdShare size={24} color="#4f4f4f" />
          </button>
          <header>
            <button>
              <GoFileCode size={40} color="#4f4f4f" />
            </button>
            <h1>Nova tarefa</h1>
          </header>
          <form schema={schema} onSubmit={handleSubmit}>
            <label htmlFor="title">Titulo</label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={event => setTitle(event.target.value[0])}
            />

            <label>Estimativa</label>
            <p>Adicione uma estimativa de horas para esse trabalho</p>
            <input type="time" />

            <label htmlFor="description">Descrição</label>
            <p>Adicione uma descrição para melhor entender esse trabalho</p>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={event => setDescription(event.target.value)}
             />

            <label
              id="file"
              style={{ backgroundImage: `url(${preview})` }}
              className={file ? <GoFile /> : ''}
            >
              <input
                type="file"
                data-file={file}
                name="file"
                onChange={event => setFile(event.target.files[0])}
              />
              <GoDiff size={25} />
            </label>

            <button type="submit" className="btn-done">
              Adicionar tarefa
            </button>
          </form>
        </Container>
      )}
    </>
  );
}
