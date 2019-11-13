import * as Yup from 'yup';

import Job from '../models/Job';
import User from '../models/User';
import Share from '../models/Share';  

class JobController {
  async index(req, res) {
    const jobs = await Job.findAll({
      where: { provider_id: req.userId }
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

    if (req.userId !== job.provider_id && req.userId !== share) {
      return res.status(401).json({ 
        error: 'You are not authorized to inspect this job'
      });
    }

    return res.status(200).json(job);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }

    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });
    if (!isProvider) {
      return res.status(401).json({ error: 'Only providers can create jobs' });
    }

    const job = await Job.create({
      ...req.body, provider_id: req.userId
    });

    return res.status(201).json(job);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      status: Yup.number()
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

    if (req.userId !== job.provider_id && req.userId !== share) {
      return res.status(401).json({ 
        error: 'You are not authorized to update this job'
      });
    }

    await job.update(req.body);

    return res.status(200).json(job);
  }

  async delete(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true}
    });
    if (!isProvider) {
      return res.status(401).json({ error: 'Only providers can delete jobs'});
    }
    
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (req.userId !== job.provider_id) {
      return res.status(401).json({ error: 'Only can delete your own jobs'});
    }

    await job.destroy();

    return res.status(204);
  }
}

export default new JobController();