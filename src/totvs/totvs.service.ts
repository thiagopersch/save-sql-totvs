import { Injectable } from '@nestjs/common';
import * as soap from 'soap';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class TotvsService {
  async readRecord(
    dataServerName: string,
    primaryKey: string,
    contexto: string,
    username: string,
    password: string,
    tbc: string,
  ): Promise<any> {
    try {
      const existTbc = tbc.endsWith('/')
        ? `${tbc}wsDataServer/MEX?wsdl`
        : `${tbc}/wsDataServer/MEX?wsdl`;

      const client = await soap.createClientAsync(existTbc);
      const auth =
        'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
      client.addHttpHeader('Authorization', auth);

      const args = {
        DataServerName: dataServerName,
        PrimaryKey: primaryKey,
        Contexto: contexto,
      };

      const [result] = await client.ReadRecordAsync(args);
      const parsedResult = await parseStringPromise(result.ReadRecordResult);
      return parsedResult;
    } catch (error) {
      console.log(`Failed to read record: ${error.message}`);
    }
  }

  async saveRecord(
    dataServerName: string,
    xml: string,
    contexto: string,
    username: string,
    password: string,
    tbc: string,
  ): Promise<any> {
    try {
      const existTbc = tbc.endsWith('/')
        ? `${tbc}wsDataServer/MEX?wsdl`
        : `${tbc}/wsDataServer/MEX?wsdl`;

      const client = await soap.createClientAsync(existTbc);
      const auth =
        'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
      client.addHttpHeader('Authorization', auth);

      const xmlData = `<![CDATA[${xml}]]>`;

      const [results] = await client.SaveRecordAsync({
        DataServerName: dataServerName,
        XML: xmlData,
        Contexto: contexto,
      });

      const parsedResult = await results;
      return parsedResult.SaveRecordResult;
    } catch (error) {
      console.error(error);
    }
  }
}
