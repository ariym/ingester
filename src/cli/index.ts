import { select, input } from '@inquirer/prompts';

import { addFiles } from '../File'
import { init } from '../db'

export default async function cli() {

  while (true) {

    // user decides to buy or auction
    const answer = await select({
      message: "Choose a directory to add",
      choices: [
        {
          name: 'Enter path',
          value: 'INPUT_PATH',
        },
        {
          name: `Use current dir`,
          value: 'USE_CURRENT_PATH',
          description: `${__dirname}`
        },
        {
          name: "Init DB",
          value: 'INIT_DB',
          description: "Only for first time running."
        },
        {
          name: 'Quit',
          value: 'EXIT',
          description: "Exit to terminal."
        }
      ],
    });

    let chosenPath: string;

    if (answer === "USE_CURRENT_PATH") {
      chosenPath = __dirname
    } else if (answer === "INPUT_PATH") {
      chosenPath = await input({
        message: "Enter full path: ",
        default: process.env.PATH_CONTENT,
      });
    } else if (answer === "INIT_DB"){
      init();
      continue;
    } else {
      process.exit();
    }

    try {
      addFiles(chosenPath);
    } catch (error) {
      console.log("File adding failed.", error.message)
    }

  }
}
