import precheck from './precheck'
import cli from './cli'

if(!precheck()){
  process.exit("precheck failed!")
}

// run the CLI so that the user can populate the database
cli()

// waits for URLs to be added to FILES database
