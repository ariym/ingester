import fs from "fs";
import { recursivelyAddDirectoryContents } from "../util/findVideoFiles";
import { addFile, init } from '../db'

export function addFiles(pth: string): void {

  if (!fs.existsSync(pth) || !fs.statSync(pth).isDirectory()) {
    throw "Either doesn't exist or is not a directory";
  }
  
  const fileList = recursivelyAddDirectoryContents(pth);

  fileList.map(file => addFile(file));

  console.log("Added", fileList.length, "files to the table.");

}

