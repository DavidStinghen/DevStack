import * as Yup from 'yup';

import List from '../models/List';
import User from '../models/User';
import Job from '../models/Job';

class ListController {
  async index(req, res) {
    const lists = await List.findAll({
      where: 
        { 
          user_id: req.userId
        },
        include: [{
          model: Job,
          attributes: ['id', 'title', 'description', 'list_id']
        }]
    });

    if (!lists) {
      return res.status(404).json({ error: 'No lists found' });
    }

    return res.status(200).json(lists);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }

    const user = await User.findOne({
      where: { id: req.userId}
    });
    if (!user) {
      return res.status(401).json({ error: 'Only users can create lists' });
    }

    const list = await List.create({
      ...req.body, user_id: req.userId
    });

    return res.status(201).json(list);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
    });

    if (!(schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }

    const list = await List.findByPk(req.params.id);
    if (!list) {
      return res.status(404).json({ error: 'List not found'});
    }

    if (req.userId !== list.user_id) {
      return res.status(401).json({ 
        error: 'You are not authorized to update this job'
      });
    }

    await list.update(req.body);

    return res.status(200).json(list);
  }

  async delete(req, res) {
    const list = await List.findOne({
      where: { user_id: req.userId}
    });

    if (req.userId !== list.user_id) {
      return res.status(401).json({ error: 'Only can delete your own lists'});
    }

    await List.findByPk(req.params.id);
    if (!list) {
      return res.status(404).json({ error: 'List not found'});
    }

    await list.destroy();

    return res.status(204);
  }
}

export default new ListController();