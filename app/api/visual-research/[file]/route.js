import {NextResponse} from 'next/server';
const fs = require('fs');

export async function GET(req, {params}){
    try{
        const {file} = params;
        const filePath = `./public/visual-research/${file}`;
        if(!fs.existsSync(filePath)){
            return NextResponse.json({error: 'File not found'}, {status: 404});
        }
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return NextResponse.json({file, content: JSON.parse(fileContent)}, {status: 200});
    }catch(err){
        console.log(err)
    }
}