import * as Yup from 'yup';

import Share from '../models/Share';
import User from '../models/User';
import Job from '../models/Job';
import File from '../models/File';

class ShareController {
  async index(req, res) {
    const { job_id } = req.body;

    const share = await Share.findAll({
      where: { job_id },
      incude: [
        {
          model: User,
          attributes: ["id", "name"]
        },
        {
          model: File,
          attributes: ["id", "path", "url"]
        }
      ]
    });

    if (!share) {
      return res.status(404).json({ error: 'Share not found'});
    }

    return res.json(share);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      job_id: Yup.number().required(),
      user_id: Yup.number().required()
    });

    if(!(schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }

    const { user_id, job_id } = req.body;

    const user = await User.findByPk({
      where: { id: user_id }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found'});
    }

    if (req.userId === user_id) {
      return res.status(401).json({ error: 'You can not share jobs to yourself' });
    }

    const job = await Job.findByPk({
      where: { id: job_id}
    });
    if (!job) {
      return res.status(404).json({ error: 'Job not found'});
    }

    const share = await Share.create({
      job_id, user_id
    });

    return res.status(200).json(share);
  }

  async delete(req, res) {
    const share = await Share.findByPk(req.params.id);

    if (!share) {
      return res.status(404).json({ error: 'Share not found'});
    }

    await share.destroy();

    return res.status(204);
  }
}

export default new ShareController();