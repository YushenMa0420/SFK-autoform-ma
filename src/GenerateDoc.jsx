import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                        }),
                        new TextRun({
                            text: "\tGithub is the best",
                            bold: true,
                        }),
                    ],
                }),
            ],
        },
    ],
});

const handleDownload = ()=>{
    // Used to export the file into a .docx file
    Packer.toBlob(doc).then((blob) => {
        // saveAs from FileSaver will download the file
        saveAs(blob, "example.docx");
    });
}

const GenerateDoc = () => (
    <Button onClick={handleDownload} type="primary" icon={<DownloadOutlined />}>下载 Word 文件</Button>
);
export default GenerateDoc;

