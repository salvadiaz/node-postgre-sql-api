import Project from '../models/Project'

export async function getProjects(req, res, next) {
    try {
        const projects = await Project.findAll()
        res.json({
            data: projects
        })
    } catch (error) {
        console.log(error)
    }
}

export async function createProject(req, res, next) {
    const {
        name,
        priority,
        descripton,
        deliverydate
    } = req.body
    try {
        let newProject = await Project.create({
            name,
            priority,
            descripton,
            deliverydate
        }, {
            fields: ['name', 'priority', 'description', 'deliverydate'] //le estoy aclarando que datos le paso para que no me haga porblema por el id faltante
        })
        if (newProject) {
            return res.json({
                message: 'Project created succesfully',
                data: newProject
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something gone wrong',
            data: {}
        })
    }
}

export async function getOneProject(req, res, next) {
    const {
        id
    } = req.params
    try {
        const project = await Project.findOne({
            where: {
                id //no hace falta poner id: id, js se da cuenta solo
            }
        })
        return res.json(project)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProject(req, res, next) {
    const {
        id
    } = req.params
    try {
        const deleteRowCount = await Project.destroy({ //destroy devuelve cantidad de filas elimindadas
            where: {
                id
            }
        })
        res.json({
            message: 'Project deleted succesfully',
            count: deleteRowCount

        })
    } catch (error) {
        console.log(error)
    }
}

export async function updateProject(req, res, next) {
    const { id } = req.params
    const { name, priority, description, deliverydate } = req.body

    const projects = await Project.findAll({
        attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
        where: {
            id
        }
    })
    if (projects.length > 0) {
        projects.forEach(async project => {
            await project.update({
                name,
                priority,
                description,
                deliverydate
            })
        })
    }
    res.json({
        message: 'Updated Succesfully',
        data: projects
    })
}