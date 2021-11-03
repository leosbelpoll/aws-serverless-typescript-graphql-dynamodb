import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import People from 'src/models/People';


const getUsers = async () => {

  const data = await People.scan().exec()

  //const data = {id: "pepe"}

  return formatJSONResponse({data});
}

export const main = middyfy(getUsers);
