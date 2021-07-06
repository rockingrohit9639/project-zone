const Project = require("./../db/schema/projectSchema");

exports.HomePageProjects = async (req, res) => {
  try {
    const ai_ml_projects = await Project.find({
      skills: { $in: ["ml", "ai", "Machine Learning"] },
    })
      .limit(3)
      .sort("likes : 1")
      .sort("ratings : 1");

    const android_projects = await Project.find({
      skills: { $all: ["java", "kotlin", "android"] },
    })
      .limit(3)
      .sort("likes : 1")
      .sort("ratings : 1");

    const blockchain_projects = await Project.find({
      skills: { $in: ["blockchain"] },
    })
      .limit(3)
      .sort("likes : 1")
      .sort("ratings : 1");

    const python_projects = await Project.find({
      skills: { $in: ["python"] },
    })
      .limit(3)
      .sort("likes : 1")
      .sort("ratings : 1");

    const html_css_projects = await Project.find({
      skills: { $in: ["css", "html"] },
    })
      .limit(3)
      .sort("likes : 1")
      .sort("ratings : 1");

    const javascript_projects = await Project.find({
      skills: { $in: ["javascript", "reactjs", "nodejs", "expressjs"] },
    })
      .limit(3)
      .sort("likes : 1")
      .sort("ratings : 1");

    const data = {
      AI_ML_Projects: ai_ml_projects,
      Javascript_Projects: javascript_projects,
      Python_Projects: python_projects,
      HTML_CSS_Projects: html_css_projects,
      Android_Projects: android_projects,
      Blockchain_Projects: blockchain_projects,
    };
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
  Project.find({});
};

exports.GetProjectByID = async (req, res) => {
  const { id } = req.body;
  
  try {
    const project = await Project.findById(id);
    return res.status(200).json(project);
  } catch (err) {
    return res.status(500).json({ error: "500 Internal Error" });
  }
};
