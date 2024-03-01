'use strict';

(() => {
  class TaskManager {
    #tasks = new Map();

    #sanitizeDescription = (desc) => {
      if (typeof desc !== 'string') {
        throw new Error('Description must be a valid string');
      } else if (!desc.trim().length) {
        throw new Error('Can not process empty task');
      }
      
      return desc.trim();
    }

    #validateId = (id) => {
      if (!['string', 'number', 'symbol'].includes(typeof id)) {
        throw new Error('Unsupported id type');
      }
    }
    
    addTask = (id, description) => {
      this.#validateId(id);
      if (this.#tasks.has(id)) {
        throw new Error('Task already exists');
      }

      const desc = this.#sanitizeDescription(description);

      this.#tasks.set(id, desc);
    }

    removeTask = (id) => {
      this.#validateId(id);
      if (!this.#tasks.has(id)) {
        throw new Error('Task with this id not found');
      }

      this.#tasks.delete(id);
    }

    findTask = (id) => {
      this.#validateId(id);
      if (!this.#tasks.has(id)) {
        throw new Error('Task with this id not found');
      }

      return this.#tasks.get(id);
    }

    displayTasks = () => {
      for (const [id, desc] of this.#tasks.entries()) {
        console.log(`ID: ${id}; Task: ${desc}`);
      }
    }

    updateTaskDescription  = (id, description) => {
      this.#validateId(id);
      if (!this.#tasks.has(id)) {
        throw new Error('Task with this id not found');
      }

      const desc = this.#sanitizeDescription(description);

      this.#tasks.set(id, desc);
    }
  }

try {
    const taskMgr = new TaskManager();
    taskMgr.addTask(1, 'task 1');
    taskMgr.addTask(2, 'task 2');
    taskMgr.displayTasks();
    taskMgr.removeTask(2);
    taskMgr.updateTaskDescription(1, 'test task');
    console.log(taskMgr.findTask(1));

} catch (e) {
  console.error(e);
}
})();