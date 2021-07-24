const UserModel = require("./../db/schema/User");
const Project = require("./../db/schema/projectSchema");
const redisClient = require("./../redis/client");
const PROJECT_EXPIRE = 432000000;

exports.HomePageProjects = async (req, res) => {
  try {
    var data = {};
    const start = new Date();

    // getting ml projects
    const ml_projects = await redisClient.getAsync("ml");

    if (ml_projects !== null) {
      data["AI_ML_Projects"] = JSON.parse(ml_projects);
    } else {
      const ml_projects = await Project.find({
        skills: { $all: ["ml", "machine learning"] },
      })
        .limit(3)
        .sort("likes : 1")
        .sort("ratings : 1");

      await redisClient.setex(
        "ml",
        PROJECT_EXPIRE,
        JSON.stringify(ml_projects)
      );
      data["AI_ML_Projects"] = ml_projects;
    }

    // getting android projects
    const android_projects = await redisClient.getAsync("android_projects");

    if (android_projects !== null) {
      data["Android_Projects"] = JSON.parse(android_projects);
    } else {
      const android_projects = await Project.find({
        skills: { $in: ["kotlin", "android", "flutter"] },
      })
        .limit(3)
        .sort("likes : 1")
        .sort("ratings : 1");
      await redisClient.setex(
        "android_projects",
        PROJECT_EXPIRE,
        JSON.stringify(android_projects)
      );
      data["Android_Projects"] = android_projects;
    }

    // getting python projects
    const python_projects = await redisClient.getAsync("python_projects");

    if (python_projects !== null) {
      data["Python_Projects"] = JSON.parse(python_projects);
    } else {
      const python_projects = await Project.find({
        skills: { $in: ["python"] },
      })
        .limit(3)
        .sort("likes : 1")
        .sort("ratings : 1");

      await redisClient.setex(
        "ml",
        PROJECT_EXPIRE,
        JSON.stringify(python_projects)
      );
      data["Python_Projects"] = python_projects;
    }

    // getting html css projects
    const html_css_projects = await redisClient.getAsync("html_css_projects");

    if (html_css_projects !== null) {
      data["HTML_CSS_Projects"] = JSON.parse(html_css_projects);
    } else {
      const html_css_projects = await Project.find({
        skills: { $in: ["css", "html"] },
      })
        .limit(3)
        .sort("likes : 1")
        .sort("ratings : 1");

      await redisClient.setex(
        "ml",
        PROJECT_EXPIRE,
        JSON.stringify(html_css_projects)
      );
      data["HTML_CSS_Projects"] = html_css_projects;
    }

    // getting javascript projects
    const javascript_projects = await redisClient.getAsync(
      "javascript_projects"
    );

    if (javascript_projects !== null) {
      data["Javascript_Projects"] = JSON.parse(javascript_projects);
    } else {
      const javascript_projects = await Project.find({
        skills: { $in: ["javascript"] },
      })
        .limit(3)
        .sort("likes : 1")
        .sort("ratings : 1");

      redisClient.setex(
        "ml",
        PROJECT_EXPIRE,
        JSON.stringify(javascript_projects)
      );
      data["Javascript_Projects"] = javascript_projects;
    }

    // getting blockchain projects
    const blockchain_projects = await redisClient.getAsync("blockchain");

    if (blockchain_projects !== null) {
      data["Blockchain_Projects"] = JSON.parse(blockchain_projects);
    } else {
      const blockchain_projects = await Project.find({
        skills: { $in: ["blockchain"] },
      })
        .limit(3)
        .sort("likes : 1")
        .sort("ratings : 1");

      redisClient.setex(
        "ml",
        PROJECT_EXPIRE,
        JSON.stringify(blockchain_projects)
      );
      data["Blockchain_Projects"] = blockchain_projects;
    }

    // redisClient.get("blockchain", async (err, blockchain_projects) =>
    // {
    //   if (err) console.log(err);

    //   if (blockchain_projects !== null)
    //   {
    //     data["Blockchain_Projects"] = JSON.parse(blockchain_projects);
    //   }
    //   else
    //   {

    //     const blockchain_projects = await Project.find({
    //       skills: { $in: ["blockchain"] },
    //     })
    //       .limit(3)
    //       .sort("likes : 1")
    //       .sort("ratings : 1");

    //     await redisClient.setex("blockchain", PROJECT_EXPIRE, JSON.stringify(blockchain_projects));
    //     data["Blockchain_Projects"] = blockchain_projects;
    //   }

    // })

    const end = new Date() - start;
    // console.log(`it took ${ end }ms`)

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.GetProjectByID = async (req, res) => {
  const { id } = req.body;

  try {
    const project = await Project.findById(id);
    if(project)
      return res.status(200).json(project);
    else 
      return res.status(404).json({ error : "Project Not Found" });
  } catch (err) {
    return res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.GetUserByID = async (req, res) => {
  const { id } = req.body;
  
  try {
    const user = await UserModel.findById(id);
    if(user)
      return res.status(200).json(user)
    else 
      return res.status(404).json({ error : "User Not Found" });
  } catch (err) {
    return res.status(500).json({ error: "500 Internal Error" });
  }
};

