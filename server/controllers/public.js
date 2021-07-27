const UserModel = require("./../db/schema/User");
const Project = require("./../db/schema/projectSchema");
const redisClient = require("./../redis/client");
const PROJECT_EXPIRE = 432000000;

exports.GetProjectByID = async (req, res) =>
{
  const { id } = req.body;

  try
  {
    const project = await Project.findById(id);
    if (project)
      return res.status(200).json(project);
    else
      return res.status(404).json({ error: "Project Not Found" });
  } catch (err)
  {
    return res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.GetUserByID = async (req, res) =>
{
  const { id } = req.body;

  try
  {
    const user = await UserModel.findById(id);
    if (user)
      return res.status(200).json(user)
    else
      return res.status(404).json({ error: "User Not Found" });
  } catch (err)
  {
    return res.status(500).json({ error: "500 Internal Error" });
  }
};

