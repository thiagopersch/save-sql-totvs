import { Injectable } from '@nestjs/common';
import * as soap from 'soap';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class TotvsService {
  private readonly wsdlUrl = 'http://localhost:8051/wsDataServer/MEX?wsdl';

  async readRecord(
    dataServerName: string,
    primaryKey: string,
    contexto: string,
    username: string,
    password: string,
    tbc: string,
  ): Promise<any> {
    const existTbc = tbc.endsWith('/')
      ? `${tbc}wsDataServer/MEX?wsdl`
      : `${tbc}/wsDataServer/MEX?wsdl`;

    const client = await soap.createClientAsync(existTbc);
    const auth =
      'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
    client.addHttpHeader('Authorization', auth);

    if (!auth) {
      throw new Error('Authentication failed');
    }

    const args = {
      DataServerName: dataServerName,
      PrimaryKey: primaryKey,
      Contexto: contexto,
    };

    const [result] = await client.ReadRecordAsync(args);
    const parsedResult = await parseStringPromise(result.ReadRecordResult);
    return parsedResult;
  }
  // create(createTotvDto: CreateTotvDto) {
  //   return 'This action adds a new totv';
  // }
  // findAll() {
  //   return `This action returns all totvs`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} totv`;
  // }
  // update(id: number, updateTotvDto: UpdateTotvDto) {
  //   return `This action updates a #${id} totv`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} totv`;
  // }
}
