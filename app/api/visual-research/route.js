import {NextResponse} from 'next/server';
const fs = require('fs');

export async function POST(req){
    try{
        const formData = await req.formData()
        const file = formData.get('file');
        // check file type if json or not
        if(file.type !== 'application/json'){
            return NextResponse.json({
                error: 'Invalid file type. Please upload a JSON file.',
            }, {status: 400});

        }
        // write file to local storage
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(`./public/visual-research/${file.name}`, buffer);
        return NextResponse.json({message: 'File uploaded successfully', fileName: file.name}, {status: 201});

    }catch(err){
        console.log(err)
    }
}

export async function GET(req){
    try{
        const files = fs.readdirSync('./public/visual-research/');
        return NextResponse.json({files}, {status: 200});
    }catch(err){
        console.log(err)
    }
}
