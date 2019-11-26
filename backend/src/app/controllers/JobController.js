import * as Yup from 'yup';

import Job   from '../models/Job';
import User  from '../models/User';
import Share from '../models/Share';  
import File  from '../models/File';
import JobFile from '../models/JobFile';

class JobController {
  async index(req, res) {
    const jobs = await Job.findAll({
      where: 
        { 
          user_id: req.userId
        },
        include: [{
          model: User,
          attributes: ['name', 'avatar_id'],
          include: [{
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          }]
        }]
    });

    if (!jobs) {
      return res.status(404).json({ error: 'No jobs found' });
    }

    return res.status(200).json(jobs);
  }

  async show(req, res) {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const share = await Share.findOne({
      where: {user_id: req.userId}
    });

    if (req.userId !== job.user_id && req.userId !== share) {
      return res.status(401).json({ 
        error: 'You are not authorized to inspect this job'
      });
    }

    return res.status(200).json(job);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }

    const job = await Job.create({
      ...req.body, user_id: req.userId
    });

    return res.status(201).json(job);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      list_id: Yup.number()
    });

    if (!(schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }

    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found'});
    }

    const share = await Share.findOne({
      where: {user_id: req.userId}
    });

    if (req.userId !== job.user_id && req.userId !== share) {
      return res.status(401).json({ 
        error: 'You are not authorized to update this job'
      });
    }

    await job.update(req.body);

    return res.status(200).json(job);
  }

  async delete(req, res) {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (req.userId !== job.user_id) {
      return res.status(401).json({ error: 'Only can delete your own jobs'});
    }

    await job.destroy();

    return res.status(204);
  }
}

export default new JobController();