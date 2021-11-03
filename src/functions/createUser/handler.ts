import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import People from 'src/models/People';

import schema from './schema';

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const {name, age} = event.body
  const newPerson = new People({
    id: new Date().getTime().toString(),
    name,
    age
  })
  const data = await newPerson.save();
  return formatJSONResponse({data});
}

export const main = middyfy(createUser);
