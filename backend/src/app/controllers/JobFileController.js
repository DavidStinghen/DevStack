import * as Yup from 'yup';

import JobFile from '../models/JobFile';
import Job from '../models/Job';
import Share from '../models/Share';

class JobFileController {

  async store(req, res) {
    const schema = Yup.object().shape({
      job_id: Yup.number().required(),
      file_id:  Yup.number().required()
    });

    if(!(schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }

    const share = await Share.findOne({
      where: {user_id: req.userId}
    });

    const job = await Job.findOne({
      where: {provider_id: req.userId}
    });

    if (req.userId !== job.provider_id && req.userId !== share) {
      return res.status(401).json({ 
        error: 'You are not authorized to add a file in this job'
      });
    }

    const jobFile = await JobFile.create(req.body);

    return res.status(201).json(jobFile);
  }

  async delete(req, res) {
    const share = await Share.findOne({
      where: {user_id: req.userId}
    });

    const job = await Job.findOne({
      where: {provider_id: req.userId}
    });

    if (req.userId !== job.provider_id && req.userId !== share) {
      return res.status(401).json({ 
        error: 'You are not authorized to delete files at this job'
      });
    }

    const jobFile = await JobFile.findByPk(req.params.id);

    if (!jobFile) {
      return res.status(404).json({ error: 'Not found'});
    }

    await jobFile.destroy();

    return res.status(204);
  }

}

export default new JobFileController();