import { NextRequest, NextResponse } from 'next/server';
import { appendFile, access } from 'fs/promises';
import { parse } from 'json2csv';
import { constants } from 'fs';
import { join } from 'path';

type ServiceData = {
  id: string;
  title: string;
  description1: string;
  description2: string;
  description3: string;
  categoryName?: string;
};

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: ServiceData = await req.json();
    
    // Define the path for services.csv inside the src/data directory
    const filePath = join(process.cwd(), 'src', 'services.csv');
    
    const exists = await fileExists(filePath);

    const options = { header: !exists };

    const csv = parse([data], options);

    await appendFile(filePath, csv + '\n');

    return NextResponse.json({ message: 'Data has been appended to CSV file!' });
  } catch (error) {
    console.error('Error writing to file:', error);
    return NextResponse.json({ error: 'Failed to write to file' }, { status: 500 });
  }
}
