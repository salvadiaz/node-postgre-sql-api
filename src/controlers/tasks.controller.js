import Task from '../models/Tasks'

export async function createTask(req, res, next) {
    const {
        name,
        done,
        projectid
    } = req.body
    const newTask = await Task.create({
        name,
        done,
        projectid
    }, {
        fields: ['name', 'done', 'projectid']
    })
    res.json({
        message: 'New task created'
    })
}

export async function getTasks(req, res, next) {
    const tasks = await Task.findAll({
        attributes: ['id', 'projectid', 'name', 'done'],
        order: [
            ['id', 'DESC']
        ]
    })
    res.json({
        tasks
    })
}

export async function updateTasks(req, res, next) {
    const {
        id
    } = req.params
    const {
        projectid,
        name,
        done
    } = req.body

    try {
        let tasks = await Task.findAll({
            attributes: ['id', 'projectid', 'name', 'done'],
            where: {
                id
            }
        })
        if (tasks.length > 0) {
            tasks.forEach(async task => {
                await task.update({
                    projectid,
                    name,
                    done
                })
            })
        }
        res.json({
            message: 'Updated',
            tasks
        })
    } catch (error) {
        console.log(error)
    }
}

export async function deleteTask(req, res, next) {
    const {
        id
    } = req.params
    try {
        const deleteRowCount = await Task.destroy({
            where: {
                id
            }
        })
        return res.json({
            message: 'Delete successfully',
            count: deleteRowCount
        })
    } catch (error) {
        console.log(error)
    }
}

export async function getOneTask(req, res, next) {
    const { id } = req.params
    try {
        const task = await Task.findOne({
            where: {
                id
            }
        })
        res.json(task)
    } catch (error) {
        console.log(error)
    }
}

export async function getTasksByProject(req, res, next) {
    const { projectid } = req.params

    let tasks = await Task.findAll({
        attributes: ['id', 'projectid', 'name', 'done'],
        where: {
            projectid
        }
    })
    res.json({tasks})
}