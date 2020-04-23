import { Router } from 'express'
const router = Router()

import { createTask, getTasks, deleteTask, updateTasks, getOneTask, getTasksByProject } from '../controlers/tasks.controller'

// /api/tasks/
router.post('/', createTask)
router.get('/', getTasks)

// /api/tasks/:id
router.delete('/:id', deleteTask)
router.put('/:id', updateTasks)
router.get('/:id', getOneTask)

// /api/tasks/project/:projectId
router.get('/project/:projectid', getTasksByProject)

export default router