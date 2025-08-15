# Ingester Server

![ingester architecture](ingester-diagram-v1.png "Diagram")

## Architecture

* SQLite
  * Files: path, size, ext
  * Jobs: status, file, programId
  * TagType: schema for a tag: speaker:{name: string}
  * Tag: instance of a tagtype
  * Segment: instance of a tag with file,start,end
* BullMQ message queue
  * Simple store that only has the JobID
  * Runs dependent jobs after
  * updates the queue to add jobs that haven't been run
  * removes long-running jobs that might be stuck
