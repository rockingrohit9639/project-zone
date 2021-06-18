const express = require("express");
const projectsRouter = express.Router();
const Project = require("../db/schema/projectSchema");

projectsRouter.get("/getprojects", async (req, res) =>
{
    const query = req.query.q;
    
    try
    {
        const result = await Project.find({ skills: { $regex: query, $options: "i" } });
        // console.log(result);

        if (result)
        {
            return res.status(200).json(result);
        }
        else
        {
            return res.status(404).json({"message": "not found"})
        }

        
    }
    catch (err)
    {
        console.log(err)
    }

    return res.staus(500).json({"message": "Internal server error"});
});

projectsRouter.post("/addproject", async (req, res) =>
{
    const { name, description, level, skills } = req.body;

    try
    {
        const newProject = Project({
            name,
            description,
            level,
            skills
        });

        const resp = await newProject.save();
        console.log(resp);

        return res.send("done")
    }
    catch (err)
    {
        console.log(err)
    }
})



module.exports = projectsRouter;