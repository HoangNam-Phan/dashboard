import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    todo_text: "Test todo",
    todo_dueDate: "1996-08-24",
    updated_todo_text: "Test todo updated",
    updated_todo_dueDate: "1996-08-25",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
